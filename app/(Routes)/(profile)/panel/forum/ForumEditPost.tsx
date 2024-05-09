'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
// import RichTextEditor from '@/app/_components/editors/RichTextEditor';
import { removeFromLocalStorage } from '@/app/_utils/localStorage';
import { getUser, setUserData } from '@/app/store/user';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

// ...

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const ForumEditPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<any>(null); // Store image as a File object
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [result, resultSet] = useState('');
  const [editedItemId, editedItemIdSet] = useState<number | null>(null);
  const [accordionTitle, accordionTitleSet] = useState('');
  const [accordionDesc, accordionDescSet] = useState('');
  const [accordionList, accordionListSet] = useState<any[]>([]);
  const [mockRemovedItem, mockRemovedItemSet] = useState<any>(null);
  const [removedForumId, removedForumIdSet] = useState<null | number>(null);
  const [mockSelectedItem, mockSelectedItemSet] = useState<any>(null);
  const [selectedImage, selectedImageSet] = useState(null);

  const { userData } = useSelector(getUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: forumData, refetch: refechForum } = useApiCall<any>({ url: '/api/forum' });
  const { data: responseData } = useApiCall<any>({ url: '/api/get-forumCategory' });

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

  const handleEditForum = async () => {
    if (!editedItemId) {
      toast.error('تاپیکی با این مشخصات پیدا نشد.');
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
    formData.append('score', '');
    formData.append('accordeons', JSON.stringify(accordionList));

    // Use the `formData` object for the API call and set `formDataIsNeeded` to true
    apiCall({
      url: `/api/forum/${editedItemId}`,
      method: 'put',
      data: formData, // Use the FormData object
      formDataIsNeeded: true, // Set this to true
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
          refechForum();
          setSelectedCategory(null);
          mockSelectedItemSet(null);
          selectedImageSet(null);
          editedItemIdSet(null);
        }
      },
    });
  };

  const selectForum = (e: any) => {
    const item: any = forumData?.find((item: any) => item?.id === e?.value);

    mockSelectedItemSet({ label: item?.title, value: item?.id });
    const selectedCategoryFilter = responseData?.find((_i: any) => _i?.id === item?.catId);
    setTitle(item?.title);
    setDesc(item?.desc);
    setSelectedCategory({ label: selectedCategoryFilter?.name, value: selectedCategoryFilter?.id });
    editedItemIdSet(item?.id);
    if (item?.url) {
      selectedImageSet(item?.url);
      setImage(null);
      resultSet('');
    }
  };

  const deleteForumFunction = (id: any) => {
    apiCall({
      url: `/api/forum/${removedForumId}`,
      method: 'delete',
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          refechForum();
          setTitle('');
          setDesc('');
          setImage(null);
          resultSet('');
          setSelectedCategory(null);
          toast.success(res?.msg);
          mockRemovedItemSet(null);
          removedForumIdSet(null);
        }
      },
    });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const removeAccordion = (id: any) => {
    if (id) {
      accordionListSet((prev) => prev?.filter((item) => item?.id !== id));
    } else {
      toast.error('آیتم مورد نظر پیدا نشد.');
    }
  };

  const handleAddAccordion = () => {
    if (!accordionTitle) {
      toast.error('لطفا عنوان حالت کشویی را وارد نمایید');
      return;
    }
    if (!accordionDesc) {
      toast.error('لطفا متن حالت کشویی را وارد نمایید');
      return;
    }
    const id = generateUniqueId();
    accordionListSet((prev) => [
      ...prev,
      { id, title: accordionTitle, description: accordionDesc },
    ]);
    accordionTitleSet('');
    accordionDescSet('');
  };

  const selectRemoveFunction = (e: { label: string; value: number }) => {
    mockRemovedItemSet(e);
    removedForumIdSet(e?.value);
  };

  return (
    <div className="my-6">
      <Modal
        isOpen={!!removedForumId}
        onClick={() => {
          removedForumIdSet(null);
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
                removedForumIdSet(null);
                mockRemovedItemSet(null);
              }}
            >
              انصراف
            </CustomButton>
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              onClick={deleteForumFunction}
            >
              حذف
            </CustomButton>
          </div>
        </div>
      </Modal>
      <StepBar array={[{ title: 'تالار گفت و گو' }, { title: 'ویرایش تاپیک' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <div className="mb-10">
          <div className="mb-6 border border-gray2 rounded-lg p-4 lg:p-6 gap-4">
            <p className="mb-4 textSm text-text3 font-bold">
              تاپیک مورد نظر خود برای حذف را انتخاب کنید.
            </p>
            <CustomSelect
              options={
                forumData &&
                typeof forumData !== 'string' &&
                forumData?.[0] &&
                forumData?.map((item: any) => ({ label: item?.title, value: item?.id }))
              }
              placeholder="جستجو کنید."
              onChange={selectRemoveFunction}
              value={mockRemovedItem}
            />
          </div>

          <div className="mb-6 border border-gray2 rounded-lg p-6">
            <p className="mb-4 textSm text-text3 font-bold">
              تاپیک مورد نظر خود برای ویرایش را انتخاب کنید.
            </p>
            <CustomSelect
              options={
                forumData &&
                typeof forumData !== 'string' &&
                forumData?.[0] &&
                forumData?.map((item: any) => ({ label: item?.title, value: item?.id }))
              }
              placeholder="جستجو کنید."
              onChange={selectForum}
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
                    label="عنوان تاپیک"
                  />
                  <div className="w-full items-end">
                    <p className="textSmm font-normal text-text3 mb-2 w-full">دسته بندی تاپیک</p>
                    <CustomSelect
                      value={selectedCategory}
                      defaultValue={selectedCategory}
                      options={
                        (responseData &&
                          typeof responseData !== 'string' &&
                          responseData?.map((cat: any) => ({
                            label: cat?.name,
                            value: cat?.id,
                          }))) ??
                        []
                      }
                      onChange={setSelectedCategory}
                    />
                  </div>
                </div>
              </>
            )}

            {!selectedImage && !image && (typeof result === 'string' || !result) ? (
              <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                <div className="">
                  <p className="textSmm font-normal text-text3 mb-2 w-full">عکس تاپیک</p>
                  <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
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

            {image ? null : (
              <>
                <div className="my-6">
                  <p className={`textSmm font-normal text-text3 mb-2 w-full`}>درباره تاپیک</p>
                  <RichTextEditor setState={setDesc} defaultValue={desc} />
                </div>
                <div className="mb-6 pb-6 border p-4 rounded-lg border-gray1">
                  <h5 className="mb-3 pb-3 border-b border-b-gray-300 w-full">حالت کشویی</h5>
                  {accordionList &&
                    accordionList?.[0] &&
                    accordionList?.map((item, index) => {
                      return (
                        <div
                          className="border p-2 px-3 rounded-lg border-gray1 mb-4 last:mb-0 flex items-center gap-4"
                          key={index}
                        >
                          <p className="w-full text-text1 ">
                            <span className="font-bold textSm ml-1">عنوان: </span>
                            <span className="font-normal text-[rgba(0,0,0,0.7)] textSm">
                              {item?.title}
                            </span>
                          </p>
                          <p className="w-full text-text1">
                            <span className="font-bold textSm ml-1">متن: </span>
                            <span className="font-normal text-[rgba(0,0,0,0.7)] textSm">
                              {item?.description}
                            </span>
                          </p>
                          <i
                            onClick={() => removeAccordion(item?.id)}
                            className="fa fa-solid p-2 fa-trash text-red cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  <div className="lg:flex flex-col lg:flex-row gap-6">
                    <CustomInput
                      parentClassName="mb-4 lg:mb-0"
                      state={accordionTitle}
                      setState={accordionTitleSet}
                      label="عنوان حالت کشویی"
                    />
                    <CustomInput
                      parentClassName="mb-4 lg:mb-0"
                      state={accordionDesc}
                      setState={accordionDescSet}
                      label="متن حالت کشویی"
                      type="textarea"
                    />
                  </div>
                  <CustomButton
                    variant="outline"
                    type="button"
                    onClick={handleAddAccordion}
                    className="w-full lg:!w-fit px-4 mt-4 mr-auto"
                  >
                    اضافه کردن
                  </CustomButton>
                </div>
                <CustomButton
                  variant="primary"
                  type="button"
                  onClick={handleEditForum}
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

export default ForumEditPost;
