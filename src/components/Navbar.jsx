import React from "react";

import Image from "next/image";
import Link from "next/link";

import logoImg from "../../public/logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-white flex justify-between sticky top-0 h-20">
      <Link
        className="flex align-middle hover:bg-sky-700 p-2 hover:text-white"
        href="/"
      >
        <Image
          src={logoImg.src}
          alt="One antenna"
          width={60}
          height={60}
        ></Image>
        <span className="place-self-center">Comms V-Lab</span>
      </Link>
      <Link
        className="place-self-center flex flex-col justify-center items-center hover:bg-sky-700 hover:text-white h-full"
        href="/param"
      >
        Parameter selector
      </Link>
      <Link
        className="place-self-center flex flex-col justify-center items-center hover:bg-sky-700 hover:text-white h-full"
        href="/antenna"
      >
        Antenna calculation
      </Link>
      <Link
        className="place-self-center flex flex-col justify-center items-center hover:bg-sky-700 hover:text-white h-full"
        href="/basic"
      >
        Basic Link Power Equation
      </Link>
      <Link
        className="place-self-center flex flex-col justify-center items-center hover:bg-sky-700 hover:text-white h-full mr-4"
        href="/noise"
      >
        System Noise
      </Link>
    </nav>
  );
};

export default Navbar;
