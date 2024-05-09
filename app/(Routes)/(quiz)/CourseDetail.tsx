"use client";
import { useApiCall } from "@/app/_apiCall/apiCall";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import CustomInput from "@/app/_components/common/custom/CustomInput";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import Modal from "@/app/_components/common/modal/Modal";
import { setTest } from "@/app/store/test";
import moment from "moment-jalaali";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import FreeImage from "@/app/_assets/other/quiz/free.svg";
import ProImage from "@/app/_assets/other/quiz/premium.svg";
import { getUser } from "@/app/store/user";
import { setIsOpenLogin } from "@/app/store/login";

const TABBAR_LIST = [
   {
      id: 0,
      title: "تفسیر رایگان",
      image: ProImage,
   },
   {
      id: 1,
      disable: true,
      title: "تفسیر پیشرفته و کامل",
      image: FreeImage,
   },
];

const CourseDetail = ({ data, height }: any) => {
   const { userData } = useSelector(getUser);
   const router = useRouter();
   const dispatch = useDispatch();

   const id = useParams();

   const { data: questions } = useApiCall<any>({
      url: `/api/questions/${id.singelQuiz}`,
   });

   const poll = data?.poll;

   const [modal, modalSet] = useState(false);
   const [activeId, setActiveId] = useState(0);
   const [birthday, birthdaySet] = useState(null);
   const [gender, genderSet] = useState<any>(null);

   const [error, errorSet] = useState<string | null>(null);

   const startPoll = () => {
      const diff = moment(moment().format("jYYYY")).diff(birthday, "year");
      if (!gender?.value) {
         errorSet("لطفا جنسیت را وارد کنید.");
         return;
      } else if (!birthday) {
         errorSet("لطفا تاریخ تولدتان را وارد کنید.");
         return;
      } else if (diff < poll?.fromAge) {
         errorSet(`این آزمون برای محدوده سنی ${poll?.fromAge} سال به بالا مناسب میباشد.`);
         return;
      } else {
         errorSet(null);
         if (questions?.length) {
            router.push(`/quiz/${poll?.id}/${poll?.id}`);
            dispatch(setTest({ type: "ACCESS", data: true }));
         } else {
            toast?.error("هیچ سوالی به آزمون اضافه نشده است.");
         }
      }
   };

   const openLoginModal = () => {
      dispatch(setIsOpenLogin(true));
   };

   return (
      <>
         <Modal enableScrollProp isOpen={modal} onClick={() => null}>
            <div className="relative bg-white shadow-default w-[calc(100vw-32px)] md:w-[calc(100vw-50px)] lg:w-[600px] lg:max-w-[90%] lg:mx-auto h-fit p-4 lg:p-6 rounded-xl">
               <div
                  className="items-end mr-auto w-fit flex justify-end absolute top-4 left-4 p-2 cursor-pointer"
                  onClick={() => {
                     modalSet(false);
                  }}
               >
                  <i className="fa fa-regular fa-close text-[20px]" />
               </div>
               <h3 className="textMd text-text1 border-b border-b-gray1 mb-4 pb-4">
                  {poll?.title}
               </h3>
               <p className="textSm font-bold text-center text-text1 mb-4">
                  لطفا جهت شروع یکی از موارد زیر را انتخاب کنید.
               </p>
               <div className="w-full mb-6">
                  <div className="flex w-full md:flex-row justify-between gap-2 lg:gap-4 items-center text-center mb-4">
                     {TABBAR_LIST.map((e, i) => {
                        return (
                           <div
                              key={i}
                              className="w-1/2 flex flex-col p-2 border border-gray-200 rounded-xl"
                           >
                              <Image src={e?.image} alt="" className="rounded-xl mb-2" />
                              <span
                                 onClick={() => {
                                    if (!e?.disable) {
                                       setActiveId(i);
                                    }
                                 }}
                                 className={`relative text-[12px] lg:text-[16px] p-2 w-full rounded-lg ${
                                    activeId === e.id
                                       ? "bg-[#6BAAEB] text-white"
                                       : "bg-transparent text-[#858687]"
                                 } ${e?.disable ? "cursor-not-allowed" : "cursor-pointer"}`}
                              >
                                 {e.title}
                              </span>
                           </div>
                        );
                     })}
                  </div>
                  {error && (
                     <div className="textSm font-normal text-[#842029] bg- px-4 py-3 rounded-lg bg-[#F8D7DA] mb-4 flex items-center justify-between w-full">
                        <p>{error}</p>
                        <i
                           className="fa fa-solid fa-close cursor-pointer"
                           onClick={() => errorSet(null)}
                        />
                     </div>
                  )}
                  {data?.isPollTaked && (
                     <div className="textSm font-normal text-[#828420] bg- px-4 py-3 rounded-lg bg-[#f8f3d7] mb-4 flex items-center justify-between w-full">
                        <p>شما قبلا در این آزمون شرکت کرده اید.</p>
                        {/* <i className="fa fa-solid fa-close cursor-pointer" onClick={() => errorSet(null)} /> */}
                     </div>
                  )}
                  <CustomInput
                     parentClassName="mb-4"
                     label="سال تولد"
                     state={birthday}
                     type="date"
                     setState={birthdaySet}
                     onlyYearPicker
                  />
                  <div>
                     <p className={`textSmm font-normal text-text3 mb-2 w-full`}>جنسیت</p>
                     <CustomSelect
                        options={[
                           { label: "مرد", value: 1 },
                           { label: "زن", value: 2 },
                        ]}
                        value={gender}
                        onChange={genderSet}
                     />
                  </div>
               </div>
               <CustomButton onClick={startPoll} className="!px-4 mr-auto" variant="primary">
                  {data?.isPollTaked ? "شروع مجدد آزمون رایگان" : "شروع آزمون رایگان"}
               </CustomButton>
            </div>
         </Modal>

         <div
            className={`hidden lg:flex h-fit p-8 shadow-default rounded-2xl bg-white justify-center sticky top-[100px]`}
         >
            <div className="flex w-full  flex-col justify-evenly items-center ">
               <p className="text3xl text-text1 mb-8">رایگان</p>
               <div
                  onClick={() => {
                     if (userData) {
                        modalSet(true);
                     } else {
                        openLoginModal();
                     }
                  }}
                  className="cursor-pointer custom-animation bg-[#00DF86] py-3 px-6 rounded-md text-md text-white"
               >
                  شروع آزمون
               </div>
            </div>
         </div>
         <div className="lg:hidden block fixed bottom-0 w-full h-fit z-10 px-4 right-0 py-4 bg-white border border-t border-gray-200">
            <CustomButton
               variant="primary"
               onClick={() => {
                  if (userData) {
                     modalSet(true);
                  } else {
                     openLoginModal();
                  }
               }}
            >
               شروع آزمون
            </CustomButton>
         </div>
      </>
   );
};

export default CourseDetail;
