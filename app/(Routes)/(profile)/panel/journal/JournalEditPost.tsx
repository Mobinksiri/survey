'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
// import RichTextEditor from '@/app/_components/editors/RichTextEditor';
import { magazinePostsArray } from '@/app/_interface';
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

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const JournalEditPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<File | null | string>(null); // Store image as a File object
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [result, resultSet] = useState('');
  const [sourceLink, sourceLinkSet] = useState('');
  const [editedItemId, editedItemIdSet] = useState<number | null>(null);
  const [removedMagazineId, removedMagazineIdSet] = useState<null | number>(null);
  const [mockRemovedItem, mockRemovedItemSet] = useState<any>(null);
  const [mockSelectedItem, mockSelectedItemSet] = useState<any>(null);
  const [selectedImage, selectedImageSet] = useState(null);

  const { userData } = useSelector(getUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: categoryList } = useApiCall<any>({
    url: '/api/get-magCategory',
  });

  useEffect(() => {
    if (typeof categoryList == 'string') {
      toast.error(categoryList);
      setTimeout(() => {
        router.push('/');
        removeFromLocalStorage('user');
        dispatch(setUserData(null));
      }, 2000);
    }
  }, [dispatch, categoryList, router]);

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const updatePost = async () => {
    if (!userData?.writer) {
      toast?.error('تنها نویسنده به این بخش دسترسی دارد.');
      return;
    }

    if (!editedItemId) {
      toast?.error('لطفا مجله ای که میخواهید ویرایش کنید را انتخاب کنید.');
      return;
    }

    if (!selectedImage && !result) {
      toast.error('لطفا عکس مجله را انتخاب کنید.');
      return;
    }

    if (!title || !selectedCategory || !desc) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    // Create a FormData object and append the image file
    const formData = new FormData();

    if (!selectedImage && result) {
      formData.append('file', result);
    }

    // Append other form fields if needed, e.g., catId
    formData.append('catId', selectedCategory?.value);
    formData.append('userId', userData?.userId);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('source', sourceLink ?? '');

    // Use the `formData` object for the API call and set `formDataIsNeeded` to true
    apiCall({
      url: `/api/magazine/${editedItemId}`,
      method: 'put',
      data: formData, // Use the FormData object
      formDataIsNeeded: true, // Set this to true
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          toast.success(res?.msg);
          refetchMagazine();
          setTitle('');
          setDesc('');
          setImage(null);
          resultSet('');
          sourceLinkSet('');
          setSelectedCategory(null);
          mockSelectedItemSet(null);
          selectedImageSet(null);
          editedItemIdSet(null);
        }
      },
    });
  };

  // get all magazine
  const { data: magazinePosts, refetch: refetchMagazine } = useApiCall<magazinePostsArray[]>({
    url: '/api/magazine',
  });

  const selectMagazine = (e: { label: string; value: number }) => {
    const item: any = magazinePosts?.find((item: magazinePostsArray) => item?.id === e?.value);

    const selectedCategoryFilter = categoryList?.find((_i: any) => _i?.id === item?.catId);
    mockSelectedItemSet({ label: item?.title, value: item?.id });
    setTitle(item?.title);
    setDesc(item?.desc);
    setSelectedCategory({ label: selectedCategoryFilter?.name, value: selectedCategoryFilter?.id });
    editedItemIdSet(item?.id);
    sourceLinkSet(item?.source);
    if (item?.url) {
      selectedImageSet(item?.url);
      setImage(null);
      resultSet('');
    }
  };

  const selectRemoveFunction = (e: { label: string; value: number }) => {
    mockRemovedItemSet(e);
    removedMagazineIdSet(e?.value);
  };

  const deleteJournalFunction = () => {
    if (removedMagazineId) {
      apiCall({
        url: `/api/magazine/${removedMagazineId}`,
        method: 'delete',
        callback: (res, er) => {
          if (res?.error) {
            toast.error(res?.error);
          }
          if (res?.msg) {
            refetchMagazine();
            setTitle('');
            setDesc('');
            setImage(null);
            resultSet('');
            sourceLinkSet('');
            setSelectedCategory(null);
            removedMagazineIdSet(null);
            mockRemovedItemSet(null);
            toast.success(res?.msg);
          }
        },
      });
    } else {
      toast?.error('مجله ی مورد نظر پیدا نشد.');
    }
  };

  return (
    <div className="my-6">
      <Modal
        isOpen={!!removedMagazineId}
        onClick={() => {
          removedMagazineIdSet(null);
          mockRemovedItemSet(null);
        }}
      >
        <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[460px] rounded-2xl">
          <h4 className="textMd text-text1 mb-3 pb-3">
            آیا مایل به حذف `{mockRemovedItem?.label}` هستید؟
          </h4>

          <div className="flex w-fit mr-auto">
            <CustomButton
              className="!w-fit px-4 ml-2"
              variant="outline"
              type="button"
              onClick={() => {
                removedMagazineIdSet(null);
                mockRemovedItemSet(null);
              }}
            >
              انصراف
            </CustomButton>
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              onClick={deleteJournalFunction}
            >
              حذف
            </CustomButton>
          </div>
        </div>
      </Modal>

      <StepBar array={[{ title: 'مجله' }, { title: 'ویرایش مجله', icon: 'pen-clip' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="mb-10">
          <div className="mb-6 border border-gray2 rounded-lg p-4 lg:p-6 gap-4">
            <p className="mb-4 textSm text-text3 font-bold">
              مجله مورد نظر خود برای حذف را انتخاب کنید.
            </p>
            <CustomSelect
              options={
                magazinePosts &&
                typeof magazinePosts !== 'string' &&
                magazinePosts?.[0] &&
                magazinePosts?.map((item) => ({ label: item?.title, value: item?.id }))
              }
              placeholder="جستجو کنید."
              onChange={selectRemoveFunction}
              value={mockRemovedItem}
            />
          </div>
          <div className="mb-6 border border-gray2 rounded-lg p-4 lg:p-6 gap-4">
            <p className="mb-4 textSm text-text3 font-bold">
              مجله مورد نظر خود برای ویرایش را انتخاب کنید.
            </p>
            <CustomSelect
              options={
                magazinePosts &&
                typeof magazinePosts !== 'string' &&
                magazinePosts?.[0] &&
                magazinePosts?.map((item) => ({ label: item?.title, value: item?.id }))
              }
              placeholder="جستجو کنید."
              onChange={selectMagazine}
              value={mockSelectedItem}
              className="mb-6"
            />
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
                <div className="lg:flex flex-col lg:flex-row gap-6 mb-6 pb-6 border-b border-b-gray1">
                  <CustomInput
                    parentClassName="mb-4 lg:mb-0"
                    state={title}
                    setState={setTitle}
                    label="عنوان مجله"
                  />
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">دسته بندی مجله</p>
                    <CustomSelect
                      value={selectedCategory ?? null}
                      options={
                        (categoryList &&
                          typeof categoryList !== 'string' &&
                          categoryList?.[0] &&
                          categoryList?.map((cat: any) => ({
                            label: cat?.name,
                            value: cat?.id,
                          }))) ??
                        []
                      }
                      onChange={setSelectedCategory}
                      label="دسته بندی مجله"
                    />
                  </div>
                </div>
              </>
            )}

            {!selectedImage && !image && (typeof result === 'string' || !result) ? (
              <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                <div className="w-full">
                  <p className="textSmm font-normal text-text3 mb-2 w-full">عکس مجله</p>
                  <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
                  <p className="textSmm font-normal text-rose-400 my-4 w-full">
                    سایز استاندارد عکس مجله 820 در 620 است
                  </p>
                </div>
              </div>
            ) : (
              <></>
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
                <CustomInput state={sourceLink} setState={sourceLinkSet} label="لینک منبع" />
                <CustomButton
                  variant="primary"
                  type="button"
                  onClick={updatePost}
                  className="w-full lg:!w-fit px-4 mt-4 mr-auto"
                >
                  ویرایش
                </CustomButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEditPost;
