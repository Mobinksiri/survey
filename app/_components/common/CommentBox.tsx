import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Ellipse from "@/app/_assets/other/forum/ellipse.svg";
import { CommentDetail } from "./TabBar";
import Link from "next/link";
import { stripHtmlTags } from "@/app/(Routes)/(quiz)/MainContent";

const commentVariants = {
   initial: {
      opacity: 0.5,
      y: -15,
      rotate: 1.5,
   },
   visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
   },
   exit: {
      opacity: 0.5,
      y: 15,
      rotate: 1.5,
   },
};

const transition = {
   type: "spring",
   duration: 0.5,
   bounce: 0.5,
};

interface commentBoxInterface {
   detail: CommentDetail;
   id: string | number;
}

const CommentBox = ({ detail, id }: commentBoxInterface) => {
   return (
      <motion.div
         key={id}
         variants={commentVariants}
         initial="initial"
         animate="visible"
         exit="exit"
         transition={transition}
         //
         className=" relative p-8 bg-white h-fit shadow-comment transition-shadow hover:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] w-full lg:w-[calc(50%-16px)]  rounded-2xl"
      >
         {/* ellipse */}
         <Image src={Ellipse} alt="ellipse" className="absolute bottom-4 left-10" />

         {/* subject element */}
         <div className="flex items-center justify-between mb-8 relative">
            <Link href={`/forum/${id}/${detail?.id}`}>
               <p className="textMd font-medium text-text1">{detail?.subject}</p>
            </Link>

            {/* total comments */}
            <div className="flex items-center justify-center px-2 py-[6px] bg-[#FDCB6E1A] rounded-lg">
               <i className="fa-regular fa-message-lines text-[#FDCB6E] text-[18px] ml-2" />
               <p className="text-[14px] font-normal text-[#FDCB6E] leading-[20px]">
                  {detail?.totalComment}
               </p>
            </div>
         </div>

         {/* comments message */}
         {detail?.comments &&
            detail?.comments?.[0] &&
            detail?.comments?.slice(0, 5)?.map((cm, index) => {
               return (
                  <div key={index} className="mb-8 last:mb-0 relative">
                     {/* profile */}
                     <div className="flex items-center mb-2">
                        <Image
                           src={cm?.arthur?.profileImage}
                           alt={`profile ${cm?.arthur?.name}`}
                           className="rounded-full ml-2 w-8 h-8"
                        />
                        <span className="textSmm text-text1 ml-5">{cm?.arthur?.name}</span>
                        <span className="textXs text-text3">{cm?.timestamp}</span>
                     </div>

                     {/* comment message */}
                     <p className="textSm text-text1 line-clamp-1">
                        {cm?.message ? stripHtmlTags(cm?.message) : null}
                     </p>
                  </div>
               );
            })}
      </motion.div>
   );
};

export default CommentBox;
