"use client";

import withAuth from "../../middleware/withAuth";
import logo from "../assets/img/Logo-white.png";
import Image from "next/image";
import contactIMG from "../assets/img/contacts portal white.png";
import logoutIMG from "../assets/img/bx_log-out-circle.png";
import Man from "../assets/img/man.png";
import Girl from "../assets/img/girl.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationDeleteDialog from "../components/ConfirmationDeleteDialog";
import ConfirmationDelete from "../components/ConfirmationDelete";
import ConfirmationSave from "@/app/components/ConfirmationSave";
import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";
import { headers } from "next/headers";
import Ellipse01 from "../assets/img/Ellipse 1.png";
import RightImage from "../assets/img/Right_back.png";
import LeftImage from "../assets/img/Left_back.png";

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
      // Retrieve JWT token from local storage
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      const res = await fetch("/api/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleLogout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem("jwt");

    router.push("/");
  };

  return (
    <main
      className=" w-full min-h-screen flex flex-col lg:items-center lg:relative"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="relative w-full h-screen flex ">
        <Image
          src={Ellipse01}
          alt=""
          className="  w-full h-full object-cover z-10"
        />
        <div className="absolute left-0 bottom-0">
          <Image src={LeftImage} alt="" className="" />
        </div>
        <div className="absolute right-0 top-0">
          <Image src={RightImage} alt="" className="" />
        </div>

        <div
          className="flex space-x-3 items-center justify-center cursor-pointer lg:mt-14 w-full lg:w-auto absolute  lg:right-14 bottom-10 lg:bottom-14 z-50"
          onClick={handleLogout}
        >
          <Image
            src={logoutIMG}
            alt="logout IMG"
            className="md:w-[43px] md:h-[43px] h-8 w-8"
          />
          <p className="underline underline-offset-4 text-white font-normal text-[20px] md:text-[25px]">
            Logout
          </p>
        </div>

        <div className="absolute top-0 z-20 w-full flex justify-center max-h-screen min-h-screen  overflow-scroll">
          <div className="lg:w-3/4 w-[90%] ">
            {/* Header Section */}
            <div className="w-full flex flex-col items-center lg:items-start mt-[72px]">
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
            <div className="flex justify-between items-center lg:mt-14 sm:px-5">
              <h1 className="text-[30px] md:text-[50px] my-10 font-bold text-white text-left">
                Contacts
              </h1>
              <Link href="/contacts/new">
                <button
                  type="button"
                  className="text-white leading-4 bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[150px] sm:w-[255px] h-[38px] md:h-[48px] rounded-full text-[14px] md:text-[25px] sm:text-[20px] font-normal"
                >
                  Add New Contact
                </button>
              </Link>
            </div>

            {/* Contacts Table */}
            <div className="relative overflow-x-auto shadow-md bg-white rounded-[30px]">
              <table className="w-full text-sm text-left rtl:text-right overflow-scroll ">
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
                                    editedUser?.gender === "Female"
                                      ? "Male"
                                      : "Female";
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Table);
