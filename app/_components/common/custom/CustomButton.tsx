"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CustomButtonProps {
   variant: "primary" | "outline";
   type?: "button" | "submit" | "reset";
   children: React.ReactNode | string;
   disable?: boolean;
   className?: string;
   onClick?: (e?: any) => void;
   primaryButtonStyle?: string;
   primaryButtonHoverStyle?: string;
   props?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
   variant,
   type = "button",
   children,
   disable = false,
   className,
   onClick,
   primaryButtonStyle,
   primaryButtonHoverStyle,
   props,
}: CustomButtonProps) => {
   const [buttonHovered, setButtonHovered] = useState(false);

   let buttonBounce = disable ? undefined : 0.6;
   let buttonDamping = disable ? undefined : 7.5;

   let buttonStyles = `relative w-full textSmm font-medium h-8 flex items-center justify-center rounded-md px-3 overflow-hidden ${
      disable ? "!opacity-50" : "!opacity-100"
   } ${className ?? ""}`;

   let buttonHoverStyles = `w-full h-full absolute transition-all ${
      buttonHovered ? "top-0" : "top-full"
   }`;

   let hoverScale = 1;

   useEffect(() => {
      setButtonHovered(false);
   }, [disable]);

   switch (variant) {
      case "primary":
         buttonStyles += ` bg-[#E66D24] text-white ${primaryButtonStyle}`;
         buttonHoverStyles += ` bg-[#c35f21] ${primaryButtonHoverStyle}`;
         break;

      case "outline":
         buttonStyles += " bg-transparent border text-[#E66D24] border-[#E66D24]";
         hoverScale = 0.975;
         break;

      default:
         break;
   }

   return (
      <motion.button
         transition={{
            type: "spring",
            bounce: buttonBounce,
            damping: buttonDamping,
         }}
         className={buttonStyles}
         onMouseEnter={() => setButtonHovered(true)}
         onMouseLeave={() => setButtonHovered(false)}
         disabled={disable}
         type={type}
         whileHover={{
            scale: hoverScale,
         }}
         onClick={!disable ? onClick : () => {}}
         {...props}
      >
         <div className={buttonHoverStyles}></div>
         <div className="relative">{children}</div>
      </motion.button>
   );
};

export default CustomButton;
