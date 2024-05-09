"use client";

import React from "react";

const SectionTitle = ({
   title,
   decInfo,
   more = false,
   className,
   decOnClick,
   titleClassName,
}: {
   title: string;
   decInfo?: string;
   more?: boolean;
   className?: string;
   decOnClick?: () => void;
   titleClassName?: string;
}) => {
   return (
      <div
         className={`justify-center flex text-center items-center lg:justify-between ${className} z-[10]`}
      >
         <h2
            onClick={() => {
               if (decOnClick) {
                  decOnClick();
               }
            }}
            className={`textLg font-extrabold cursor-pointer text-text1 transition-all hover:text-text3 ${titleClassName}`}
         >
            {title}
         </h2>
         {more && (
            <div
               onClick={decOnClick}
               className={`hidden lg:flex items-center ${decOnClick ? "cursor-pointer" : ""}`}
            >
               <span className="textSm font-normal text-gray1 ml-3">{decInfo}</span>
               <i className="fa-regular fa-chevron-left text-[12px] text-gray1" />
            </div>
         )}
      </div>
   );
};

export default SectionTitle;
