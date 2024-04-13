import logo from "../../assets/img/logo.png";
import Image from "next/image";
import contactIMG from "../../assets/img/contacts portal.png";
import Link from "next/link";

function Register() {
  return (
    <main className="flex  w-full items-center justify-between flex-col-reverse sm:flex-row sm:min-h-screen  ">
      <div className="w-full  bg-customGreen flex items-center justify-center flex-col  py-16 md:py-0  px-4 sm:min-h-screen sm:px-5 lg:w-1/2 ">
        <div className="flex flex-col justify-evenly  items-center w-full md:items-start md:w-auto">
          <div className=" ">
            <h1 className="sm:text-[50px] text-[35px]  font-bold text-white">
              {" "}
              Register Now!
            </h1>
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
              placeholder="create password"
              required
            />
            <input
              type="email"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500  text-customGreen placeholder-customGreen md:w-[477px]"
              placeholder="confirm password"
              required
            />
          </form>

          <div className=" flex justify-start mt-10 ">
            <Link href="/pages/welcome">
              <button
                type="button"
                className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white w-[131px] md:w-[149px] sm:w-[90px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
              >
                Register
              </button>
            </Link>
          </div>
          <Link href="/">
            <div className="h-[40px]  text-white flex items-center  mt-10 lg:mt-20">
              <p className="text-[15px] md:text-[25px] underline underline-offset-4 cursor-pointer">
                &lt; Back to login
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full py-36 md:py-0 truncate flex justify-center relative items bg-back  sm:min-h-screen sm:px-5 lg:w-1/2 ">
        {/*  <div
        className="border-2 border-blue-600 h-screen w-52 absolute bg-customGreen"
        style={{
          borderRadius: "0 100% 100% 0",
          left: "-110px",
        }}
      ></div>
*/}
        <div className="w-full flex flex-col justify-center items-center">
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

export default Register;
