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

const TypologyAddFamousPeople = () => {
  const [famousPeopleName, famousPeopleNameSet] = useState<any>('');
  const [bio, bioSet] = useState<any>('');
  const [selectedFamousPeopleCategory, selectedFamousPeopleCategorySet] = useState<any>(null);
  const [selectedCountry, selectedCountrySet] = useState<any>(null);
  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState<any>('');

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const { data: famousPeopleCategory } = useApiCall<
    {
      createdAt: string;
      description: string;
      id: number;
      title: string;
      updatedAt: string;
    }[]
  >({ url: '/api/famousPeopleCategories' });
  const { data: countries } = useApiCall<
    {
      fa_name: string;
      id: number;
    }[]
  >({ url: '/api/country' });

  const handleAddPost = async () => {
    if (
      !famousPeopleName ||
      !result ||
      !bio ||
      !selectedCountry?.value ||
      !selectedFamousPeopleCategory?.value
    ) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('file', result);
    formData.append('name', famousPeopleName);
    formData.append('description', bio);
    formData.append('country', selectedCountry?.value);
    formData.append('category', selectedFamousPeopleCategory?.value);

    apiCall({
      url: '/api/famousPeople',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          toast.success(res?.msg);
          resultSet(null);
          setImage(null);
          famousPeopleNameSet(null);
          bioSet(null);
          selectedCountrySet(null);
          selectedFamousPeopleCategorySet(null);
        }
      },
    });
  };

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'تایپ شناسی' }, { title: 'اضافه کردن افراد مشهور' }]} />
      <div className="bg-white shadow-sidebar rounded-3xl lg:p-6">
        <div className="">
          <div className="border border-gray2 rounded-lg p-6">
            {image ? null : (
              <>
                <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">دسته بندی</p>
                    <CustomSelect
                      value={selectedFamousPeopleCategory}
                      options={
                        famousPeopleCategory?.map((item) => ({
                          value: item?.id,
                          label: item?.title,
                        })) ?? []
                      }
                      onChange={selectedFamousPeopleCategorySet}
                    />
                  </div>
                </div>

                <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">کشور</p>
                    <CustomSelect
                      value={selectedCountry}
                      options={
                        countries?.map((item) => ({
                          value: item?.id,
                          label: item?.fa_name,
                        })) ?? []
                      }
                      onChange={selectedCountrySet}
                      label="عنوان"
                      placeholder="جستجو کنید"
                      className="max-h-20"
                      maxHeight="250px"
                    />
                  </div>

                  {/* name */}
                  <CustomInput
                    state={famousPeopleName}
                    setState={famousPeopleNameSet}
                    label="نام"
                  />
                </div>

                <div className="mb-5">
                  <CustomInput state={bio} setState={bioSet} type="textarea" label="توضیحات" />
                  <p className="textXs text-text3">تعداد حروف پیام 0 الی 1000 حرف باشد.</p>
                </div>
              </>
            )}

            {result && typeof result !== 'string' && (
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

            {!result && (
              <ImageEditor
                className={`${image ? '!h-[550px] pb-8' : '!h-0 pb-0'}`}
                image={image}
                imageSet={setImage}
                resultSet={resultSet}
              />
            )}

            {!image && (typeof result === 'string' || !result) ? (
              <>
                {/* image */}
                <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                  <div className="">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">عکس</p>
                    <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <CustomButton
              variant="primary"
              type="button"
              onClick={handleAddPost}
              className="!w-fit px-4 mt-4 mr-auto"
            >
              افزودن
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypologyAddFamousPeople;
