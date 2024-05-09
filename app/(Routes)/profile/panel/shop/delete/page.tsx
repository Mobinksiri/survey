'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import { DEFAULT_ERROR } from '@/app/_toast_messages';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteProduct = () => {
  const { data, refetch: itemRefesh } = useApiCall<any>({ url: '/api/products/list' });

  const removeProduct = (id: number) => {
    return apiCall({
      url: `/api/product/${id}`,
      method: 'delete',
      data: {},
      callback: (res, er) => {
        if (res) {
          toast?.success(res);
          itemRefesh();
        }
        if (er) {
          toast?.error(DEFAULT_ERROR);
        }
      },
    });
  };

  return (
    <>
      <div className="flex items-center text-text3 mb-5">
        <i className="fa fa-regular fa-memo-circle-check ml-3 text-[18px]" />
        <p className="textMd">فروشگاه</p>
        <i className="fa fa-solid fa-angle-left mx-4 text-[15px]" />
        <p className="textMd">حذف</p>
      </div>
      <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
        <p className="textLg text-text1 mb-6">حذف محصولات</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data &&
            data?.[0] &&
            data?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="border p-4 rounded-md mb-2 last:mb-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-[150px] mb-4">
                      <Image src={item?.imgsUrl} alt={item?.name} fill className="rounded-lg" />
                    </div>
                    <p className="textMd font-bold text-text1">{item?.name}</p>
                    <p className="textSm text-text3 line-clamp-3 mb-4">
                      {item?.explanation ? stripHtmlTags(item?.explanation) : null}
                    </p>
                  </div>
                  <CustomButton
                    variant="primary"
                    primaryButtonStyle="!bg-red"
                    className="!w-fit px-4 mr-auto"
                    onClick={() => removeProduct(item?.id)}
                  >
                    <span className="ml-2">حذف</span>
                    <i className="fa fa-regular fa-trash" />
                  </CustomButton>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
