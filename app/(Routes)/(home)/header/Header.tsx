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
      <div className="custom-container">
         <div className="rounded-md overflow-hidden relative lg:h-[400px]">
            <Image
               src={Background}
               alt="header background"
               className="hidden lg:block w-full h-full absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 object-cover"
            />
            <div className="hidden lg:block w-full h-full absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" />
            <div className="w-full">
               <div className="w-full lg:w-1/2 lg:pb-20">
                  <motion.h3
                     variants={variablesH3}
                     initial="hidden"
                     animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="text2xl lg:font-black text-text1 lg:text-white mb-4"
                  >
                     نظرتان مهم است!
                  </motion.h3>
                  <motion.h5
                     variants={variablesH5}
                     initial="hidden"
                     animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="textMd lg:font-bold text-text3 lg:text-white"
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
