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

function Table() {
  const users = [
    {
      name: "Neil Sims",
      gender: "Male",
      email: "neil.sims@flowbite.com",
      phone: "(123) 456-7890",
    },
    {
      name: "Isabella Moore",
      gender: "Female",
      email: "isabella.moore@example.com",
      phone: "(234) 567-8901",
    },
    {
      name: "Liam Johnson",
      gender: "Male",
      email: "liam.johnson@example.com",
      phone: "(345) 678-9012",
    },
    {
      name: "Emma Williams",
      gender: "Male",
      email: "emma.williams@example.com",
      phone: "(456) 789-0123",
    },
    {
      name: "Ethan Brown",
      gender: "Female",
      email: "ethan.brown@example.com",
      phone: "(567) 890-1234",
    },
    {
      name: "Olivia Jones",
      gender: "Male",
      email: "olivia.jones@example.com",
      phone: "(678) 901-2345",
    },
    {
      name: "Aiden Smith",
      gender: "Male",
      email: "aiden.smith@example.com",
      phone: "(789) 012-3456",
    },
    {
      name: "Sophia Taylor",
      gender: "Female",
      email: "sophia.taylor@example.com",
      phone: "(890) 123-4567",
    },
    {
      name: "Noah Davis",
      gender: "Female",
      email: "noah.davis@example.com",
      phone: "(901) 234-5678",
    },
    {
      name: "Charlotte Martinez",
      gender: "Female",
      email: "charlotte.martinez@example.com",
      phone: "(012) 345-6789",
    },
  ];

  // Add more user objects here as needed

  return (
    <main className=" bg-customGreen w-full min-h-screen flex flex-col  lg:items-center lg:relative px-5 xl:px-0">
      <div className=" lg:w-3/4 min-h-screen  lg:pt-[72px] lg:mb-28">
        <div className=" w-full flex flex-col items-center lg:items-start">
          <div className="">
            <Image
              src={logo}
              alt="logo"
              className="h-[24.03px] w-[72.94px] cursor-pointer mb-3"
            />
            <Image
              src={contactIMG}
              alt="logo"
              className="w-[136.76px] h-[60.77px]"
            />
          </div>
        </div>
        <div className="  flex justify-between items-center lg:mt-14 px-5">
          <h1 className="text-[30px] md:text-[50px] my-10  font-bold text-white text-center lg:text-left">
            Contacts
          </h1>
          <Link href="/pages/form">
            <button
              type="button"
              className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white w-[170px] md:w-[255px]  h-[38px] md:h-[48px] rounded-full text-[14px] md:text-[25px] sm:text-[16px] font-normal"
            >
              add new contact
            </button>
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md   bg-white rounded-[30px]">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className=" text-customGreen font-bold md:text-[18px] text-[15px] uppercase">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  full name
                </th>
                <th scope="col" className="px-6 py-3">
                  gender
                </th>
                <th scope="col" className="px-6 py-3">
                  e-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  phone number
                </th>
                <th scope="col" className="py-3"></th>
                <th scope="col" className=" py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className=" text-[17px] font-normal text-customGreen "
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white  "
                  >
                    <Image
                      className="w-[59px] h-[59px] cursor-pointer rounded-full"
                      src={user.gender === "Male" ? Man : Girl}
                      alt={`${user.name} image`}
                    />
                  </th>
                  <td className="px-6 py-4 ">{user.name}</td>
                  <td className="px-6 py-4">
                    <div className=" h-full flex">{user.gender}</div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>

                  <td className="  px-6 py-4">
                    <FaPen className=" cursor-pointer" />
                  </td>

                  <td className=" px-6 py-4">
                    <FaRegTrashCan className=" cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href="/">
          <div className=" flex space-x-3 items-center justify-center cursor-pointer mt-14 absolute left-[35%] sm:left-[40%] md:left-[45%] bottom-5 lg:justify-end lg:right-14 lg:bottom-14">
            <Image src={logoutIMG} alt="logout IMG" />
            <p className=" underline underline-offset-4 text-white font-normal text-[20px]">
              logout
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Table;
