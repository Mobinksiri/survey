import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LoginSearch from "./LoginSearch";
import useScrollY from "@/app/_hooks/useScrollY";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { getLoading } from "@/app/store/loading";
import Loading from "@/app/_components/loading/Loading";
import { motion } from "framer-motion";

const Navigation = () => {
   const pathname = usePathname();

   const isHome = pathname === "/";

   const { apiLoading } = useSelector(getLoading);

   return (
      <>
         {/* <Loading activate={apiLoading} /> */}
         <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            id="navigation"
            className={`w-full transition-all z-[10]`}
         >
            <div className={`custom-container flex items-center justify-between transition-all`}>
               <Navbar />
               <LoginSearch />
            </div>
         </motion.div>
      </>
   );
};

export default Navigation;
