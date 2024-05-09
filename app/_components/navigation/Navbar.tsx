"use client";

import React from "react";
import Image from "next/image";
import NavLink from "./NavLink";
import useScrollY from "@/app/_hooks/useScrollY";
import LogoWhite from "@/app/_assets/other/navigation/logowhitesvg.svg";
import LogoBlack from "@/app/_assets/other/navigation/logoblacksvg.svg";
import { usePathname, useRouter } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";

const navbarLi = [
   {
      title: "آزمون‌های روانشناختی",
      dataSet: "quiz",
   },
];

const Navbar = ({ homeFixed }: { homeFixed?: boolean }) => {
   const scrollY = useScrollY();
   const pathname = usePathname();

   return (
      <>
         <HamburgerMenu />
         <div className={`hidden lg:flex items-center relative pr-[20px]`}>
            <h4 className="">نظرسنجی</h4>

            {/* Navbar ul list */}
            <ul className="list-none flex items-center">
               {navbarLi?.map((li, index) => (
                  <NavLink homeFixed={homeFixed} index={index} key={index} li={li} />
               ))}
            </ul>
         </div>
      </>
   );
};

export default Navbar;
