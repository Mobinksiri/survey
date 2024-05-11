/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useApiCall } from "@/app/_apiCall/apiCall";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import { useParams } from "next/navigation";
import React from "react";
import { quizTypes } from "../../azmoon/[singleTest]/page";

const Question = (props: any) => {
  const { title, type: propType, choicesInQuestion } = props;

  const type = quizTypes?.find((item) => item?.type === propType);

  return (
    <div className="px-4 py-3 border-[3px] border-gray-200 mb-4 last:mb-0 rounded-md">
      <div className="flex items-center justify-between w-full mb-4 pb-4 border-b-[3px] border-b-gray-200">
        <p className="textSm font-bold text-text1">{title}</p>
        <p
          style={{ backgroundColor: type?.color }}
          className={`textSmm font-bold text-text1 px-2 py-1 rounded-md mr-4`}
        >
          {type?.label}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-7 border border-gray-400 rounded-sm">
          <div className="grid grid-cols-3">
            <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
              ردیف (گزینه)
            </div>
            <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
              سوال
            </div>
            <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
              تعداد ثبت شده
            </div>
          </div>
          {choicesInQuestion?.map((item: any, index: number) => (
            <div className="grid grid-cols-3">
              <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
                {index + 1}
              </div>
              <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
                {item?.choiceTitle}
              </div>
              <div className="textSmm font-bold text-text1 p-2 col-span-1 border border-gray-400 text-center">
                {item?.count} نفر
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JournalAddArthurSlide = () => {
  const { id } = useParams();

  const { data } = useApiCall<any>({
    baseUrl: baseUrls?.poll,
    method: "post",
    data: { id },
    url: "/answer/getPollResult",
    shouldCallApi: !!id,
  });

  const pollDetail = data?.data?.pollDetail;
  const questionList = data?.data?.questionsInPoll;

  return (
    <div className="rounded-md shadow-default p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <p className="textMd font-bold text-text1 mb6">
          آزمون '{pollDetail?.title}'
        </p>
      </div>

      {questionList && questionList?.length ? (
        questionList?.map((item: any, index: number) => (
          <Question key={index} {...item} />
        ))
      ) : (
        <p className="textSmm text-text1">آزمونی یافت نشد.</p>
      )}
    </div>
  );
};

export default JournalAddArthurSlide;
