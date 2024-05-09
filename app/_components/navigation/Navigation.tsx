import React from "react";
import Navbar from "./Navbar";
import LoginSearch from "./LoginSearch";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { getLoading } from "@/app/store/loading";
import Loading from "@/app/_components/loading/Loading";
import { motion } from "framer-motion";

const Navigation = () => {
   const pathname = usePathname();

   const { apiLoading } = useSelector(getLoading);

   return (
      <>
         {/* <Loading activate={apiLoading} /> */}
         <div
            className={`p-5 mb-10 rounded-md bg-white custom-container flex items-center justify-between transition-all`}
         >
            <Navbar />
            <LoginSearch />
         </div>
      </>
   );
};

export default Navigation;
