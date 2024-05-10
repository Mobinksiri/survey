"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getSearchRedux } from "@/app/store/searchOpen";
import { MobileNavLink } from "./MobileNavLink";
import { motion } from "framer-motion";

const HamburgerMenu = () => {
   const router = useRouter();
   const pathname = usePathname();

   const { searchActive } = useSelector(getSearchRedux);

   const [menuOpen, setMenuOpen] = useState(false);

   // disable scroll
   function preventDefault(e: Event): void {
      e = e || window.event;
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
   }
   function theMouseWheel(e: WheelEvent): void {
      preventDefault(e);
   }
   function disableScroll(): void {
      if (window.addEventListener) {
         window.addEventListener("wheel", theMouseWheel, {
            passive: false,
         } as EventListenerOptions);
      }
      document.addEventListener("wheel", theMouseWheel, { passive: false } as EventListenerOptions);
   }
   function enableScroll(): void {
      if (window.removeEventListener) {
         window.removeEventListener("wheel", theMouseWheel, {
            passive: false,
         } as EventListenerOptions);
      }
      document.removeEventListener("wheel", theMouseWheel, {
         passive: false,
      } as EventListenerOptions);
   }
   const handelHamburgerMenu = () => {
      setMenuOpen(true);
   };
   // --------------

   useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
         preventDefault(e);
      };

      if (menuOpen) {
         disableScroll();
      } else {
         enableScroll();
      }

      return () => {
         enableScroll();
         window.removeEventListener("wheel", handleWheel);
         document.removeEventListener("wheel", handleWheel);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [menuOpen]);

   const variants = {
      initial: {
         right: "-100%",
         // opacity: 0,
      },
      animate: {
         right: 0,
         // opacity: 1,
      },
   };

   const backdropOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLDivElement;
      if (target.id === "menu-hamburger-list") {
         setMenuOpen(false);
      }
   };

   return (
      <div className="lg:hidden">
         <div className="flex bg-gray-100 rounded-full w-12 h-12 justify-center items-center">
            <i
               className="fa-solid fa-bars cursor-pointer w-full h-full flex items-center justify-center"
               onClick={handelHamburgerMenu}
            ></i>
            <div
               className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] transition duration-300 z-[2] ${
                  menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
               }`}
               onClick={backdropOnClick}
               id="menu-hamburger-list"
            />
            <motion.div
               variants={variants}
               initial="initial"
               animate={menuOpen ? "animate" : "initial"}
               transition={{}}
               className="fixed w-2/3 z-[50] top-0 h-screen"
            >
               <div className="relative h-full bg-white pt-20">
                  <i
                     onClick={() => setMenuOpen(false)}
                     className="absolute py-4 px-6 top-0 left-0 fa fa-regular fa-close text-[22px] text-text1 cursor-pointer"
                  />
                  <MobileNavLink setMenuOpen={setMenuOpen} />
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default HamburgerMenu;
