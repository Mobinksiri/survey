"use client";

import { useApiCall } from "@/app/_apiCall/apiCall";
import PostsFlex from "@/app/_components/common/PostsFlex";
import SectionTitle from "@/app/_components/common/SectionTitle";
import React, { useEffect, useState } from "react";
import { iconList } from "../(profile)/panel/azmoon/QuizPanel";
import CustomPagination from "@/app/_components/common/custom/CustomPagination";
import { useEffectSkipFirstRender } from "@/app/_hooks/useEffectSkipFirstRender";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import { stripHtmlTags } from "./MainContent";

const MAXIMUM_POSTS_PER_PAGE = 12;

const QuizPage = () => {
   const { data: pollList, refetch } = useApiCall<any>({
      baseUrl: baseUrls?.poll,
      method: "post",
      url: "/poll/getAllPolls",
   });

   const [activePage, setActivePage] = useState(1);

   const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
   const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;
   const [searchedValue, searchedValueSet] = useState("");
   const [coursePostsArray, coursePostsArraySet] = useState<any>([]);

   const convertFunction = (array: any) => {
      return (
         array?.[0] &&
         array?.map((item: any) => ({
            quiz: true,
            isLiked: item?.isLiked,
            postIcon: iconList?.find((i) => i?.id === item?.imageId)?.icon,
            badgeList: [
               <p key={1} className="textXs text-text1 font-normal rounded-lg bg-[#fff] px-2 py-1">
                  رایگان
               </p>,
            ],
            title: {
               value: item?.title,
               className: "textMd text-text1 line-clamp-1 mb-2",
            },
            description: {
               value: stripHtmlTags(item?.description),
               className: "textSm text-text3 line-clamp-4 mb-8",
            },
            tags: [
               {
                  icon: item?.isLiked ? " fa-solid fa-heart" : "heart",
                  title: item?.LikeCount ?? 0,
                  like: true,
               },
               {
                  icon: "clock",
                  title: `${item?.timeToAnswer} دقیقه`,
               },
               {
                  icon: "user",
                  title: item?.fromAge + " سال",
               },
            ],
            id: item?.id,
         }))
      );
   };

   useEffectSkipFirstRender(() => {
      if (searchedValue) {
         const trimmedSearchedValue = searchedValue?.trim() as string;
         if (trimmedSearchedValue) {
            const pollListClone = [...pollList?.data];

            const foundedItems = pollListClone?.filter((item: any) =>
               item?.title?.trim().includes(trimmedSearchedValue?.trim())
            );
            coursePostsArraySet(convertFunction(foundedItems));
         }
      } else {
         coursePostsArraySet(convertFunction(pollList?.data));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchedValue]);

   useEffect(() => {
      if (pollList) {
         coursePostsArraySet(convertFunction(pollList?.data));
      }
   }, [pollList]);

   return (
      <div className="custom-container">
         <SectionTitle title="لیست آزمون ها" className="mb-6" />
         <PostsFlex
            array={coursePostsArray?.slice(startIndex, endIndex)}
            title="آزمونی"
            className="mb-[70px]"
            onClick={refetch}
         />
         {coursePostsArray &&
            coursePostsArray?.length &&
            coursePostsArray?.length > MAXIMUM_POSTS_PER_PAGE && (
               <CustomPagination
                  activePage={activePage}
                  activePageSet={setActivePage}
                  itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
                  totalItemsCount={coursePostsArray?.length}
               />
            )}
      </div>
   );
};

export default QuizPage;
