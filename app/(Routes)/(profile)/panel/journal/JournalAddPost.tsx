'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import { removeFromLocalStorage } from '@/app/_utils/localStorage';
import { getUser, setUserData } from '@/app/store/user';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

// ...

const JournalAddPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<File | null | string>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, selectedSubCategorySet] = useState<any>(null);
  const [result, resultSet] = useState('');
  const [sourceLink, sourceLinkSet] = useState('');
  const [hashtag, hashtagSet] = useState(null);
  const [subCategories, subCategoriesSet] = useState([]);

  const { userData } = useSelector(getUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: responseData } = useApiCall<any>({ url: '/api/get-magCategory' });

  useEffect(() => {
    if (typeof responseData == 'string') {
      toast.error(responseData);
      setTimeout(() => {
        router.push('/');
        removeFromLocalStorage('user');
        dispatch(setUserData(null));
      }, 2000);
    }
  }, [dispatch, responseData, router]);

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const handleAddPost = async () => {
    if (!userData?.writer) {
      toast?.error('تنها نویسنده به این بخش دسترسی دارد.');
      return;
    }
    if (!title || !selectedCategory || !result || !desc) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('file', result);

    formData.append('catId', selectedCategory?.value);
    formData.append('userId', userData?.userId);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('source', sourceLink ?? '');
    formData.append('hashtag', hashtag ?? '');
    formData.append('magazineSubCategoryId', selectedSubCategory?.value ?? '');

    apiCall({
      url: '/api/magazine',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          toast.success(res?.msg);
          setTitle('');
          setDesc('');
          setImage(null);
          resultSet('');
          sourceLinkSet('');
          setSelectedCategory(null);
          selectedSubCategorySet(null);
          hashtagSet(null);
        }
      },
    });
  };

  useEffect(() => {
    if (responseData && responseData?.[0]) {
      let foundedSubCategories = responseData?.filter((item: any) => {
        return item.parent === selectedCategory?.value;
      });
      subCategoriesSet(
        foundedSubCategories?.map((item: any) => ({ label: item?.name, value: item?.id })),
      );
    }
  }, [responseData, selectedCategory?.value]);

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'مجله' }, { title: 'افزودن مجله جدید', icon: 'square-plus' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="mb-10">
          <div className="mb-6 border border-gray2 rounded-lg p-4 lg:p-6">
            {!result && (
              <ImageEditor
                className={`${image ? '!h-[550px] pb-8' : '!h-0 pb-0'}`}
                image={image}
                imageSet={setImage}
                resultSet={resultSet}
              />
            )}

            {image ? null : (
              <>
                <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
                  <CustomInput
                    parentClassName="mb-4 lg:mb-0"
                    state={title}
                    setState={setTitle}
                    label="عنوان مجله"
                  />
                </div>
                <div className="lg:flex flex-col lg:flex-row gap-6 mb-6 pb-6 border-b border-b-gray1">
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">دسته بندی مجله</p>
                    <CustomSelect
                      value={selectedCategory}
                      options={
                        (responseData &&
                          typeof responseData !== 'string' &&
                          responseData?.[0] &&
                          responseData
                            ?.filter((item: any) => !item?.parent)
                            ?.map((cat: any) => ({
                              label: cat?.name,
                              value: cat?.id,
                            }))) ??
                        []
                      }
                      onChange={(e: any) => {
                        setSelectedCategory(e);
                        selectedSubCategorySet(null);
                      }}
                      label="دسته بندی مجله"
                    />
                  </div>
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">
                      زیر مجموعه دسته بندی مجله
                    </p>
                    <CustomSelect
                      value={selectedSubCategory}
                      options={subCategories ?? []}
                      isDisabled={!selectedCategory?.value}
                      onChange={selectedSubCategorySet}
                      label="دسته بندی مجله"
                    />
                  </div>
                </div>
              </>
            )}
            {!image && (typeof result === 'string' || !result) ? (
              <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                <div className="w-full">
                  <p className="textSmm font-normal text-text3 mb-2 w-full">عکس مجله</p>
                  <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
                  <p className="textXs font-bold lg:text-[14px] lg:leading-[20px] lg:font-normal text-rose-400 my-4 w-full">
                    سایز استاندارد عکس مجله 820 در 620 است
                  </p>
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

            <div className="my-6">
              <p className={`textSmm font-normal text-text3 mb-2 w-full`}>متن مجله</p>
              <RichTextEditor setState={setDesc} defaultValue={desc} />
            </div>
            {image ? null : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CustomInput state={sourceLink} setState={sourceLinkSet} label="لینک منبع" />
                  <CustomInput state={hashtag} setState={hashtagSet} label="هشتک" />
                </div>
                <CustomButton
                  variant="primary"
                  type="button"
                  onClick={handleAddPost}
                  className="w-full lg:!w-fit px-4 mt-4 mr-auto"
                >
                  افزودن
                </CustomButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalAddPost;
