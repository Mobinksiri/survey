/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import StepBar from '@/app/_components/common/panel/StepBar';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MAXIMUM_POSTS_PER_PAGE = 6;

const UserComponent = ({ item, refetch }: { item: any; refetch: any }) => {
  const editComment = (status: 1 | 2) => {
    return apiCall({
      url: `/api/magazineComments/status/${item?.id}`,
      method: 'put',
      data: {
        status,
      },
      callback: (res, er) => {
        if (res) {
          refetch();
          toast?.success(res);
        }
      },
    });
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md mb-2 last:mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-1 w-full mb-2">
        {/* <div className="flex items-center mb-4">
          <p className="textSm text-text1 font-extrabold ml-2">مجله:</p>
          <p className="textSm text-text3 font-normal">{item?.name}</p>
        </div>
        <div className="flex items-center mb-4">
          <p className="textSm text-text1 font-extrabold ml-2">ایمیل کاربر:</p>
          <p className="textSm text-text3 font-normal">{item?.email}</p>
        </div> */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center mb-4">
            <p className="textSm text-text1 font-extrabold ml-2">نام کاربر:</p>
            <p className="textSm text-text3 font-normal">{item?.name} </p>
          </div>
          <div className="flex items-center mb-4">
            <p className={`textSm text-text1 font-normal ml-2`}>وضعیت:</p>
            <p
              className={`textSm font-extrabold ml-2 ${
                item?.status == 0
                  ? 'text-blue-800'
                  : item?.status == 1
                  ? 'text-green-700'
                  : item?.status == 2
                  ? 'text-red'
                  : null
              }`}
            >
              {item?.status == 0 ? 'در انتظار بررسی' : item?.status == 1 ? 'تایید شده' : 'حذف شده'}
            </p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <p className="textSm text-text1 font-extrabold ml-2">کامنت:</p>
          <p className="textSm text-text3 font-normal">{item?.description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center lg:justify-end gap-4">
        <CustomButton
          className="w-full lg:!w-[160px]"
          variant="primary"
          primaryButtonStyle="!bg-red"
          primaryButtonHoverStyle="!bg-rose-400"
          onClick={() => editComment(2)}
          disable={item?.status == 2}
        >
          حذف کامنت
        </CustomButton>
        <CustomButton
          className="w-full lg:!w-[160px]"
          variant="primary"
          onClick={() => editComment(1)}
          disable={item?.status == 1}
        >
          تایید کامنت
        </CustomButton>
      </div>
    </div>
  );
};

const Page = () => {
  const { data: comments, refetch: commentsRefetch } = useApiCall<any>({
    url: '/api/magazineComments',
  });
  const [searchedValue, searchedValueSet] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [searchedComments, searchedCommentsSet] = useState([]);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  useEffect(() => {
    if (comments) {
      searchedCommentsSet(comments);
    }
  }, [comments]);

  useEffectSkipFirstRender(() => {
    const cloneUsers: any = [...comments];
    searchedCommentsSet(
      cloneUsers?.filter((user: any) => {
        const lowercasedSearch = searchedValue?.toLowerCase();
        return (
          user.name.toLowerCase().includes(lowercasedSearch) ||
          user.description.toLowerCase().includes(lowercasedSearch) ||
          user.email.toLowerCase().includes(lowercasedSearch)
        );
      }),
    );
    setActivePage(1);
  }, [searchedValue]);

  return (
    <div>
      <StepBar array={[{ title: 'مجله' }, { title: 'مدیریت کامنت', icon: 'comment' }]} />
      <div className="bg-white lg:shadow-sidebar rounded-3xl lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <h4 className="textXl text-text1 mb-4 lg:mb-0">مدیریت کامنت</h4>
          <div className="w-full lg:w-[300px]">
            <CustomInput
              parentClassName="relative"
              inputClassName="pr-10"
              placeholder="کامنت را جستجو کنید..."
              icon={
                <i className="absolute text-text3 top-1/2 right-4 -translate-y-1/2 fa fa-regular fa-search" />
              }
              state={searchedValue}
              setState={searchedValueSet}
            />
          </div>
        </div>
        <div className="">
          {searchedComments && searchedComments?.[0] ? (
            searchedComments?.slice(startIndex, endIndex)?.map((item: any, index: number) => {
              return <UserComponent refetch={commentsRefetch} item={item} key={index} />;
            })
          ) : (
            <p className="textSm text-rose-500 font-bold">کامنتی پیدا نشد.</p>
          )}
        </div>
        {searchedComments &&
        typeof searchedComments !== 'string' &&
        searchedComments?.length &&
        searchedComments?.length > MAXIMUM_POSTS_PER_PAGE ? (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={searchedComments?.length}
            className="mt-10"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
