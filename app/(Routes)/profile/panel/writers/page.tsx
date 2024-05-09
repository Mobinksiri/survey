/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const JournalAddArthurSlide = () => {
  const [name, nameSet] = useState<any>(null);
  const [bio, bioSet] = useState<any>(null);
  const [intro, introSet] = useState<any>(null);
  const [resume, resumeSet] = useState<any>(null);
  const [personalTypes, personalTypesSet] = useState<any>(null);
  const [assignedUser, assignedUserSet] = useState<any>(null);
  const [writerType, writerTypeSet] = useState<any>(null);
  const [level, levelSet] = useState<any>(null);
  const [video, videoSet] = useState<File | null>(null);

  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState('');

  const { data: mbtiList } = useApiCall<any>({
    url: '/api/mbti',
  });
  const { data: aniagramList } = useApiCall<any>({
    url: '/api/aniagram',
  });
  const { data: users } = useApiCall<any>({
    url: '/api/users',
  });

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const handleAddPost = async () => {
    if (
      !name ||
      !bio ||
      !intro ||
      !resume ||
      !result ||
      !personalTypes?.[0] ||
      !assignedUser?.value ||
      !writerType?.value
    ) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('file', result);

    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('type', writerType?.value);
    formData.append('introduction', intro);
    formData.append('resume', resume);
    formData.append('userId', assignedUser?.value);
    formData.append('personalTypes', JSON.stringify(personalTypes));
    formData.append('level', level);
    // @ts-ignore
    formData.append('video', video);

    apiCall({
      url: '/api/writers',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res) {
          toast.success('نویسنده با موفقیت ساخته شد.');
        }
      },
    });
  };

  const videoChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      videoSet(selectedImage);
    }
  };

  let personalTypesList = mbtiList?.[0] &&
    aniagramList?.[0] && [
      ...mbtiList?.map((item: any) => ({
        label: item?.name,
        value: item?.id,
      })),
      ...aniagramList?.map((item: any) => ({
        label: item?.name,
        value: item?.id,
      })),
    ];

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'صفحه اصلی' }, { title: 'نویسندگان', icon: 'circle-user' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
          <CustomInput
            parentClassName="mb-4 lg:mb-0"
            state={name}
            setState={nameSet}
            label="اسم نویسنده"
          />
          <div className="w-full">
            <p className={`textSmm font-normal text-text3 mb-2 w-full`}>اضافه کردن به کاربر:</p>
            <CustomSelect
              options={
                users
                  ?.filter((item: any) => !item?.isAdmin && !item?.writer)
                  ?.map((item: any) => ({
                    label: item?.name,
                    value: item?.id,
                  })) ?? []
              }
              placeholder="جستجو کنید..."
              value={assignedUser}
              onChange={assignedUserSet}
            />
          </div>
        </div>
        <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full">
            <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تیپ های شخصیتی</p>
            <CustomSelect
              isMulti
              options={personalTypesList}
              placeholder="جستجو کنید..."
              value={personalTypes}
              onChange={personalTypesSet}
            />
          </div>
          <div className="w-full">
            <p className={`textSmm font-normal text-text3 mb-2 w-full`}>دسته بندی شغلی</p>
            <CustomSelect
              options={[
                {
                  label: 'نویسنده',
                  value: 1,
                },
                {
                  label: 'مترجم',
                  value: 2,
                },
                {
                  label: 'مدرس',
                  value: 3,
                },
              ]}
              placeholder="جستجو کنید..."
              value={writerType}
              onChange={writerTypeSet}
            />
          </div>
        </div>
        <div className="lg:flex flex-col lg:flex-row gap-6 mb-4">
          <CustomInput
            parentClassName="mb-4 lg:mb-0"
            state={level}
            setState={levelSet}
            type="number"
            label="رتبه نویسنده"
          />
          <CustomInput
            parentClassName="mb-4 lg:mb-0"
            state={bio}
            setState={bioSet}
            type="textarea"
            label="بیو کوتاه نویسنده"
          />
        </div>
        <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
          <CustomInput
            parentClassName="mb-4 lg:mb-0"
            state={intro}
            setState={introSet}
            label="معرفی نویسنده"
            type="textarea"
          />
        </div>
        <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
          <CustomInput
            parentClassName="mb-4 lg:mb-0"
            state={resume}
            setState={resumeSet}
            type="textarea"
            label="رزومه نویسنده"
          />
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
          {!image && (typeof result === 'string' || !result) ? (
            <div className="flex gap-6 mb-6">
              <div className="w-full">
                <p className="textSmm font-normal text-text3 mb-2 w-full">عکس نویسنده</p>
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
          {writerType?.value === 3 && (
            <div>
              <p className={`textSmm font-normal text-text3 mb-2 w-full`}>نمونه تدریس</p>
              <input
                onChange={videoChangeFunction}
                className=""
                type="file"
                accept="video/*"
                name="file"
              />
            </div>
          )}
        </div>
        <CustomButton
          variant="primary"
          type="button"
          onClick={handleAddPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          افزودن
        </CustomButton>
      </div>
    </div>
  );
};

export default JournalAddArthurSlide;
