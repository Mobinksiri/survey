"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { stripHtmlTags } from "@/app/_components/common/article/ArticlePost";
import { iconList } from "../(profile)/panel/azmoon/QuizPanel";
import Video from "next-video";
import Modal from "@/app/_components/common/modal/Modal";
import SoundPlayer from "@/app/_components/common/sound_player/SoundPlayer";
import Collapse from "@kunukn/react-collapse";
import QuizIconBack from "@/app/_assets/other/quiz/icons/quizIconBack.svg";
import counseling from "@/app/_assets/other/quiz/icons/4.svg";

// icons
import rubika from "../../_assets/other/quiz/socialMedia/rubika.svg";
import bale from "@/app/_assets/other/quiz/socialMedia/bale.svg";
import telegram from "@/app/_assets/other/quiz/socialMedia/telegram.svg";
import eta from "@/app/_assets/other/quiz/socialMedia/eta.svg";
import instagram from "@/app/_assets/other/quiz/socialMedia/instagram.svg";
import Link from "next/link";
import IconButton from "@/app/_components/common/iconsButton/iconButton";
import useSaveFunction from "@/app/_utils/useSaveFunction";
import useLikeFunction from "@/app/_utils/useLikeFunction";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import moment from "moment-jalaali";
import { useApiCall } from "@/app/_apiCall/apiCall";
import { useParams, useRouter } from "next/navigation";
import { setTest } from "@/app/store/test";
import toast from "react-hot-toast";
import { setIsOpenLogin } from "@/app/store/login";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "@/app/_components/common/custom/CustomInput";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import { getUser } from "@/app/store/user";

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

const MainQuizContent = ({ data, refetch }: { data: any; refetch: any }) => {
   const [videoModalIsOpen, videoModalIsOpenSet] = useState(false);
   const videoRef = useRef<HTMLVideoElement | null>(null);

   const id = useParams();
   const router = useRouter();
   const dispatch = useDispatch();

   const handleVideoClick = () => {
      videoModalIsOpenSet(true);
      if (videoRef.current) {
         videoRef.current.play();
      }
   };

   const handleVideoClose = () => {
      videoModalIsOpenSet(false);
      if (videoRef.current) {
         videoRef.current.pause();
      }
   };

   const poll = data?.poll;

   const [soundIsOpen, soundIsOpenSet] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);

   const handleSoundClick = () => {
      soundIsOpenSet((prev) => !prev);
   };

   const handlePlayPause = (isNowPlaying: boolean) => {
      setIsPlaying(isNowPlaying);
   };
   const { userData } = useSelector(getUser);

   const saveFunction = useSaveFunction(refetch);
   const likeFunction = useLikeFunction(refetch);

   const [modal, modalSet] = useState(false);
   const [birthday, birthdaySet] = useState(null);
   const [gender, genderSet] = useState<any>(null);

   const [error, errorSet] = useState<string | null>(null);

   const { data: questions } = useApiCall<any>({
      url: `/api/questions/${id.singelQuiz}`,
   });

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
      <div className="h-fit w-full p-8 pb-6 shadow-default rounded-2xl bg-white md:relative  ">
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

         <Modal isOpen={videoModalIsOpen} onClick={handleVideoClose}>
            <div className="bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[660px] h-fit rounded-lg">
               <div className="py-4 px-5 flex items-center justify-between">
                  <h3 className="textMd text-text1">ویدیو معرفی آزمون</h3>
                  <i
                     onClick={handleVideoClose}
                     className="fa fa-solid fa-close textMd cursor-pointer text-text1"
                  />
               </div>
               <Video
                  // className={!videoModalIsOpen ? '!pointer-events-none' : ''}
                  className="!pointer-events-none"
                  src={poll?.videourl}
                  autoPlay={videoModalIsOpen}
                  ref={videoRef}
               />
            </div>
         </Modal>

         <div className="flex h-full flex-col">
            {/* <div className="flex items-center absolute top-4 left-4">
               <IconButton
                  onClick={() => saveFunction({ id: poll?.id, markType: 4, isSaved: data?.isSave })}
                  parentClassName="ml-2 bg-gray2"
                  icon={data && data?.isSave ? " fa-solid fa-bookmark" : "bookmark"}
                  iconClassName="text-text3"
               />
               <IconButton
                  onClick={() =>
                     likeFunction({ id: poll?.id, markType: 4, isLiked: data?.isLiked })
                  }
                  parentClassName="ml-2 bg-gray2"
                  icon={data && data?.isLiked ? " fa-solid fa-heart" : "heart"}
                  iconClassName="text-text3"
               />
            </div> */}
            <div className="flex h-full flex-col justify-between md:flex-row mb-8">
               <div className="relative object-cover h-[176px] w-[176px]">
                  <Image
                     alt="image"
                     src={counseling}
                     // src={iconList?.find((i) => i?.id === poll?.imageId)?.icon ?? ''}
                     fill
                     className="z-[10]"
                  />
                  <Image src={QuizIconBack} alt="icon" className="absolute top-0 w-full h-full" />
               </div>
               <div className="flex flex-col mt-4 lg:mt-0 lg:w-[calc(100%-204px)]">
                  {/* title */}
                  <p className="text-[18px] md:text-[22px] font-extrabold mb-2">
                     {poll?.title ?? "تست احساس تنهایی (SLFS)"}
                  </p>
                  {/* type */}
                  <p className="mb-6 text-[#858687] text-[10px] md:text-[12px]">
                     دسته بندی :{" "}
                     <Link
                        href={`/quiz/category?sortBy=${data?.poll_category?.id}`}
                        className="text-[10px] md:text-[11px] text-text1 font-bold"
                     >
                        {data?.poll_category?.name ?? "تست احساس تنهایی (SLFS)"}
                     </Link>
                  </p>
                  {/* about */}
                  <p className="text-ellipsis justify-start text-[12px] font-normal text-[#555] md:text-[14px]">
                     {poll?.about
                        ? stripHtmlTags(poll?.about)
                        : "تست احساس تنهایی را می توانید هم اکنون بصورت کاملا رایگان  و با تفسیر جامع  انجام دهید.. با این تست می توانید درک بهتری از احساس خود داشته باشید"}
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row items-center w-full justify-between pt-4 border-t border-t-gray-300">
               <div className="flex w-full gap-2 justify-evenly md:justify-start md:w-fit h-full">
                  {poll?.voiceurl && (
                     <ButtonQuiz
                        icon="microphone"
                        onClick={handleSoundClick}
                        title="درباره تست بشنوید"
                     />
                  )}
                  {poll?.videourl && (
                     <ButtonQuiz icon="play" onClick={handleVideoClick} title="ویدیو معرفی آزمون" />
                  )}
               </div>
               <div className="flex items-center">
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
            <Collapse className={`w-full h-fit`} transition="all 0.4s" isOpen={soundIsOpen}>
               <SoundPlayer
                  url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with your audio URL
                  playing={isPlaying}
                  onPlayPause={handlePlayPause}
               />
            </Collapse>
         </div>
      </div>
   );
};

export default MainQuizContent;

const ButtonQuiz = ({
   onClick,
   title,
   icon,
}: {
   onClick: (e?: any) => void;
   title: string;
   icon: string;
}) => {
   return (
      <div
         onClick={onClick}
         className={`textSmm text-text1 flex cursor-pointer justify-evenly items-center border border-black rounded-full py-2 lg:px-3 w-1/2 lg:!w-fit`}
      >
         <i className={`fa fa-regular fa-${icon} ml-1 hidden lg:block`} />
         <span>{title}</span>
      </div>
   );
};
