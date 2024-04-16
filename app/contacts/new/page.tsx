"use client";

import withAuth from "../../../middleware/withAuth";
import logo from "../../assets/img/Logo-white.png";
import Image from "next/image";
import contactIMG from "../../assets/img/contacts portal white.png";
import logoutIMG from "../../assets/img/bx_log-out-circle.png";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Ellipse01 from "../../assets/img/Ellipse 1.png";
import RightImage from "../../assets/img/Right_back.png";
import LeftImage from "../../assets/img/Left_back.png";

function AddContact() {
  const router = useRouter();
  interface ContactData {
    name: string;
    email: string;
    phone: string;
    gender: string;
  }
  // State variable to manage form data
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to validate the form data
  const validateForm = () => {
    // Initialize errors object
    const errors: Partial<ContactData> = {};
    let isValid = true;

    // Check name
    if (!contactData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Check email
    if (!contactData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Check phone
    if (!contactData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    // Check gender
    if (!contactData.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    setErrors(errors);

    if (!isValid) {
      // Construct an error message string from the errors object
      const errorMessage = Object.values(errors).join("\n");

      // Display the alert with the error message
      window.alert(errorMessage);

      // Stop form submission
      return;
    }
    return isValid;
  };

  // Handle form submission
  const handleAddContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Retrieve JWT token from local storage
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      // Make a POST request to the server with the form data and headers
      await axios.post("/api/add", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Perform any additional actions after the request, e.g. clearing the form
      setContactData({
        name: "",
        email: "",
        phone: "",
        gender: "",
      });

      router.push("/contacts");
    } catch (error) {
      console.error("Error adding contact:", error);
      // Handle the error appropriately, e.g. display an error message
    }
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
      className="w-full min-h-screen flex flex-col lg:items-center lg:relative "
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
        <div className="absolute top-0 z-20 w-full min-h-screen flex justify-center">
          <div className="my-5 lg:w-3/4 mt-[72px]">
            <div className="w-full flex flex-col items-center lg:items-start">
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  className="h-[24.03px] w-[72.94px] cursor-pointer mb-3"
                  onClick={GoToHome}
                />
                <Image
                  src={contactIMG}
                  alt="logo"
                  className="w-[136.76px] h-[60.77px]"
                />
              </div>
            </div>
            <h1 className="text-[40px] md:text-[50px] lg:mt-24 font-bold text-white text-center mt-5 lg:text-left">
              New Contact
            </h1>
            <form className="w-full mt-10 lg:mt-16 px-6 lg:px-0">
              <div className="flex flex-col items-center lg:flex-row lg:space-x-10 lg:justify-between lg:w-3/4">
                <input
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleInputChange}
                  className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px] h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                  placeholder="Full name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleInputChange}
                  className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block h-[55px] pl-[41px] lg:text-[25px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex flex-col items-center lg:flex-row lg:space-x-10 lg:justify-between lg:w-3/4">
                <input
                  type="text"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleInputChange}
                  className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px] h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                  placeholder="Phone number"
                  required
                />

                <div className="flex items-center space-x-3 lg:w-[477px] lg:justify-between lg:pl-2">
                  <p className="text-[20px] lg:text-[25px] text-white font-normal">
                    Gender
                  </p>
                  <div className="flex items-center space-x-3">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={contactData.gender === "Male"}
                      onChange={handleInputChange}
                      className="w-4 h-4 ml-10 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <span className="text-[20px] lg:text-[25px] text-white font-normal">
                      Male
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={contactData.gender === "Female"}
                      onChange={handleInputChange}
                      className="w-4 h-4 ml-10 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-[20px] lg:text-[25px] text-white font-normal">
                      Female
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10 lg:justify-start 2xl:mt-16">
                <button
                  type="submit"
                  className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white px-5 md:w-[323px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
                  onClick={handleAddContact}
                >
                  Add your first contact
                </button>
              </div>
            </form>
            <Link href="/">
              <div
                className="flex space-x-3 items-center justify-center cursor-pointer mt-14 lg:absolute lg:right-14 lg:bottom-14"
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
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withAuth(AddContact);
