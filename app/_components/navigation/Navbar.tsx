import React from "react";
import NavLink from "./NavLink";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";

const navbarLi = [
   {
      title: "آزمون‌های روانشناختی",
      dataSet: "quiz",
   },
];

const Navbar = ({ homeFixed }: { homeFixed?: boolean }) => {
   return (
      <>
         <HamburgerMenu />
         <div className={`hidden lg:flex items-center relative pr-[20px]`}>
            <Link href="/" className="text-text1 textXl ml-20">
               سامانه نظرسنجی
            </Link>

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
