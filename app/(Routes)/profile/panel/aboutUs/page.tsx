/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import { generateID } from '@/app/_utils/idGenerator';

import dynamic from 'next/dynamic';
import Image from 'next/image';
const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddModal = ({
  isOpen,
  isOpenSet,
  activityListSet,
}: {
  isOpen: any;
  isOpenSet: any;
  activityListSet: any;
}) => {
  const [image, imageSet] = useState<File | null>(null);
  const [result, resultSet] = useState<string>('');
  const [title, titleSet] = useState<string>('');
  const [date, dateSet] = useState<string>('');

  const clearFunction = () => {
    imageSet(null);
    resultSet('');
    isOpenSet(false);
    titleSet('');
    dateSet('');
  };

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      imageSet(selectedImage);
    }
  };

  const imageApiCallFunction = () => {
    if (!result || !title || !date) {
      toast?.error('لطفا همه موارد را وارد کنید.');
      return;
    }
    activityListSet((prev: any) => [
      ...prev,
      {
        image: result,
        title,
        date,
        id: generateID(10),
      },
    ]);
    clearFunction();
  };

  return (
    <Modal isOpen={isOpen} onClick={clearFunction}>
      <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[760px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">
          افزودن مشخصات فعالیت
        </h4>
        {!image && !result ? (
          <div className="mb-8">
            <div className="relative w-full h-12 rounded-lg flex items-center justify-center mb-1 bg-gray-200">
              <input
                onChange={imageChangeFunction}
                type="file"
                accept=".png, .jpg, .jpeg"
                className="opacity-0 w-full h-full absolute top-0 left-0"
              />
              <i className="fa fa-solid fa-plus text-text1 ml-2" />
              <p className="textSmm text-text1">افزودن عکس</p>
            </div>
            <p className="textSmm text-red">سایز 200 * 310</p>
          </div>
        ) : (
          <></>
        )}
        {result && (
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
              src={result}
              alt=""
            />
          </div>
        )}

        {!result && (
          <ImageEditor
            className={`${image ? '!h-[400px] pb-8' : '!h-0 pb-0'}`}
            image={image}
            imageSet={imageSet}
            createFile
            resultSet={resultSet}
          />
        )}

        <div className="flex items-center gap-4 my-6">
          <CustomInput label="عنوان" state={title} setState={titleSet} />
          <CustomInput label="تاریخ" state={date} setState={dateSet} />
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
            disable={!result || !date || !title}
          >
            افزودن
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const JournalAddArthurSlide = () => {
  const { data } = useApiCall<any>({
    url: '/api/getPage/aboutUs',
  });

  const [description, descriptionSet] = useState<any>(null);
  const [title, titleSet] = useState<any>(null);
  const [isOpen, isOpenSet] = useState(false);
  const [activityList, activityListSet] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const pageValue = JSON.parse(data?.page_value);
      descriptionSet(pageValue?.description);
      activityListSet(pageValue?.activityList);
      titleSet(pageValue?.title);
    }
  }, [data]);

  const handleAddPost = async () => {
    if (!description) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const data = {
      description,
      activityList,
      title,
    };

    apiCall({
      url: '/api/upsertPage',
      method: 'post',
      data: {
        page_name: 'aboutUs',
        page_value: JSON.stringify(data),
      },
      callback: (res, er) => {
        if (res && res?.message) {
          toast?.success(res?.message);
        }
      },
    });
  };

  const removeItemFunction = (id: any) => {
    activityListSet((prev: any) => prev?.filter((item: any) => item?.id !== id));
  };

  return (
    <div className="my-6">
      <AddModal isOpen={isOpen} isOpenSet={isOpenSet} activityListSet={activityListSet} />
      <StepBar array={[{ title: 'دیگر صفحات' }, { title: 'درباره ما' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="my-6">
          <div className="mb-6">
            <p className={`textSmm font-normal text-text3 mb-2 w-full`}>توضیحات درباره ما</p>
            <RichTextEditor setState={descriptionSet} defaultValue={description} />
          </div>
          <CustomInput
            label="عنوان فعالیت های ما"
            state={title}
            setState={titleSet}
            parentClassName="mb-6"
          />
          <div className="border border-gray-200 p-4 rounded-lg">
            <p className={`textSmm font-normal text-text3 mb-4 w-full`}>فعالیت های ما</p>
            <div className="">
              {activityList?.length
                ? activityList?.map((item: any, index: any) => {
                    return (
                      <div
                        className="border border-gray-200 p-4 rounded-md flex items-center justify-between mb-2 last:mb-0"
                        key={index}
                      >
                        <div className="flex items-center">
                          <Image
                            width={50}
                            height={50}
                            className="max-w-[200px] max-h-[200px]"
                            src={item?.image}
                            alt=""
                          />
                          <p className="textSmm text-text1 mr-4">{item?.title}</p>
                        </div>
                        <i
                          onClick={() => removeItemFunction(item?.id)}
                          className="fa fa-regular fa-trash text-red p-2 cursor-pointer"
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <CustomButton
              variant="outline"
              type="button"
              onClick={() => isOpenSet(true)}
              className="w-full lg:!w-fit px-4 mt-4 mr-auto"
            >
              اضافه کردن فعالیت
            </CustomButton>
          </div>
        </div>
        <CustomButton
          variant="primary"
          type="button"
          onClick={handleAddPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>
    </div>
  );
};

export default JournalAddArthurSlide;
