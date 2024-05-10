"use client";

import { setIsOpenUserRevoke } from "@/app/store/userRevoke";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const Item = ({ title, onClick, href }: { title: string; onClick?: any; href?: string }) => {
   const pathname = usePathname();

   if (href) {
      return (
         <Link
            href={href}
            onClick={onClick}
            className={`w-full cursor-pointer px-6 py-4 transition-all ${
               href && pathname?.includes(href) ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
         >
            {title}
         </Link>
      );
   } else {
      return (
         <div
            onClick={onClick}
            className={`w-full cursor-pointer px-6 py-4 hover:bg-gray-50 transition-all`}
         >
            {title}
         </div>
      );
   }
};

const ProfileSidebar = () => {
   const dispatch = useDispatch();

   const revokeFunction = () => {
      dispatch(setIsOpenUserRevoke(true));
   };

   return (
      <>
         {/* avatar */}
         <div className="col-span-4 overflow-hidden lg:w-auto rounded-md h-fit justify-around shadow-default flex mx-auto lg:mx-0 flex-row lg:flex-col">
            <Item href="profile" title="حساب کاربری" />
            <Item href="profile/panel" title="پنل مدیریتی" />
            <Item onClick={revokeFunction} title="خروج از حساب کاربری" />
         </div>
      </>
   );
};

export default ProfileSidebar;
