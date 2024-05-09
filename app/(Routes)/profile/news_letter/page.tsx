'use client';

import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import React, { useState } from 'react';

const Page = () => {
  const [title, titleSet] = useState(null);
  const [description, descriptionSet] = useState(null);

  return (
    <div>
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-8 mb-6">
        <h4 className="textXl text-text1 mb-8">خبرنامه</h4>
        <div className="grid grid-cols-1 gap-4">
          <CustomInput state={title} setState={titleSet} label="عنوان پیام" />
          <CustomInput
            type="textarea"
            state={description}
            setState={descriptionSet}
            label="عنوان پیام"
          />
          <CustomButton variant="primary" className="!w-fit px-6 mr-auto">
            ارسال
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
