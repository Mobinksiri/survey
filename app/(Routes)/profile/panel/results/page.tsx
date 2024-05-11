"use client";

import SearchBox from "@/app/(Routes)/(quiz)/search/SearchBox";
import { useApiCall } from "@/app/_apiCall/apiCall";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import CustomPagination from "@/app/_components/common/custom/CustomPagination";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Item = (props: any) => {
  const { title, id } = props;

  return (
    <div className="flex items-center justify-between px-4 py-3 border border-gray-200 mb-4 last:mb-0 rounded-md">
      <p className="textSm font-bold text-text1">{title}</p>
      <Link href={`/profile/panel/results/${id}`}>
        <CustomButton variant="outline" className="!w-fit">
          مشاهده جزئیات
        </CustomButton>
      </Link>
    </div>
  );
};

const MAXIMUM_POSTS_PER_PAGE = 10;

const JournalAddArthurSlide = () => {
  const [searchedValue, searchedValueSet] = useState("");
  const [coursePostsArray, coursePostsArraySet] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);

  const { data: pollList } = useApiCall<any>({
    baseUrl: baseUrls?.poll,
    method: "post",
    url: "/poll/getAllPolls",
  });

  useEffect(() => {
    if (pollList) {
      if (searchedValue) {
        const trimmedSearchedValue = searchedValue?.trim() as string;
        if (trimmedSearchedValue) {
          const pollListClone = [...pollList?.data];

          const foundedItems = pollListClone?.filter((item: any) =>
            item?.title
              ?.trim()
              ?.toLowerCase()
              .includes(trimmedSearchedValue?.trim()?.toLowerCase())
          );
          coursePostsArraySet(foundedItems);
        }
      } else {
        coursePostsArraySet(pollList?.data);
      }
    }
  }, [searchedValue, pollList]);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  return (
    <div className="rounded-md shadow-default p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <p className="textMd font-bold text-text1 mb6">لیست آزمون ها</p>
        <div className="w-full lg:w-1/5 my-5 lg:my-0">
          <SearchBox
            searchedValue={searchedValue}
            searchedValueSet={searchedValueSet}
          />
        </div>
      </div>
      {coursePostsArray && coursePostsArray?.length ? (
        coursePostsArray
          ?.slice(startIndex, endIndex)
          ?.map((item: any, index: number) => <Item key={index} {...item} />)
      ) : (
        <p className="textSmm text-text1">آزمونی یافت نشد.</p>
      )}
      {coursePostsArray &&
      coursePostsArray?.length &&
      coursePostsArray?.length > MAXIMUM_POSTS_PER_PAGE ? (
        <CustomPagination
          activePage={activePage}
          activePageSet={setActivePage}
          itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
          totalItemsCount={coursePostsArray?.length}
        />
      ) : null}
    </div>
  );
};

export default JournalAddArthurSlide;
