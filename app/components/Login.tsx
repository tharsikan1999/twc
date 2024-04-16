"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import contactIMG from "../assets/img/contacts portal.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Perform form validation if necessary
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT in localStorage
        localStorage.setItem("jwt", data.token);

        // Redirect the user to the welcome page
        router.push("/pages/welcome");
      } else {
        setError(data.error || "An error occurred during login.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to authenticate user.");
    }
  };

  return (
    <main
      className="flex w-full items-center  justify-between flex-col-reverse sm:flex-row sm:min-h-screen"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="w-full bg-customGreen flex items-center justify-center flex-col py-16 md:py-0 px-4 sm:min-h-screen sm:px-5 lg:w-1/2">
        <div className="flex flex-col justify-evenly items-center w-full md:items-start md:w-auto">
          <div className="w-[293px]">
            <h1 className="text-[50px] font-bold text-white">Hi there,</h1>
            <span className="text-[35px] font-normal text-white">
              Welcome to our contacts portal
            </span>
          </div>
          <form className="w-full mt-14">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px]  font-normal"
              placeholder="e-mail"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal"
              placeholder="password"
              required
            />
            {/* Error message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </form>

          <div className=" flex justify-between items-center md:flex-row flex-col mt-8">
            <div className="flex justify-center md:justify-start ">
              <button
                type="submit"
                className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 w-[131px] px-3  h-[48px] md:text-[25px] text-[23px] border-1 border-white rounded-[50px]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className="flex justify-start mt-6 md:mt-0">
              <Link href="/pages/register">
                <div className="h-[40px] text-white ml-4 flex items-center">
                  <p className="text-[20px] md:text-[25px]">
                    or{" "}
                    <span className="underline underline-offset-4 cursor-pointer">
                      Click here to Register
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-36 md:py-0 truncate flex justify-center relative items bg-back sm:min-h-screen sm:px-5 lg:w-1/2">
        <div
          className="h-screen w-52 absolute hidden lg:block bg-customGreen"
          style={{
            borderRadius: "0 100% 100% 0",
            left: "-100px",
          }}
        ></div>
        <div className="w-full flex flex-col lg:pl-10 justify-center items-center">
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

export default Login;
