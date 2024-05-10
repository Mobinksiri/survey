import React from "react";
import Navbar from "./Navbar";
import LoginSearch from "./LoginSearch";
import { useSelector } from "react-redux";
import { getLoading } from "@/app/store/loading";
import Loading from "@/app/_components/loading/Loading";

const Navigation = () => {
   const { apiLoading } = useSelector(getLoading);

   return (
      <div className="h-[60px] flex items-center border-b border-b-gray-300 absolute top-0 left-0 w-full">
         <Loading activate={apiLoading} />
         <div className={`custom-container flex items-center justify-between transition-all`}>
            <Navbar />
            <LoginSearch />
         </div>
      </div>
   );
};

export default Navigation;
