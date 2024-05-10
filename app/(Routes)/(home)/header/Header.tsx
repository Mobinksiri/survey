import React from "react";
import Background from "@/app/_assets/other/header/header.jpg";
import Image from "next/image";

import { motion } from "framer-motion";

// const variablesH3 = {
//    visible: {
//       x: 0,
//       opacity: 1,
//    },
//    hidden: {
//       x: 100,
//       opacity: 0,
//    },
// };
// const variablesH5 = {
//    visible: {
//       y: 0,
//       opacity: 1,
//    },
//    hidden: {
//       y: -50,
//       opacity: 0,
//    },
// };

const Header = () => {
   return (
      <div className="custom-container">
         <div className="rounded-md overflow-hidden relative lg:h-[400px]">
            <div className="w-full flex items-center justify-between">
               <div>
                  <motion.h3
                     // variants={variablesH3}
                     // initial="hidden"
                     // animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="text2xl lg:font-black text-text1 mb-4"
                  >
                     نظرتان مهم است!
                  </motion.h3>
                  <motion.h5
                     // variants={variablesH5}
                     // initial="hidden"
                     // animate="visible"
                     transition={{ delay: 0.5, type: "spring" }}
                     className="textMd lg:font-bold text-text3"
                  >
                     به ما در بهبود خدمات کمک کنید
                  </motion.h5>
               </div>
               <div className="relative w-[480px] h-[660px]">
                  <Image
                     src={Background}
                     alt="header"
                     width={480}
                     height={660}
                     className="object-scale-down"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
