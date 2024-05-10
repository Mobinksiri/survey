import React from "react";
import Image from "next/image";

const loading = ({ activate }: { activate: boolean }) => {
   return (
      <div
         className={`fixed top-0 left-0 w-full h-full bg-[rgba(255,255,255,.95)] flex flex-col items-center justify-center z-[1000] transition-all ${
            activate ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
         }`}
      >
         <p className="textSmm text-text3 font-normal my-6">لطفا منتظر بمانید..</p>
      </div>
   );
};

export default loading;
