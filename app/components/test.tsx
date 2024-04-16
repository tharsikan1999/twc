import React from "react";
import backgroundIMG from "../assets/img/contact-us-back.png";
import Image from "next/image";
import Ellipse from "../assets/img/auth-Ellipse.png";
import Bg from "../assets/img/background.png";

function Test() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen relative flex">
        <Image
          src={Bg}
          alt=""
          className="w-1/2 h-full absolute object-cover z-10 right-0 "
        />
        <Image
          src={Ellipse}
          alt=""
          className="w-3/5 h-screen absolute  z-20 left-0"
        />
      </div>
    </div>
  );
}

export default Test;
