"use client";
import React from "react";
import Image from "next/image";
import img from "../../public/next.svg";
import Navright from "./Navright";
import ReduxProvider from "./Provider";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-6 md:px-36 w-full px-6">
      <div className="left">
        <Image
          width={150}
          height={150}
          src={img}
          alt=""
          className=" relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        />
      </div>
      <div className="right flex justify-around gap-4">
        <ReduxProvider>
          <Navright />
        </ReduxProvider>
      </div>
    </nav>
  );
};

export default Navbar;
