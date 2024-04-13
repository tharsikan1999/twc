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

function Table() {
  interface User {
    _id: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
  }

  const [users, setUsers] = useState<User[]>([]);

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

  const handleDelete = async (index: number) => {
    const contactName = users[index].name;

    const shouldDelete = window.confirm(
      `Do you want to delete this contact  ${contactName} ?`
    );
    if (shouldDelete) {
      try {
        await axios.delete(`/api/delete/${users[index]._id}`);
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
        window.alert("Failed to delete note");
      }
    }
  };

  return (
    <main className="bg-customGreen w-full min-h-screen flex flex-col lg:items-center md:relative px-5 xl:px-0 md:pb-10">
      <div className="lg:w-3/4 min-h-screen lg:pt-[72px] lg:mb-28">
        <div className="w-full flex flex-col items-center lg:items-start">
          <div>
            <Image
              src={logo}
              alt="logo"
              height={24.03}
              width={72.94}
              className="cursor-pointer mb-3"
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
        <div className="flex justify-between items-center lg:mt-14 px-5">
          <h1 className="text-[30px] md:text-[50px] my-10 font-bold text-white text-center lg:text-left">
            Contacts
          </h1>
          <Link href="/pages/form">
            <button
              type="button"
              className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[170px] md:w-[255px] h-[38px] md:h-[48px] rounded-full text-[14px] md:text-[25px] sm:text-[16px] font-normal"
            >
              Add New Contact
            </button>
          </Link>
        </div>

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
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="w-[59px] h-[59px] cursor-pointer rounded-full"
                      src={user.gender === "Male" ? Man : Girl}
                      alt={`${user.name} image`}
                    />
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <FaPen className="cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">
                    <FaRegTrashCan
                      className="cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href="/">
          <div className="flex space-x-3 items-center justify-center cursor-pointer mt-14 absolute left-[35%] sm:left-[40%] md:left-[45%] bottom-5 lg:justify-end lg:right-14 md:bottom-5 lg:bottom-10">
            <Image src={logoutIMG} alt="Logout" height={24} width={24} />
            <p className="underline underline-offset-4 text-white font-normal text-[20px]">
              Logout
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Table;
