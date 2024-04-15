"use client";

import withAuth from "../../../middleware/withAuth";

import logo from "../../assets/img/Logo-white.png";
import Image from "next/image";
import contactIMG from "../../assets/img/contacts portal white.png";
import logoutIMG from "../../assets/img/bx_log-out-circle.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Welcome() {
  const router = useRouter();
  const GoToHome = () => {
    router.push("/");
  };

  const handleLogout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem("jwt");

    router.push("/");
  };

  return (
    <main className=" bg-customGreen w-full min-h-screen flex flex-col  lg:items-center lg:relative">
      <div className=" mt-10 lg:w-3/4 h-screen relative lg:pt-[72px] ">
        <div className=" w-full flex flex-col items-center lg:items-start">
          <div className="">
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
        <h1 className="text-[40px] md:text-[50px] lg:mt-32 font-bold text-white text-center mt-28 lg:text-left">
          Welcome,
        </h1>
        <p className=" text-white lg:text-[35px] text-[20px] text-center mt-5 lg:text-left xl:w-3/4">
          This is where your contacts will live. Click the button below{" "}
          <br className=" hidden" /> to add a new contact.
        </p>
        <form action="" className="w-full mt-32 lg:mt-20 px-6  lg:px-0 ">
          <div className=" flex justify-center mt-10 lg:justify-start lg:mt-20 ">
            <Link href="/pages/form">
              <button
                type="button"
                className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white px-7 md:w-[323px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
              >
                add your first contact
              </button>
            </Link>
          </div>
        </form>
        <Link href="/">
          <div
            className=" flex space-x-3 items-center justify-center cursor-pointer mt-14 absolute left-[35%] sm:left-[40%] md:left-[45%] bottom-14 lg:justify-end lg:right-14 lg:bottom-14"
            onClick={handleLogout}
          >
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

export default withAuth(Welcome);
