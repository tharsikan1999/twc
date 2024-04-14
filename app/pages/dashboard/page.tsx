"use client";

import logo from "../../assets/img/Logo-white.png";
import Image from "next/image";
import contactIMG from "../../assets/img/contacts portal white.png";
import logoutIMG from "../../assets/img/bx_log-out-circle.png";
import Man from "../../assets/img/man.png";
import Girl from "../../assets/img/girl.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationDeleteDialog from "../../components/ConfirmationDeleteDialog";
import ConfirmationDelete from "../../components/ConfirmationDelete";
import ConfirmationSave from "@/app/components/ConfirmationSave";
import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";

function Table() {
  const router = useRouter();
  interface User {
    _id: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [index, setIndex] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/get");
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to get data from MongoDB");
    }
  };

  const handleConfirm = async () => {
    // Handle the deletion
    try {
      const userIdToDelete = users[index]._id;
      // Send a DELETE request to the server
      await axios.delete(`/api/delete/${userIdToDelete}`);

      // Refresh the users list after deletion
      fetchNotes();

      // Close the dialog
      setDialogOpen(false);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (index: number) => {
    // Enter edit mode for the specified row
    setEditIndex(index);
    setEditedUser({ ...users[index] });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    // Update the editedUser state with the new value
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [field]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (editIndex !== null && editedUser) {
      try {
        // Send a PUT request to update the user
        await axios.put(`/api/update/${editedUser._id}`, editedUser);

        // Update the users array with the edited user data
        const updatedUsers = [...users];
        updatedUsers[editIndex] = editedUser;
        setUsers(updatedUsers);

        // Exit edit mode
        setEditIndex(null);
        setEditedUser(null);
        setSaveDialogOpen(true);
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    // Handle cancellation logic
    setDialogOpen(false);
    setDeleteSuccess(false);
    setEditIndex(null);
    setEditedUser(null);
    setSaveDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    // Open the confirmation dialog
    setDialogOpen(true);
    // Set the selected user name and index for deletion
    const contactName = users[index].name;
    setSelectedUserName(contactName);
    setIndex(index);
  };

  const GoToHome = () => {
    router.push("/");
  };

  return (
    <main className="bg-customGreen w-full min-h-screen flex flex-col lg:items-center md:relative px-5 xl:px-0 md:pb-10">
      <div className="lg:w-3/4 min-h-screen lg:pt-[72px] lg:mb-28">
        {/* Header Section */}
        <div className="w-full flex flex-col items-center lg:items-start">
          <div>
            <Image
              src={logo}
              alt="Logo"
              height={24.03}
              width={72.94}
              className="cursor-pointer mb-3"
              onClick={GoToHome}
            />
            <Image
              src={contactIMG}
              alt="Contact Image"
              height={60.77}
              width={136.76}
              className=""
            />
          </div>
        </div>

        {/* Contacts Header and Add Button */}
        <div className="flex justify-between items-center lg:mt-14 px-5">
          <h1 className="text-[30px] md:text-[50px] my-10 font-bold text-white text-center lg:text-left">
            Contacts
          </h1>
          <Link href="/pages/form">
            <button
              type="button"
              className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[170px] md:w-[255px] h-[38px] md:h/[48px] rounded-full text-[14px] md:text-[25px] sm:text-[16px] font-normal"
            >
              Add New Contact
            </button>
          </Link>
        </div>

        {/* Contacts Table */}
        <div className="relative overflow-x-auto shadow-md bg-white rounded-[30px]">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-customGreen font-bold md:text-[18px] text-[15px] uppercase">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3 md:pt-6">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3 md:pt-6">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 md:pt-6">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 md:pt-6">
                  Phone
                </th>
                <th scope="col" className="py-3 md:pt-6"></th>
                <th scope="col" className="py-3 md:pt-6"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="text-[17px] font-normal text-customGreen"
                >
                  {/* User's Image */}
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="w-[59px] h/[59px] cursor-pointer rounded-full"
                      src={user.gender === "Male" ? Man : Girl}
                      alt={`${user.name} image`}
                    />
                  </th>

                  {/* Edit Mode or Display Mode */}
                  {editIndex === index ? (
                    <>
                      <td className=" px-3 py-3">
                        <div className=" relative">
                          <input
                            type="text"
                            value={editedUser?.name}
                            onChange={(e) => handleInputChange(e, "name")}
                            className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                          />
                          <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] right-2 lg:right-5"></div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="relative">
                          <input
                            type="text"
                            value={editedUser?.gender}
                            onChange={(e) => handleInputChange(e, "gender")}
                            className="h-[35px] bg-customGreen bg-opacity-10 pl-3 border-customGreen w-full pr-8"
                          />
                          {/* Event handler for the refresh button */}
                          <FiRefreshCw
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => {
                              // Toggle gender value between 'female' and 'male'
                              const newGender =
                                editedUser?.gender === "female"
                                  ? "Male"
                                  : "female";
                              handleInputChange(
                                { target: { value: newGender } },
                                "gender"
                              );
                            }}
                          />
                        </div>
                      </td>

                      <td className=" px-3 py-3">
                        <div className=" relative">
                          <input
                            type="text"
                            value={editedUser?.email}
                            onChange={(e) => handleInputChange(e, "email")}
                            className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                          />
                          <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] lg:right-7 right-4 "></div>
                        </div>
                      </td>
                      <td className=" px-3 py-3">
                        <div className=" relative">
                          <input
                            type="text"
                            value={editedUser?.phone}
                            onChange={(e) => handleInputChange(e, "phone")}
                            className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                          />
                          <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] right-2 lg:right-5"></div>
                        </div>
                      </td>
                      <td className="text-right">
                        {/* Save and Cancel Buttons */}
                        <button
                          className="w-[72px] h-[35px] bg-customGreen text-white rounded-[50px] text-[16px] font-normal leading-3"
                          onClick={handleSave}
                        >
                          save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Display Mode: Render user details */}
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.gender}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">
                        <FaPen
                          className="cursor-pointer"
                          onClick={() => handleEdit(index)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FaRegTrashCan
                          className="cursor-pointer"
                          onClick={() => handleDelete(index)}
                        />
                        <ConfirmationDeleteDialog
                          isOpen={isDialogOpen}
                          onConfirm={handleConfirm}
                          onCancel={handleCancel}
                          message={`Do you want to delete the contact ${selectedUserName}?`}
                        />
                        <ConfirmationDelete
                          isOpen={deleteSuccess}
                          onCancel={handleCancel}
                        />
                        <ConfirmationSave
                          isOpen={saveDialogOpen}
                          onCancel={handleCancel}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logout Section */}
        <div className="flex space-x-3 items-center justify-center cursor-pointer mt-14 absolute left-[35%] sm:left-[40%] md:left-[45%] bottom-5 lg:justify-end lg:right-14 md:bottom-5 lg:bottom-10">
          <Image src={logoutIMG} alt="Logout" height={24} width={24} />
          <p className="underline underline-offset-4 text-white font-normal text-[20px]">
            Logout
          </p>
        </div>
      </div>
    </main>
  );
}

export default Table;
