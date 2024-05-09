/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';

import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JournalAddArthurSlide = () => {
  const { data: usersDashboard } = useApiCall<any>({
    url: '/api/usersDashboard',
    // shouldCallApi: isIntersecting,
    loading: false,
  });

  const [title, titleSet] = useState<any>(null);
  const [description, descriptionSet] = useState<any>(null);

  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState('');
  const [selectedImage, selectedImageSet] = useState(null);

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const handleAddPost = async () => {
    if (!title || !description) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const formData = new FormData();
    if (result && !selectedImage) {
      formData.append('file', result);
    }

    formData.append('title', title);
    formData.append('description', description);

    apiCall({
      url: '/api/usersDashboard',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res && res?.message) {
          toast.success(res?.message);
        }
      },
    });
  };

  useEffect(() => {
    if (usersDashboard?.box) {
      titleSet(usersDashboard?.box?.title);
      descriptionSet(usersDashboard?.box?.description);
      selectedImageSet(usersDashboard?.box?.image);
    }
  }, [usersDashboard]);

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'پروفایل کاربری' }, { title: 'باکس داشبورد' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <CustomInput parentClassName="mb-4" state={title} setState={titleSet} label="عنوان" />
        <div className="my-6">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>متن داشبورد</p>
          <RichTextEditor setState={descriptionSet} defaultValue={description} />
        </div>
        <div>
          {!result && (
            <ImageEditor
              className={`${image ? '!h-[550px] pb-8' : '!h-0 pb-0'}`}
              image={image}
              imageSet={setImage}
              resultSet={resultSet}
            />
          )}
          {selectedImage && (
            <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-3">
              <i
                onClick={() => {
                  resultSet('');
                  setImage('');
                  selectedImageSet(null);
                }}
                className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
              />
              <Image width={100} height={100} src={selectedImage} alt="" />
            </div>
          )}
          {!selectedImage && !image && (typeof result === 'string' || !result) ? (
            <div className="flex gap-6 mb-6">
              <div className="w-full">
                <p className="textSmm font-normal text-text3 mb-2 w-full">عکس مجله</p>
                <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
              </div>
            </div>
          ) : (
            <></>
          )}
          {typeof result !== 'string' && (
            <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-3">
              <i
                onClick={() => {
                  resultSet('');
                  setImage('');
                }}
                className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
              />
              <Image width={100} height={100} src={URL.createObjectURL(result)} alt="" />
            </div>
          )}
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
