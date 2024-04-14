import logo from "../assets/img/logo.png";
import Image from "next/image";
import contactIMG from "../assets/img/contacts portal.png";
import Link from "next/link";

function Login() {
  return (
    <main className="flex  w-full items-center justify-between flex-col-reverse sm:flex-row sm:min-h-screen  ">
      <div className="w-full  bg-customGreen flex items-center justify-center flex-col  py-16 md:py-0  px-4 sm:min-h-screen sm:px-5 lg:w-1/2 ">
        <div className="flex flex-col justify-evenly  items-center w-full md:items-start md:w-auto">
          <div className="w-[263px] ">
            <h1 className="text-[50px] font-bold text-white"> Hi there,</h1>
            <span className="text-[35px] font-normal text-white">
              Welcome to our contacts portal
            </span>
          </div>
          <form action="" className="w-full mt-14">
            <input
              type="email"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500  text-customGreen placeholder-customGreen md:w-[477px]"
              placeholder="e-mail"
              required
            />
            <input
              type="password"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block  h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full   text-customGreen placeholder-customGreen  md:w-[477px]"
              placeholder="password"
              required
            />
          </form>

          <div className=" flex justify-start mt-10 ">
            <Link href="/pages/welcome">
              <button
                type="button"
                className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white w-[131px] sm:w-[90px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
              >
                login
              </button>
            </Link>
            <Link href="/pages/register">
              <div className="h-[40px]  text-white ml-4 flex items-center">
                <p className="text-[15px] md:text-[25px]">
                  or{" "}
                  <span className="underline underline-offset-4 cursor-pointer">
                    Click here to Register
                  </span>{" "}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-36 md:py-0 truncate flex justify-center relative items bg-back sm:min-h-screen sm:px-5 lg:w-1/2 ">
        <div
          className=" h-screen w-52 absolute hidden lg:block bg-customGreen"
          style={{
            borderRadius: "0 100% 100% 0",
            left: "-100px",
          }}
        ></div>

        <div className="w-full flex flex-col lg:pl-10 justify-center items-center">
          <div className=" ">
            <Image
              src={logo}
              alt="logo"
              className="h-[60px] w-[170px] cursor-pointer mb-14 md:mb-5"
            />
            <Image src={contactIMG} alt="logo" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
