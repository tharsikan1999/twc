import React from "react";
import backgroundIMG from "../assets/img/contact-us-back.png";
import Image from "next/image";
import "./Test.css";

function Test() {
  return (
    <div>
      <div className="ellipse-1">
        <div className="mt-[11rem] ml-20  body00">
          <div className="mt-20 ml-40">
            <div className="inline-flex ">
              <img src="logo.png" alt="" className="w-8 h-10" />
              <h1 className="text-[25px] text-[#ffffff] font-bold">twc</h1>
            </div>

            <div>
              <h1 className="text-[25px] text-[#ffffff] font-bold -mt-4">
                {" "}
                contacts{" "}
              </h1>
              <h1 className="text-[25px] text-[#ffffff] font-bold -mt-4">
                portal
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
