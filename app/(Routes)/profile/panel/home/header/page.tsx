/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import StepBar from '@/app/_components/common/panel/StepBar';

import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JournalAddArthurSlide = () => {
  // const { data: usersDashboard } = useApiCall<any>({
  //   url: '/api/usersDashboard',
  //   loading: false,
  // });

  const [title, titleSet] = useState<any>(null);
  const [description, descriptionSet] = useState<any>(null);

  const handleAddPost = async () => {
    if (!description) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    apiCall({
      url: '/api/usersDashboard',
      method: 'post',
      data: {
        description,
      },
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res && res?.message) {
          toast.success(res?.message);
        }
      },
    });
  };

  // useEffect(() => {
  //   if (usersDashboard?.box) {
  //     descriptionSet(usersDashboard?.box?.description);
  //   }
  // }, [usersDashboard]);

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'صفحه اصلی' }, { title: 'هدر (header)' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="my-6">
          <CustomInput
            label="عنوان هدر"
            state={title}
            setState={titleSet}
            placeholder="عنوان هدر"
            parentClassName="mb-4"
          />
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>توضیحات هدر</p>
          <RichTextEditor setState={descriptionSet} defaultValue={description} />
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
