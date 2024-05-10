import apiCall, { useApiCall } from "@/app/_apiCall/apiCall";
import { IconBox } from "@/app/_components/common/comment/Comment";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import CustomInput from "@/app/_components/common/custom/CustomInput";
import Modal from "@/app/_components/common/modal/Modal";
import { NEED_LOGIN } from "@/app/_toast_messages";
import { getUser } from "@/app/store/user";
import Collapse from "@kunukn/react-collapse";
import moment from "moment-jalaali";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

const Comment = ({ data, reply, refetch }: { data: any; reply?: boolean; refetch: any }) => {
   const { userData } = useSelector(getUser);

   const [replyText, replyTextSet] = useState(null);
   const [replyIsActive, replyIsActiveSet] = useState(false);
   const [rate, rateSet] = useState(0);

   const addCommentFunction = () => {
      if (!replyText) {
         toast.error("لطفا پاسخ خود را بنویسید.");
         return;
      }
      if (rate === 0) {
         toast?.error("لطفا امتیاز را وارد کنید.");
         return;
      }

      return apiCall({
         url: "/api/commentOnPoll",
         method: "post",
         data: {
            pollId: data?.pollId,
            content: replyText,
            stars: rate,
            userId: userData?.userId,
            replyTo: data?.id,
         },
         callback: (res, er) => {
            if (res?.msg) {
               toast?.success(res?.msg ?? "");
               refetch();
               clearFunction();
            }
         },
      });
   };

   const clearFunction = () => {
      replyIsActiveSet(false);
      rateSet(0);
      replyTextSet(null);
   };

   return (
      <div className="border-b pb-6 mb-6 border-b-[#EFEFEF] last:border-none last:mb-0 last:pb-0">
         <Modal enableScrollProp isOpen={replyIsActive} onClick={clearFunction}>
            <div className="relative p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[460px] rounded-2xl">
               <div
                  className="items-end mr-auto w-fit flex justify-end absolute top-4 left-4 p-2 cursor-pointer"
                  onClick={clearFunction}
               >
                  <i className="fa fa-regular fa-close text-[20px]" />
               </div>
               <h3 className="textMd text-text1 border-b border-b-gray1 mb-4 pb-4">
                  پاسخ به دیدگاه {data?.userName}
               </h3>

               <div>
                  <CustomInput
                     parentClassName="mb-4"
                     state={replyText}
                     setState={replyTextSet}
                     label="نظر"
                     type="textarea"
                  />
                  <div className="mb-6">
                     <p className={`textSmm font-normal text-text3 mb-2 w-full`}>امتیاز</p>
                     <Rating
                        SVGclassName="inline w-6 h-6"
                        transition
                        iconsCount={5}
                        onClick={(e: number) => rateSet(e)}
                        initialValue={rate}
                     />
                  </div>
               </div>

               <div className="flex w-fit mr-auto">
                  <CustomButton
                     className="!w-fit px-4 ml-2"
                     variant="outline"
                     type="button"
                     onClick={clearFunction}
                  >
                     انصراف
                  </CustomButton>
                  <CustomButton
                     className="!w-fit px-4"
                     variant="primary"
                     type="button"
                     onClick={addCommentFunction}
                  >
                     ثبت
                  </CustomButton>
               </div>
            </div>
         </Modal>

         {/* header */}
         <div className="flex items-center w-full mb-2 lg:mb-5">
            {/* avatart */}
            <i className="w-12 h-12 rounded-full ml-4 flex items-center justify-center text-[15px] fa fa-regular fa-user bg-gray-100" />

            {/* other */}
            <div className="flex items-center justify-between w-full">
               <div className="flex">
                  <div>
                     <h5 className="textSm mb-1 font-medium text-text1 ml-4">{data?.userName}</h5>
                     <h5 className="textSmm mb-1 font-medium text-text3 ml-4">
                        {moment(data?.createdAt).format("jYYYY/jMM/jDD - HH:mm") ??
                           "1401.10.15 - 12:30"}
                     </h5>
                  </div>
                  {!reply && (
                     <IconBox
                        onClick={() => replyIsActiveSet((prev) => !prev)}
                        icon={replyIsActive ? "close" : "share"}
                        text="پاسخ"
                        className="!px-1.5 !py-1 !h-fit mr-4"
                     />
                  )}
               </div>
               <div className="flex items-end">
                  <Rating
                     SVGclassName="inline w-6 h-6"
                     initialValue={data?.stars}
                     readonly
                     transition
                     iconsCount={5}
                  />
                  <p className="textSmm text-text3 mr-3">{data?.stars}</p>
               </div>
            </div>
         </div>

         {/* comment */}
         <div className="mb-6">
            <p className="textSmm leading-6 font-normal text-text1 mb-4">{data?.content}</p>
         </div>

         {data?.replies &&
            data?.replies?.[0] &&
            data?.replies?.map((item: any, index: any) => {
               return (
                  <div key={index} className="mr-10 mt-6">
                     <Comment reply refetch={refetch} data={item} key={index} />
                  </div>
               );
            })}
      </div>
   );
};

