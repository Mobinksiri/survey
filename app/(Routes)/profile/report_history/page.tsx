/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import Modal from '@/app/_components/common/modal/Modal';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MAXIMUM_POSTS_PER_PAGE = 6;

const ReportItem = ({
  item,
  selectedDetailSet,
}: {
  item: any;
  refetch: any;
  selectedDetailSet: any;
}) => {
  if (item?.markType == 6) {
    return (
      <div className="bg-PostCardBg rounded-lg lg:rounded-3xl lg:shadow-articlePost border lg:border-none border-gray-200 p-4">
        <p className="textMd text-text1 mb-4 pb-4 border-b border-b-gray-200">تالار گفت و گو</p>
        <p className="textMd text-text1 mb-2">کامنت در تاپیک: </p>
        <h6 className="textMd text-text1 mb-4">{item?.post?.forumDetail?.title}</h6>
        <CustomButton onClick={() => selectedDetailSet(item)} variant="outline">
          مشاهده جزئیات
        </CustomButton>
      </div>
    );
  }
  return (
    <div className="bg-PostCardBg rounded-lg lg:rounded-3xl lg:shadow-articlePost border lg:border-none border-gray-200 p-4">
      <div className="relative w-full h-[200px] mb-4">
        <Image
          className="rounded-2xl object-cover"
          src={item?.post?.image}
          alt={item?.name ?? ''}
          fill
        />
      </div>
      <h6 className="textMd text-text1 mb-4">{item?.post?.name}</h6>
      <CustomButton onClick={() => selectedDetailSet(item)} variant="outline">
        مشاهده جزئیات
      </CustomButton>
    </div>
  );
};

const Page = () => {
  const { data: reportsData, refetch: reportsDataRefetch } = useApiCall<any>({
    url: '/api/reports',
  });
  const [searchedValue, searchedValueSet] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [reports, reportsSet] = useState([]);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  useEffect(() => {
    if (reportsData) {
      reportsSet(reportsData);
    }
  }, [reportsData]);

  useEffectSkipFirstRender(() => {
    if (reportsData && reportsData?.[0]) {
      const cloneReports: any = [...reportsData];
      reportsSet(
        cloneReports?.filter((post: any) => {
          const lowercasedSearch = searchedValue?.toLowerCase();
          return (
            post?.post?.name.toLowerCase().includes(lowercasedSearch) ||
            post?.post?.description.toLowerCase().includes(lowercasedSearch)
          );
        }),
      );
      setActivePage(1);
    }
    if (!searchedValue) {
      reportsSet(reportsData);
    }
  }, [searchedValue]);

  const deleteReport = () => {
    return apiCall({
      url: `/api/deleteReport/${selectedDetail?.id}`,
      method: 'delete',
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.message) {
          toast.success(res?.message);
          reportsDataRefetch();
          selectedDetailSet(null);
        }
      },
    });
  };

  const deletePost = () => {
    if (selectedDetail?.markType == 6) {
      return apiCall({
        url: `/api/deleteforumComment/${selectedDetail?.post?.id}`,
        method: 'delete',
        callback: (res, er) => {
          // if (res?.error) {
          //   toast.error(res?.error);
          // }
          // if (res?.message) {
          //   toast.success(res?.message);
          //   reportsDataRefetch();
          //   selectedDetailSet(null);
          // }
        },
      });
    }
    if (selectedDetail?.markType == 3) {
      return apiCall({
        url: `/api/famousPeople/${selectedDetail?.post?.id}`,
        method: 'delete',
        callback: (res, er) => {
          if (res?.error) {
            toast.error(res?.error);
          }
          if (res?.message) {
            toast.success(res?.message);
            reportsDataRefetch();
            selectedDetailSet(null);
          }
        },
      });
    }
  };

  const [selectedDetail, selectedDetailSet] = useState<any>(null);

  return (
    <div>
      {/* detail modal */}
      <Modal isOpen={!!selectedDetail} onClick={() => selectedDetailSet(null)}>
        <div className="relative p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[560px] rounded-2xl">
          <div
            className="items-end mr-auto w-fit flex justify-end absolute top-5 left-4 p-2 cursor-pointer"
            onClick={() => {
              selectedDetailSet(null);
            }}
          >
            <i className="fa fa-regular fa-close text-[20px]" />
          </div>
          <div className="w-full flex items-center justify-between mb-6 pb-6 border-b border-b-gray2">
            <h4 className="textMd text-text1">
              {selectedDetail?.markType == 6
                ? `تاپیک: ${selectedDetail?.post?.forumDetail?.title}`
                : selectedDetail?.post?.name}
            </h4>
            <h4 className="textSm font-bold text-text1 px-2 py-1 rounded-lg bg-gray-200 border border-gray-300 ml-8">
              {selectedDetail?.markType == 3 ? 'فرد مشهور' : null}
              {selectedDetail?.markType == 5 ? 'شخصیت تخیلی' : null}
              {selectedDetail?.markType == 6 ? 'تالار گفت و گو' : null}
            </h4>
          </div>

          <p className="textSmm mb-6 pb-6 border-b border-b-gray2 text-text3">
            {selectedDetail?.markType == 6 ? (
              <div className="flex items-center justify-between">
                <p className="textMd text-text1 mb-2">کامنت:</p>
                <p className="textMd text-text1 mb-2">کاربر: {selectedDetail?.post?.name}</p>
              </div>
            ) : null}
            {selectedDetail?.post?.description
              ? stripHtmlTags(selectedDetail?.post?.description)
              : null}
          </p>

          <p className="textSm font-bold text-text3">گزارش: {selectedDetail?.errCode}</p>

          <div className="flex w-fit mr-auto mt-6">
            <CustomButton
              className="!w-fit px-4 ml-2"
              variant="outline"
              type="button"
              onClick={deletePost}
            >
              حذف پست
            </CustomButton>
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              onClick={deleteReport}
            >
              نادیده گرفتن گزارش
            </CustomButton>
          </div>
        </div>
      </Modal>

      <div className="bg-white lg:shadow-sidebar rounded-3xl lg:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <h4 className="textXl text-text1 mb-4 lg:mb-0">پیگیری گزارشات</h4>
          <div className="w-full lg:w-[300px]">
            <CustomInput
              parentClassName="relative"
              inputClassName="pr-10"
              placeholder="جستجو کنید..."
              icon={
                <i className="absolute text-text3 top-1/2 right-4 -translate-y-1/2 fa fa-regular fa-search" />
              }
              state={searchedValue}
              setState={searchedValueSet}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {reports && reports?.[0] ? (
            reports?.slice(startIndex, endIndex)?.map((item: any, index: number) => {
              return (
                <ReportItem
                  selectedDetailSet={selectedDetailSet}
                  refetch={reportsDataRefetch}
                  item={item}
                  key={index}
                />
              );
            })
          ) : (
            <p className="textSm text-rose-500 font-bold">گزارشی پیدا نشد.</p>
          )}
        </div>
        {reports &&
        typeof reports !== 'string' &&
        reports?.length &&
        reports?.length > MAXIMUM_POSTS_PER_PAGE ? (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={reports?.length}
            className="mt-10"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
