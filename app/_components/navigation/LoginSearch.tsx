"use client";

import React, { useEffect, useState } from "react";
import Search from "./Search";
import { usePathname } from "next/navigation";
import CustomButton from "../common/custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenLogin } from "@/app/store/login";
import { getUser } from "@/app/store/user";
import { motion } from "framer-motion";
import Image from "next/image";
import { useApiCall } from "@/app/_apiCall/apiCall";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import Link from "next/link";

const LoginSearch = () => {
   const dispatch = useDispatch();

   const pathname = usePathname();

   const [profileDropdownOpen, profileDropdownOpenSet] = useState(false);

   const openLoginModal = (e: any) => {
      e.stopPropagation();
      dispatch(setIsOpenLogin(true));
   };

   const { data, refetch } = useApiCall<any>({
      baseUrl: baseUrls?.person,
      method: "post",
      url: "/userPerson/getUserPersonById",
      queryOptions: {
         enabled: false,
      },
   });

   const { userData, userDetail } = useSelector(getUser);

   const variants = {
      rotate: { y: 0, opacity: 1 },
      stop: { y: -20, opacity: 0 },
   };

   useEffect(() => {
      profileDropdownOpenSet(false);
   }, [pathname]);

   useEffect(() => {
      if (userData && !userDetail) {
         refetch();
      }
   }, [userData]);

   useEffect(() => {
      const handleClickOutside = (event: any) => {
         const dropdown = document.querySelector(".profile-dropdown");

         if (dropdown && !dropdown.contains(event.target)) {
            profileDropdownOpenSet(false);
         }
      };

      const closeDropdown = () => {
         profileDropdownOpenSet(false);
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", closeDropdown);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("scroll", closeDropdown);
      };
   }, []);

   return (
      <div className="flex items-center">
         {/* <Search /> */}

         <div className="relative">
            {userData ? (
               <Link
                  href="/profile"
                  onClick={() => profileDropdownOpenSet((prev) => !prev)}
                  className="cursor-pointer px-2 py-1 textSmm rounded-md border border-[#E66D24] text-[#E66D24]"
               >
                  کاربر میهمان
               </Link>
            ) : (
               <>
                  <CustomButton onClick={openLoginModal} variant="primary">
                     ورود / ثبت نام
                  </CustomButton>
                  <div
                     onClick={openLoginModal}
                     className="lg:hidden relative border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center mr-6 cursor-pointer "
                  >
                     <i className="fa fa-regular fa-sign-in text-[18px]" />
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default LoginSearch;
