import React from "react";
import Background from "@/app/_assets/other/header/survey.jpg";
import Image from "next/image";

import { motion } from "framer-motion";

const variablesH3 = {
   visible: {
      x: 0,
      opacity: 1,
   },
   hidden: {
      x: 100,
      opacity: 0,
   },
};
const variablesH5 = {
   visible: {
      y: 0,
      opacity: 1,
   },
   hidden: {
      y: -50,
      opacity: 0,
   },
};

const Header = () => {
   return (
      <div className="relative lg:h-[700px] pb-[114px] pt-[188px] lg:py-0 lg:pt-[114px]">
         <div className="custom-container lg:h-full">
            {/* <Image
               src={Background}
               alt="header background"
               className="hidden lg:block w-full h-full absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 object-cover"
            /> */}
            {/* <div className="hidden lg:block w-full h-full absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" /> */}
            <div className="w-full lg:h-full flex items-center">
               <div className="w-full lg:w-1/2 lg:pb-20">
                  <motion.h3
                     variants={variablesH3}
                     initial="hidden"
                     animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="text-[24px] font-extrabold lg:text-[48px] lg:leading-[67.5px] lg:font-black text-text1 lg:text-white mb-4"
                  >
                     نظرتان مهم است!
                  </motion.h3>
                  <motion.h5
                     variants={variablesH5}
                     initial="hidden"
                     animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="text-[16px] font-normal lg:text-[24px] lg:leading-[33.5px] lg:font-bold text-text3 lg:text-white"
                  >
                     به ما در بهبود خدمات کمک کنید
                  </motion.h5>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
