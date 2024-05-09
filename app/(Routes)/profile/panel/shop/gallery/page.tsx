/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import Modal from '@/app/_components/common/modal/Modal';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddModal = ({
  isOpen,
  isOpenSet,
  refetch,
}: {
  isOpen: any;
  isOpenSet: any;
  refetch: any;
}) => {
  const [image, imageSet] = useState<File | null>(null);
  const [result, resultSet] = useState<File | string>('');
  const [url, urlSet] = useState<string>('');

  const clearFunction = () => {
    imageSet(null);
    resultSet('');
    isOpenSet(false);
    urlSet('');
  };

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      imageSet(selectedImage);
    }
  };

  function isValidUrl(str: string) {
    const pattern = new RegExp(
      '^(https?|ftp):\\/\\/' + '(www\\.)?' + '([a-zA-Z0-9.-]+)' + '(:\\d+)?' + '(/\\S*)?$',
      'i',
    );
    return pattern.test(str);
  }

  const imageApiCallFunction = () => {
    if (!isValidUrl(url)) {
      toast.error('فرمت لینک نادرست است.');
      return;
    }

    const formData = new FormData();
    formData.append('file', result);
    // @ts-ignore
    formData.append('type', 5);
    // @ts-ignore
    formData.append('column', 0);
    // @ts-ignore
    formData.append('postId', null);
    // @ts-ignore
    formData.append('postCategoryId', null);
    // @ts-ignore
    formData.append('url', url);

    return apiCall({
      url: '/api/banner',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res && res?.msg) {
          toast?.success(res?.msg ?? '');
          clearFunction();
          refetch();
        }
        if (er) toast?.error('خطا در برقراری ارتباط.');
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClick={clearFunction}>
      <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[760px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">افزودن مشخصات عکس</h4>
        {!image && (typeof result === 'string' || !result) ? (
          <div className="relative w-full h-12 rounded-lg flex mb-8 items-center justify-center bg-gray-200">
            <input
              onChange={imageChangeFunction}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="opacity-0 w-full h-full absolute top-0 left-0"
            />
            <i className="fa fa-solid fa-plus text-text1 ml-2" />
            <p className="textSmm text-text1">افزودن عکس</p>
          </div>
        ) : (
          <></>
        )}
        {result && typeof result !== 'string' && (
          <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-6">
            <i
              onClick={() => {
                resultSet('');
                imageSet(null);
              }}
              className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
            />
            <Image
              width={100}
              height={100}
              className="max-w-[200px] max-h-[200px]"
              src={URL.createObjectURL(result)}
              alt=""
            />
          </div>
        )}

        {!result && (
          <ImageEditor
            className={`${image ? '!h-[400px] pb-8' : '!h-0 pb-0'}`}
            image={image}
            imageSet={imageSet}
            resultSet={resultSet}
          />
        )}
        <div className="mb-6">
          <CustomInput label="لینک" state={url} setState={urlSet} />
        </div>

        <div className="flex w-fit mr-auto">
          <CustomButton
            className="!w-fit px-4 ml-2"
            variant="outline"
            type="button"
            onClick={clearFunction}
          >
            انصراف
          </CustomButton>
          <CustomButton
            className="!w-fit px-4"
            variant="primary"
            type="button"
            onClick={imageApiCallFunction}
            disable={!url || !result}
          >
            ثبت
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const JournalAddArthurSlide = () => {
  const { data: galleryList, refetch: galleryListRefetch } = useApiCall<any>({
    url: `/api/banner/5`,
  });

  const [isOpen, isOpenSet] = useState(false);
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

  return (
    <div className="my-6">
      <AddModal isOpen={isOpen} isOpenSet={isOpenSet} refetch={galleryListRefetch} />
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
      <div className="flex items-center text-text3 mb-5">
        <i className="fa fa-regular fa-memo-circle-check ml-3 text-[18px]" />
        <Link href="/profile/panel">
          <p className="textMd">فروشگاه</p>
        </Link>
        <i className="fa fa-solid fa-angle-left mx-4 text-[15px]" />
        <p className="textMd">گالری</p>
      </div>
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <CustomButton onClick={() => isOpenSet(true)} variant="outline" className="!w-fit px-4">
          افزودن اسلاید
        </CustomButton>
        <div
          style={{ gridAutoRows: 'minmax(180px, auto)' }}
          className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-4 mb-4"
        >
          {galleryList &&
            galleryList?.[0] &&
            galleryList.map((img: any, index: any) => {
              return (
                <div key={index} className={`lg:h-full relative`}>
                  {img?.imageUrl && (
                    <div className="bg-gray-200 border border-gray-300 w-full h-full rounded-lg flex items-center justify-center relative cursor-pointer overflow-hidden first:mt-4">
                      <i
                        onClick={() => deleteModalSet(img?.id)}
                        className="fa fa-regular fa-trash text-red bg-white px-2 py-1 absolute top-2 left-2 rounded-md cursor-pointer z-[1]"
                      />
                      <Image fill src={img?.imageUrl} className="object-cover" alt={img?.image} />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default JournalAddArthurSlide;
