"use client";

import CustomInput from "@/app/_components/common/custom/CustomInput";
import ProfileSidebar from "../(profile)/profileSidebar/ProfileSidebar";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@/app/store/user";
import { redirect, useParams, useRouter } from "next/navigation";
import { profileSearchItems } from "@/app/_utils/profileSearchItems";
import { useEffectSkipFirstRender } from "@/app/_hooks/useEffectSkipFirstRender";
import Link from "next/link";
import Image from "next/image";
import userLayout from "@/app/_assets/other/profile/userbox.svg";

interface searchedItemProp {
   title: string;
   href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const [searchedValue, searchedValueSet] = useState(null);
   const { singleTest } = useParams();

   const [searchedItems, searchedItemsSet] = useState<searchedItemProp[]>([]);

   const { userData } = useSelector(getUser);
   const router = useRouter();

   useLayoutEffect(() => {
      if (!userData) {
         redirect("/");
      }
   }, [userData]);

   useEffectSkipFirstRender(() => {
      if (searchedValue && profileSearchItems) {
         const trimmedSearchedValue = searchedValue as string;
         if (trimmedSearchedValue?.trim()) {
            const foundedItems = profileSearchItems?.filter((item) =>
               item?.title?.trim().includes(trimmedSearchedValue?.trim())
            );
            searchedItemsSet(foundedItems);
         }
      } else {
         searchedItemsSet([]);
      }
   }, [searchedValue]);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
         e.preventDefault();
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
      } else if (e.key === "Enter") {
         e.preventDefault();
         if (searchedItems.length > 0) {
            const selectedItem = searchedItems[0];
            redirect(selectedItem.href);
         }
      }
   };

   return (
      <div>
         <title>حساب کاربری</title>
         <div className="custom-container pb-[90px] lg:pb-0">
            <div className="lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))] lg:gap-8 gap-4">
               {/* left side category */}
               {!singleTest && (
                  <div className="z-[8] fixed bottom-0 left-0 lg:block lg:col-span-4 lg:sticky lg:top-[105px] w-full lg:h-[calc(100vh-182px)]">
                     <div className="bg-white lg:overflow-hidden shadow-default lg:shadow-sidebar lg:rounded-md h-full">
                        <div className="relative profile-sidebar-scrollBar lg:overflow-y-auto lg:pb-6 h-full lg:flex flex-col justify-between">
                           <ProfileSidebar />
                        </div>
                     </div>
                  </div>
               )}

               {/* body */}
               <div
                  className={`lg:w-full ${
                     singleTest ? "lg:col-[span_14_/_span_14]" : "lg:col-span-10"
                  }`}
               >
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}
