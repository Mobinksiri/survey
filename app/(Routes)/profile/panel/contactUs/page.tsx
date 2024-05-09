/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import StepBar from '@/app/_components/common/panel/StepBar';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JournalAddArthurSlide = () => {
  const [title, titleSet] = useState<any>(null);
  const [email, emailSet] = useState<any>(null);
  const [phone, phoneSet] = useState<any>(null);

  const { data } = useApiCall<any>({
    url: '/api/getPage/contactUs',
  });

  useEffect(() => {
    if (data) {
      const pageValue = JSON.parse(data?.page_value);
      titleSet(pageValue?.title);
      emailSet(pageValue?.email);
      phoneSet(pageValue?.phone);
    }
  }, [data]);

  const handleAddPost = async () => {
    const data = {
      title,
      email,
      phone,
    };

    apiCall({
      url: '/api/upsertPage',
      method: 'post',
      data: {
        page_name: 'contactUs',
        page_value: JSON.stringify(data),
      },
      callback: (res, er) => {
        if (res && res?.message) {
          toast?.success(res?.message);
        }
      },
    });
  };

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'دیگر صفحات' }, { title: 'ارتباط با ما' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="">
          <CustomInput
            label="آدرس"
            type="textarea"
            state={title}
            setState={titleSet}
            parentClassName="mb-4"
          />
          <div className="flex items-center gap-4">
            <CustomInput
              label="شماره تماس"
              state={phone}
              setState={phoneSet}
              parentClassName="mb-4"
            />
            <CustomInput label="ایمیل" state={email} setState={emailSet} parentClassName="mb-4" />
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
