/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import ImageGalleryModal from '@/app/(Routes)/(profile)/panel/journal/ImageGalleryModal';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const JournalEditPost = () => {
  const { data: galleryList, refetch: galleryListRefetch } = useApiCall<any>({
    url: `/api/banner/1`,
  });

  const updatedGalleryArray = Array.from({ length: 5 }, (_, index) => galleryList?.[index] || {});
  const fillColumnGaps = (arr: any) => {
    const filledArr = Array.from({ length: 5 }, (_, index) => {
      const item = arr.find((el: any) => el.column === index);
      return item || {};
    });

    return filledArr;
  };

  const sortedGalleryArray = fillColumnGaps(updatedGalleryArray);

  const [deleteModal, deleteModalSet] = useState(null);
  const deleteImageFunction = () => {
    return apiCall({
      url: `/api/banner/${deleteModal}`,
      method: 'delete',
      callback: (res, er) => {
        if (res && res?.message) {
          toast?.success(res?.message ?? '');
          galleryListRefetch();
          deleteModalSet(null);
        }
        if (er) toast?.error('خطا در برقراری ارتباط.');
      },
    });
  };

  const getSize = (index: number) => {
    switch (index) {
      case 1:
        return '284 * 592';
      case 2:
        return '284 * 288';
      case 3:
        return '584 * 288';
      case 4:
        return '284 * 288';
      case 5:
        return '284 * 592';

      default:
        return null;
    }
  };

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'مجله' }, { title: 'گالری مجله', icon: 'image' }]} />

      <Modal isOpen={!!deleteModal} onClick={() => deleteModalSet(null)}>
        <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[460px] rounded-2xl">
          <h4 className="textMd text-text1 mb-3 pb-3">آیا مایل به حذف عکس مورد نظر هستید؟</h4>

          <div className="flex w-fit mr-auto">
            <CustomButton
              className="!w-fit px-4 ml-2"
              variant="outline"
              type="button"
              onClick={() => deleteModalSet(null)}
            >
              انصراف
            </CustomButton>
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              onClick={deleteImageFunction}
            >
              حذف
            </CustomButton>
          </div>
        </div>
      </Modal>
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="grid grid-cols-1 lg:grid-rows-[repeat(2,minmax(0,200px))] lg:grid-cols-4 gap-4 lg:gap-4">
          {sortedGalleryArray.map((img, index) => {
            const [openImageModal, openImageModalSet] = useState(false);

            const isDoubleWidth = index === 0 || index === 4;
            const isDoubleHeight = index === 2;

            return (
              <div
                key={index}
                className={`h-[200px] lg:h-full relative ${
                  isDoubleWidth ? 'lg:col-span-2 col-span-1' : ''
                } ${isDoubleHeight ? 'row-span-2' : ''}`}
              >
                <ImageGalleryModal
                  isOpen={openImageModal}
                  isOpenSet={openImageModalSet}
                  order={index}
                  img={img}
                  refetch={galleryListRefetch}
                />

                {!img?.imageUrl ? (
                  <div
                    onClick={() => {
                      openImageModalSet(true);
                    }}
                    className="bg-gray-200 border border-gray-300 w-full h-full rounded-lg flex items-center justify-center relative cursor-pointer"
                  >
                    <p className="textSmm font-bold text-text1 bg-white rounded-md px-2 py-1">
                      افزودن
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-200 border border-gray-300 w-full h-full rounded-lg flex items-center justify-center relative cursor-pointer overflow-hidden">
                    <i
                      onClick={() => deleteModalSet(img?.id)}
                      className="fa fa-regular fa-trash text-red bg-white px-2 py-1 absolute top-2 left-2 rounded-md cursor-pointer z-[1]"
                    />
                    <p
                      onClick={() => {
                        openImageModalSet(true);
                      }}
                      className="textSmm font-bold text-text1 bg-white rounded-md px-2 py-1 z-[1]"
                    >
                      ویرایش
                    </p>
                    <Image
                      onClick={() => {
                        openImageModalSet(true);
                      }}
                      fill
                      src={img?.imageUrl}
                      className="object-cover"
                      alt={img?.image}
                    />
                  </div>
                )}
                <div className="bg-white px-1 py-[0.5px] absolute top-2 right-2 rounded-sm textSmm text-text1">
                  سایز {getSize(index + 1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JournalEditPost;
