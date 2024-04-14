"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/img/logo.png";
import contactIMG from "../../assets/img/contacts portal.png";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear previous error message
    setErrorMessage("");

    // Send form data to backend API
    try {
      const response = await axios.post("/api/register", {
        email: formData.email,
        password: formData.password,
      });

      // Handle successful registration
      if (response.status === 201) {
        // Redirect to welcome page
        window.location.href = "/pages/welcome";
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Failed to register user. Please try again.");
    }
  };

  return (
    <main className="flex w-full items-center justify-between flex-col-reverse sm:flex-row sm:min-h-screen">
      {/* Registration form */}
      <div className="w-full bg-customGreen flex items-center justify-center flex-col py-16 md:py-0 px-4 sm:min-h-screen sm:px-5 lg:w-1/2">
        <div className="flex flex-col justify-evenly items-center w-full md:items-start md:w-auto">
          {/* Form Title */}
          <h1 className="sm:text-[50px] text-[35px] font-bold text-white">
            Register Now!
          </h1>

          {/* Registration Form */}
          <form className="w-full mt-14" onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px]"
              placeholder="e-mail"
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-customGreen placeholder-customGreen md:w-[477px]"
              placeholder="create password"
              required
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px]"
              placeholder="confirm password"
              required
            />

            {/* Display error message, if any */}
            {errorMessage && (
              <div className="text-red-600 text-center mb-4">
                {errorMessage}
              </div>
            )}

            {/* Register Button */}
            <div className="flex justify-start mt-10">
              <button
                type="submit"
                className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[131px] md:w-[149px] sm:w-[90px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
              >
                Register
              </button>
            </div>
          </form>

          {/* Link to login */}
          <Link href="/">
            <div className="h-[40px] text-white flex items-center mt-10 lg:mt-20">
              <p className="text-[15px] md:text-[25px] underline underline-offset-4 cursor-pointer">
                &lt; Back to login
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Logo and contact images */}
      <div className="w-full py-36 md:py-0 truncate flex justify-center relative items bg-back sm:min-h-screen sm:px-5 lg:w-1/2">
        {/* Logo and Contact Image */}
        <div className="w-full flex flex-col justify-center items-center">
          <div>
            <Image
              src={logo}
              alt="logo"
              className="h-[60px] w-[170px] cursor-pointer mb-14 md:mb-5"
            />
            <Image src={contactIMG} alt="contact image" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