const Comments = ({
   id,
   data,
   commentsArray,
   commentsRefetch,
}: {
   id: number;
   data: any;
   commentsArray: any;
   commentsRefetch: any;
}) => {
   const [addCommentModal, addCommentModalSet] = useState(false);
   const [comment, commentSet] = useState(null);
   const [rate, rateSet] = useState<number>(0);
   const { userData } = useSelector(getUser);

   const clearFunction = () => {
      addCommentModalSet(false);
      commentSet(null);
      rateSet(0);
   };

   const addCommentApiCall = () => {
      if (!comment) {
         toast?.error("لطفا نظر خود را وارد کنید.");
         return;
      }
      if (rate === 0) {
         toast?.error("لطفا امتیاز را وارد کنید.");
         return;
      }
      return apiCall({
         url: "/api/commentOnPoll",
         method: "post",
         data: {
            pollId: id,
            content: comment,
            stars: rate,
            userId: userData?.userId,
            replyTo: 0,
         },
         callback: (res, er) => {
            if (res?.msg) {
               toast?.success(res?.msg ?? "");
               commentsRefetch();
               clearFunction();
            }
         },
      });
   };

   return (
      <>
         {/* modal */}
         <Modal enableScrollProp isOpen={addCommentModal} onClick={clearFunction}>
            <div className="relative p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[460px] rounded-2xl">
               <div
                  className="items-end mr-auto w-fit flex justify-end absolute top-4 left-4 p-2 cursor-pointer"
                  onClick={clearFunction}
               >
                  <i className="fa fa-regular fa-close text-[20px]" />
               </div>
               <h3 className="textMd text-text1 border-b border-b-gray1 mb-4 pb-4">افزودن نظر</h3>

               <div>
                  <CustomInput
                     parentClassName="mb-4"
                     state={comment}
                     setState={commentSet}
                     label="نظر"
                     type="textarea"
                  />
                  <div className="mb-6">
                     <p className={`textSmm font-normal text-text3 mb-2 w-full`}>امتیاز</p>
                     <Rating
                        SVGclassName="inline w-6 h-6"
                        transition
                        iconsCount={5}
                        onClick={(e: number) => rateSet(e)}
                        initialValue={rate}
                     />
                  </div>
               </div>

               <div className="flex w-fit mr-auto">
                  <CustomButton
                     className="!w-fit px-4 ml-2"
                     variant="outline"
                     type="button"
                     onClick={clearFunction}
                  >
                     انصراف
                  </CustomButton>
                  <CustomButton
                     className="!w-fit px-4"
                     variant="primary"
                     type="button"
                     onClick={addCommentApiCall}
                  >
                     ثبت
                  </CustomButton>
               </div>
            </div>
         </Modal>

         <div className="flex items-start justify-between">
            <div>
               <h4 className="textMd text-text1 mb-2">دیدگاه کاربران</h4>
               <h4 className="textSmm text-text3 mb-6">{data?.commentCount} دیدگاه</h4>
            </div>
            <CustomButton
               className="!w-fit px-4"
               variant="outline"
               onClick={() => {
                  if (userData) {
                     addCommentModalSet(true);
                  } else {
                     toast.error(NEED_LOGIN);
                  }
               }}
            >
               افزودن نظر
            </CustomButton>
         </div>
         {commentsArray &&
            commentsArray?.[0] &&
            commentsArray?.map((item: any, index: number) => {
               return <Comment refetch={commentsRefetch} key={index} data={item} />;
            })}
      </>
   );
};

const FrequentlyQuestions = ({ data }: { data: any }) => {
   const [isOpen, isOpenSet] = useState<number | null>(null);

   return (
      <>
         {data &&
            data?.[0] &&
            data?.map((item: any, index: number) => {
               return (
                  <div
                     key={index}
                     className="p-4 w-full border border-gray-300 rounded-lg mb-4 last:mb-0"
                  >
                     <div
                        className="flex items-center justify-between w-full cursor-pointer"
                        onClick={() => {
                           if (index !== isOpen) {
                              isOpenSet(index);
                           } else {
                              isOpenSet(null);
                           }
                        }}
                     >
                        <div className="flex items-center">
                           <div className="w-[10px] h-[10px] rounded-full ml-4 bg-[#6BAAEB]" />
                           <h3 className="lg:textMd text-text1">{item?.title}</h3>
                        </div>
                        <i
                           className={`fa fa-regular fa-chevron-down transition-all ${
                              isOpen == index ? "rotate-180" : ""
                           }`}
                        />
                     </div>
                     <Collapse
                        className={`${isOpen == index ? "mt-6" : ""}`}
                        transition="all 0.2s"
                        isOpen={isOpen == index}
                     >
                        <p className="textSmm text-text3">{item?.description}</p>
                     </Collapse>
                  </div>
               );
            })}
      </>
   );
};

const CommentSection = ({
   id,
   data,
   commentsArray,
   commentsRefetch,
}: {
   id: number;
   data: any;
   commentsArray: any;
   commentsRefetch: any;
}) => {
   switch (id) {
      case 0:
         return <div dangerouslySetInnerHTML={{ __html: data?.description }} />;

      case 1:
         return <div dangerouslySetInnerHTML={{ __html: data?.Validity }} />;

      case 2:
         return (
            <Comments
               id={data?.id}
               data={data}
               commentsArray={commentsArray}
               commentsRefetch={commentsRefetch}
            />
         );

      case 3:
         return <FrequentlyQuestions data={JSON.parse(data?.frequentlyQuestions)} />;

      default:
         return null;
   }
};

export default CommentSection;
