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

const TypologyEditFictional = () => {
  const [famousPeopleName, famousPeopleNameSet] = useState<any>('');
  const [bio, bioSet] = useState<any>('');
  const [selectedFamousPeopleCategory, selectedFamousPeopleCategorySet] = useState<any>(null);
  const [selectedCountry, selectedCountrySet] = useState<any>(null);
  const [selectedId, selectedIdSet] = useState(null);
  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState<any>('');

  const { data: fictionalCharacter, refetch: fictionalCharacterRefetch } = useApiCall<any>({
    url: '/api/fictionalCharacters',
  });

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const deleteFamousPeopleFunction = (id: any) => {
    apiCall({
      url: `/api/fictionalCharacter/${id}`,
      method: 'delete',
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.message) {
          toast.success(res?.message);
          fictionalCharacterRefetch();
        }
      },
    });
  };

  const { data: famousPeopleCategory } = useApiCall<
    {
      createdAt: string;
      description: string;
      id: number;
      title: string;
      updatedAt: string;
    }[]
  >({ url: '/api/fictionalCharacterCategories' });
  const { data: countries } = useApiCall<
    {
      fa_name: string;
      id: number;
    }[]
  >({ url: '/api/country' });

  const selectFamousPeopleFunction = (item: any) => {
    const findCountry = countries?.find((cn) => cn?.id === item?.country);
    bioSet(item?.description);
    famousPeopleNameSet(item?.name);
    selectedFamousPeopleCategorySet({ label: item?.category?.title, value: item?.category?.id });
    selectedCountrySet({ label: findCountry?.fa_name, value: findCountry?.id });
    selectedIdSet(item?.id);
  };

  const handleUpdatePost = async () => {
    if (!selectedId) {
      toast.error('مطلب اضافه شده پیدا نشد. لطفا دوباره انتخاب کنید');
    }
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
      url: `/api/fictionalCharacter/${selectedId}`,
      method: 'put',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          fictionalCharacterRefetch();
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
      <StepBar array={[{ title: 'تایپ شناسی' }, { title: 'ویرایش شخصیت تخیلی' }]} />
      <div className="bg-white shadow-sidebar rounded-3xl lg:p-6">
        <div>
          <p className="mb-4 textSm text-text3 font-bold">مجله مورد نظر خود را انتخاب کنید.</p>
          <div className="mb-6 border border-gray2 rounded-lg p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fictionalCharacter &&
              typeof fictionalCharacter !== 'string' &&
              fictionalCharacter?.[0] &&
              fictionalCharacter?.map((item: any, index: any) => {
                return (
                  <div
                    className="border flex items-center overflow-hidden justify-between border-gray2 hover:bg-gray-50 transition-all cursor-pointer rounded-lg textSmm font-normal text-text3"
                    key={index}
                  >
                    <span onClick={() => selectFamousPeopleFunction(item)} className="w-full p-2">
                      {item?.name}
                    </span>
                    <div
                      onClick={() => deleteFamousPeopleFunction(item?.id)}
                      className="h-full px-4 bg-rose-500 flex items-cetner justify-center z-[2]"
                    >
                      <i className="fa my-auto fa-regular text-white fa-trash h-fit" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
              onClick={handleUpdatePost}
              className="!w-fit px-4 mt-4 mr-auto"
            >
              ویرایش
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypologyEditFictional;
