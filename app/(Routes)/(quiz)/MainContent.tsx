"use client";

import Image from "next/image";
import React, { useState } from "react";
import Modal from "@/app/_components/common/modal/Modal";
import QuizIconBack from "@/app/_assets/other/quiz/icons/quizIconBack.svg";

// icons
import rubika from "../../_assets/other/quiz/socialMedia/rubika.svg";
import bale from "@/app/_assets/other/quiz/socialMedia/bale.svg";
import telegram from "@/app/_assets/other/quiz/socialMedia/telegram.svg";
import eta from "@/app/_assets/other/quiz/socialMedia/eta.svg";
import instagram from "@/app/_assets/other/quiz/socialMedia/instagram.svg";
import Link from "next/link";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import moment from "moment-jalaali";
import { useRouter } from "next/navigation";
import { setTest } from "@/app/store/test";
import toast from "react-hot-toast";
import { setIsOpenLogin } from "@/app/store/login";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "@/app/_components/common/custom/CustomInput";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import { getUser } from "@/app/store/user";
import { iconList } from "../(profile)/panel/azmoon/QuizPanel";
import { parse } from "parse5";
function getTextContent(node: any): string {
   if (node.childNodes) {
      return node.childNodes.map(getTextContent).join("");
   } else if (node.value) {
      return node.value;
   } else {
      return "";
   }
}

export const stripHtmlTags = (html: any) => {
   const documentFragment = parse(html);
   const textContent = getTextContent(documentFragment);
   return textContent;
};

const ShareLink = () => {
   return (
      <div className="flex md:justify-start justify-center">
         {[
            { image: rubika, href: "" },
            { image: eta, href: "" },
            { image: bale, href: "" },
            { image: telegram, href: "" },
            { image: instagram, href: "" },
         ].map((src, index) => (
            <a
               className="ml-3 last:ml-0 p-[2px] rounded-md flex items-center justify-center text-center"
               key={index}
               href={src.href}
               target="_blank"
            >
               <Image src={src.image} alt={`social-${index}`} className="p-1 " />
            </a>
         ))}
      </div>
   );
};

const MainQuizContent = ({ data }: { data: any; refetch: any }) => {
   const router = useRouter();
   const dispatch = useDispatch();

   let questionsList = data?.questions;
   let pollDetail = data?.pollDetail;

   const { userData } = useSelector(getUser);

   const [modal, modalSet] = useState(false);
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
      } else if (diff < pollDetail?.fromAge) {
         errorSet(`این آزمون برای محدوده سنی ${pollDetail?.fromAge} سال به بالا مناسب میباشد.`);
         return;
      } else {
         errorSet(null);
         if (questionsList?.length) {
            router.push(`/${pollDetail?.id}/${pollDetail?.id}`);
            dispatch(setTest({ type: "ACCESS", data: true }));
         } else {
            errorSet("هیچ سوالی به آزمون اضافه نشده است.");
            toast?.error("هیچ سوالی به آزمون اضافه نشده است.");
         }
      }
   };

   const openLoginModal = () => {
      dispatch(setIsOpenLogin(true));
   };

   return (
      <div className="h-fit w-full p-8 pb-6 shadow-default rounded-md bg-white md:relative">
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
                  {pollDetail?.title}
               </h3>
               <p className="textSm font-bold text-center text-text1 mb-4">
                  لطفا جهت شروع یکی از موارد زیر را انتخاب کنید.
               </p>
               <div className="w-full mb-6">
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

         <div className="flex h-full flex-col">
            <div className="flex h-full flex-col justify-between md:flex-row mb-8">
               <div className="relative object-cover h-[176px] w-[176px]">
                  <Image
                     alt="image"
                     src={iconList?.find((i) => i?.id === pollDetail?.imageId)?.icon ?? ""}
                     fill
                     className="z-[10]"
                  />
                  <Image src={QuizIconBack} alt="icon" className="absolute top-0 w-full h-full" />
               </div>
               <div className="flex flex-col mt-4 lg:mt-0 lg:w-[calc(100%-204px)]">
                  <p className="text-[18px] md:text-[22px] font-extrabold mb-2">
                     {pollDetail?.title}
                  </p>
                  <p className="mb-6 text-[#858687] text-[10px] md:text-[12px]">
                     دسته بندی :{" "}
                     <Link
                        href={`/quiz/category?sortBy=${data?.poll_category?.id}`}
                        className="text-[10px] md:text-[11px] text-text1 font-bold"
                     >
                        {data?.poll_category?.name}
                     </Link>
                  </p>
                  <p className="text-ellipsis justify-start text-[12px] font-normal text-[#555] md:text-[14px]">
                     {pollDetail?.about ? stripHtmlTags(pollDetail?.about) : null}
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row items-center w-full justify-between pt-4 border-t border-t-gray-300">
               <ShareLink />
               <div className="max-w-[200px] mr-8">
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
            </div>
         </div>
      </div>
   );
};

export default MainQuizContent;
