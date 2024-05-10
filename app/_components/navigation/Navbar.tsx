import React from "react";
import NavLink from "./NavLink";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/_assets/other/navigation/logo.svg";

const navbarLi = [
   {
      title: "آزمون‌های روانشناختی",
      dataSet: "quiz",
   },
];

const Navbar = () => {
   return (
      <>
         <HamburgerMenu />
         <div className={`hidden lg:flex items-center relative pr-[20px]`}>
            <div className="flex items-center">
               <Image width={35} height={30} src={Logo} className="ml-3" alt="logo" />
               <Link href="/" className="text-text1 textMd ml-20">
                  سامانه نظرسنجی
               </Link>
            </div>

            {/* Navbar ul list */}
            {/* <ul className="list-none flex items-center">
               {navbarLi?.map((li, index) => (
                  <NavLink homeFixed={homeFixed} index={index} key={index} li={li} />
               ))}
            </ul> */}
         </div>
      </>
   );
};

export default Navbar;
