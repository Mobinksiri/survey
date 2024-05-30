"use client";
import apiCall, { useApiCall } from "@/app/_apiCall/apiCall";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import { getTest, setTest } from "@/app/store/test";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "./Question";
import toast from "react-hot-toast";
import Modal from "@/app/_components/common/modal/Modal";
import { baseUrls } from "@/app/_apiCall/baseUrls";

const Page = () => {
   const { test, singelQuiz } = useParams();

   const { indexOfTest, answers, access } = useSelector(getTest);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!access) {
         router?.push(`/${singelQuiz}`);
      }
   }, []);

   const [submitAnswersModal, submitAnswersModalSet] = useState(false);

   const router = useRouter();

   const { data } = useApiCall<any>({
      url: `/question/getAllQuestions`,
      baseUrl: baseUrls?.poll,
      data: { id: test },
      method: "post",
      shouldCallApi: !!test,
   });

   let responseData = data?.data?.questions;

   let question = responseData?.[indexOfTest - 1];

   const { data: choices, refetch: choicesRefetch } = useApiCall<any>({
      url: `/choice/getAllChoices`,
      baseUrl: baseUrls?.poll,
      data: { id: question?.id },
      method: "post",
      shouldCallApi: !!question?.id,
   });

   useEffect(() => {
      if (question?.type == 1 || question?.type === 2) {
         choicesRefetch();
      }
   }, [question?.id, indexOfTest]);

   const increaseStep = (select: boolean = false) => {
      if (indexOfTest < responseData?.length) {
         if (select) {
            dispatch(setTest({ type: "INC_STEP" }));
         } else {
            if (question?.require && !answers?.find((item) => item?.questionId === question?.id)) {
               toast.error("یکی از گزینه ها را باید انتخاب نمایید.");
            } else {
               dispatch(setTest({ type: "INC_STEP" }));
            }
         }
      }
   };
   const decreaseStep = () => {
      if (indexOfTest !== 1) {
         dispatch(setTest({ type: "DEC_STEP" }));
      }
   };

   console.log(answers);

   const handleSubmitPoll = () => {
      if (question?.require && !answers?.find((item) => item?.questionId === question?.id)) {
         toast.error("یکی از گزینه ها را باید انتخاب نمایید.");
      } else {
         return apiCall({
            baseUrl: baseUrls?.poll,
            url: "/answer/takePoll",
            method: "post",
            data: {
               answers: answers,
            },
            callback: (res, er) => {
               if (res) {
                  toast?.success(res?.message);
                  submitAnswersModalSet(true);
                  dispatch(
                     setTest({
                        type: "RESET",
                     })
                  );
               }
            },
         });
      }
   };

   return (
      <div className="navigation-padding custom-container h-full w-1/2 mx-auto">
         <Modal isOpen={submitAnswersModal} onClick={() => null}>
            <div className="relative bg-white shadow-comment w-[calc(100vw-32px)] lg:w-[350px] lg:h-[100px] lg:mx-auto h-fit p-6 rounded-xl">
               <div className="flex items-center justify-center w-full h-full">
                  <div className="w-7 h-7 ml-2 flex items-center justify-center rounded-md bg-green-500">
                     <i className="fa fa-solid fa-check text-white" />
                  </div>
                  <h3 className="textMd text-text1">آزمون با موفقیت ثبت شد.</h3>
               </div>
            </div>
         </Modal>

         <Question
            choices={choices?.data?.choices}
            increaseStep={increaseStep}
            decreaseStep={decreaseStep}
            data={question}
         />

         <div className="flex items-center w-fit gap-4 mr-auto">
            <CustomButton
               variant="outline"
               className="!w-fit px-4 !rounded-md"
               onClick={() => {
                  if (indexOfTest === 1) {
                     router.push(`/${singelQuiz}`);
                  } else {
                     decreaseStep();
                  }
               }}
            >
               <div className="flex items-center gap-2">
                  <i className="fa fa-solid fa-chevron-right text-[12px]" />
                  قبلی
               </div>
            </CustomButton>
            {indexOfTest === responseData?.length ? (
               <CustomButton
                  variant="primary"
                  className="!w-fit px-4 !rounded-md"
                  primaryButtonStyle="!bg-[#1BBC9C]"
                  primaryButtonHoverStyle="#2bad93BBC9C]"
                  onClick={handleSubmitPoll}
               >
                  اتمام آزمون
               </CustomButton>
            ) : (
               <CustomButton
                  variant="primary"
                  className="!w-fit px-4 !rounded-md"
                  onClick={() => increaseStep()}
               >
                  <div className="flex items-center gap-2">
                     بعدی
                     <i className="fa fa-solid fa-chevron-left text-[12px]" />
                  </div>
               </CustomButton>
            )}
         </div>
      </div>
   );
};

export default Page;
