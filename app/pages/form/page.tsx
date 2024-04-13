import logo from "../../assets/img/Logo-white.png";
import Image from "next/image";
import contactIMG from "../../assets/img/contacts portal white.png";
import logoutIMG from "../../assets/img/bx_log-out-circle.png";
import Link from "next/link";

function AddContact() {
  return (
    <main className=" bg-customGreen w-full min-h-screen flex flex-col lg:items-center lg:relative">
      <div className=" my-5 lg:w-3/4 mt-[72px]">
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
        <h1 className="text-[40px] md:text-[50px] lg:mt-24 font-bold text-white text-center mt-5 lg:text-left">
          New Contact
        </h1>
        <form action="" className="w-full mt-10 lg:mt-16 px-6  lg:px-0 ">
          <div className="flex flex-col items-center lg:flex-row lg:space-x-10  lg:justify-between lg:w-3/4">
            <input
              type="text"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px]  h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500  text-customGreen placeholder-customGreen sm:w-3/4  md:w-[477px]"
              placeholder="full name"
              required
            />
            <input
              type="email"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block  h-[55px] pl-[41px] lg:text-[25px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full   text-customGreen placeholder-customGreen sm:w-3/4   md:w-[477px]"
              placeholder="e-mail"
              required
            />
          </div>
          <div className=" flex flex-col items-center lg:flex-row lg:items-center lg:space-x-10 lg:w-3/4 lg:justify-between">
            <input
              type="text"
              className="bg-white rounded-3xl mb-10 lg:mb-0 focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px]  h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500  text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
              placeholder="phone number"
              required
            />
            <div className=" flex justify-center lg:w-[477px] lg:justify-between lg:pl-2">
              <p className=" text-[20px] lg:text-[25px] text-white font-normal">
                gender
              </p>
              <div className="flex items-center space-x-3">
                <input
                  id="country-option-2"
                  type="radio"
                  name="countries"
                  value="Germany"
                  className="w-4 h-4 ml-10 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />

                <span className=" text-[20px] lg:text-[25px] text-white font-normal">
                  Male
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  id="country-option-2"
                  type="radio"
                  name="countries"
                  value="Germany"
                  className="w-4 h-4 ml-10  border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />

                <span className=" text-[20px] lg:text-[25px] text-white font-normal">
                  Female
                </span>
              </div>
            </div>
          </div>
          <div className=" flex justify-center mt-10 lg:justify-start lg:mt-20 ">
            <Link href="/pages/dashboard">
              <button
                type="button"
                className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white px-5 md:w-[323px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
              >
                add your first contact
              </button>
            </Link>
          </div>
        </form>
        <Link href="/">
          <div className=" flex space-x-3 items-center justify-center cursor-pointer mt-14 lg:absolute lg:right-14 lg:bottom-14">
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

export default AddContact;
