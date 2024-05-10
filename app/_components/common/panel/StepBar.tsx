import Link from "next/link";
import React from "react";

const StepBar = ({ array }: { array: { title: string; url?: string; icon?: string }[] }) => {
   return (
      <div className="w-fit overflow-x-auto flex items-center border lg:border-none border-gray-300 px-3 py-2 rounded-lg">
         <div className="flex items-center text-text1">
            <i className="fa fa-regular fa-edit ml-3 text-[10px] lg:text-[14px]" />
            <Link href="/profile/panel">
               <p className="whitespace-nowrap text-[10px] lg:text-[14px] leading-[25.5px] font-bold">
                  پنل مدیریتی
               </p>
            </Link>
         </div>
         <i className="fa fa-solid fa-angle-left mx-3 lg:mx-4 text-[10px] lg:text-[14px] text-text1" />
         {array?.map((item, index) => {
            return (
               <div key={index} className="flex items-center text-text1">
                  {item?.icon ? (
                     <i
                        className={`fa fa-regular fa-${item?.icon} ml-3 text-[10px] lg:text-[14px]`}
                     />
                  ) : null}
                  {item?.url ? (
                     <Link href="/profile/panel">
                        <p className="text-[10px] lg:text-[14px] leading-[25.5px] font-bold">
                           {item?.title}
                        </p>
                     </Link>
                  ) : (
                     <p className="text-[10px] whitespace-nowrap lg:text-[14px] leading-[25.5px] font-bold">
                        {item?.title}
                     </p>
                  )}
                  {index + 1 === array?.length ? null : (
                     <i className="fa fa-solid fa-angle-left mx-3 lg:mx-4 text-[10px] lg:text-[14px] text-text1" />
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default StepBar;
