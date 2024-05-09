'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
// import { iconList } from '@/app/_components/common/category/Category';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import { removeFromLocalStorage } from '@/app/_utils/localStorage';
import { setUserData } from '@/app/store/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import developmentPys from '@/app/_assets/other/category/development-psychology.svg';
import MBTI from '@/app/_assets/other/category/MBTI.svg';
import bodyLanguage from '@/app/_assets/other/category/body-language.svg';
import counseling from '@/app/_assets/other/category/counseling.svg';
import brainNeuroscience from '@/app/_assets/other/category/brain-neuroscience.svg';
import character from '@/app/_assets/other/category/character.svg';
import enneagram from '@/app/_assets/other/category/enneagram.svg';
import psychologyLearning from '@/app/_assets/other/category/psychology-learning.svg';
import psychologySocial from '@/app/_assets/other/category/psychology-social.svg';
import psychotherapy from '@/app/_assets/other/category/psychotherapy.svg';
import Link from 'next/link';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';

const iconList = [
  {
    id: 0,
    icon: counseling,
  },
  {
    id: 1,
    icon: enneagram,
  },
  {
    id: 2,
    icon: developmentPys,
  },
  {
    id: 3,
    icon: psychologyLearning,
  },
  {
    id: 4,
    icon: psychologySocial,
  },
  {
    id: 5,
    icon: brainNeuroscience,
  },
  {
    id: 6,
    icon: psychotherapy,
  },
  {
    id: 7,
    icon: MBTI,
  },
  {
    id: 8,
    icon: bodyLanguage,
  },
  {
    id: 9,
    icon: character,
  },
];

const JournalCategoryEditAndAdd = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [categoryName, categoryNameSet] = useState('');
  const [activId, setActivId] = useState(0);

  const [selectedEditCategory, selectedEditCategorySet] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [editedCategoryName, editedCategoryNameSet] = useState(null);
  const [editedActiveId, editedActiveIdSet] = useState(0);

  useEffect(() => {
    if (selectedEditCategory) {
      const findEditedCategory = categoryList?.find(
        (item: any) => item?.id == selectedEditCategory?.value,
      );
      editedCategoryNameSet(findEditedCategory?.name);
      editedActiveIdSet(findEditedCategory?.iconId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEditCategory]);

  const handleAddCategory = () => {
    if (categoryName || activId) {
      return apiCall({
        url: '/api/create-magCategory',
        method: 'post',
        data: {
          name: categoryName,
          iconId: activId,
        },
        callback: (res, er) => {
          if (res) {
            refetchCategory();
            toast.success(res);
            categoryNameSet('');
            setActivId(0);
          }
        },
      });
    } else {
      toast.error('لطفا نام دسته بندی را وارد کنید.');
    }
  };
  const handleEditCategory = () => {
    if (!selectedEditCategory?.value) {
      toast?.error('دسته بندی مورد نظر پیدا نشد.');
      return;
    }
    if (editedCategoryName || editedActiveId) {
      return apiCall({
        url: `/api/update-magCategory/${selectedEditCategory?.value}`,
        method: 'put',
        data: {
          name: editedCategoryName,
          iconId: editedActiveId,
        },
        callback: (res, er) => {
          if (res && res?.msg) {
            refetchCategory();
            toast.success(res?.msg ?? '');
            editedCategoryNameSet(null);
            editedActiveIdSet(0);
            selectedEditCategorySet(null);
          }
        },
      });
    } else {
      toast.error('لطفا نام دسته بندی را وارد کنید.');
    }
  };

  const { data: categoryList, refetch: refetchCategory } = useApiCall<any>({
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

  const forumCategoryDelete = () => {
    if (removedMagazineId) {
      return apiCall({
        url: `/api/delete-magCategory/${removedMagazineId}`,
        method: 'delete',
        callback: (res, er) => {
          if (res && res?.msg) {
            refetchCategory();
            removedMagazineIdSet(null);
            mockRemovedItemSet(null);
            toast.success(res?.msg ?? '');
          }
        },
      });
    } else {
      toast?.error('مجله ی مورد نظر پیدا نشد.');
    }
  };

  const [removedMagazineId, removedMagazineIdSet] = useState<null | number>(null);
  const [mockRemovedItem, mockRemovedItemSet] = useState<any>(null);

  const selectRemoveFunction = (e: { label: string; value: number }) => {
    mockRemovedItemSet(e);
    removedMagazineIdSet(e?.value);
  };

  // sub category options
  const [subCategoryName, subCategoryNameSet] = useState(null);
  const [subCategoryActiveId, subCategoryActiveIdSet] = useState(0);
  const [parentCategorySelected, parentCategorySelectedSet] = useState<any>(null);

  const [selectedSubCategoryEdit, selectedSubCategoryEditSet] = useState<any>(null);
  const [selectedSubCategoryEditName, selectedSubCategoryEditNameSet] = useState<any>(null);
  const [selectedSubCategoryEditActiveId, selectedSubCategoryEditActiveIdSet] = useState<any>(0);
  const [selectedSubCategoryEditParent, selectedSubCategoryEditParentSet] = useState<any>(null);

  const handleAddSubCategory = () => {
    if (subCategoryName || subCategoryActiveId || parentCategorySelected?.value) {
      return apiCall({
        url: '/api/create-magCategory',
        method: 'post',
        data: {
          name: subCategoryName,
          iconId: subCategoryActiveId,
          parent: parentCategorySelected?.value,
        },
        callback: (res, er) => {
          if (res) {
            refetchCategory();
            toast.success(res);
            subCategoryNameSet(null);
            subCategoryActiveIdSet(0);
            parentCategorySelectedSet(null);
          }
        },
      });
    } else {
      toast.error('لطفا همه فیلد ها را وارد کنید.');
    }
  };

  const handleEditSubCategory = () => {
    if (!selectedSubCategoryEdit?.value) {
      toast?.error('دسته بندی مورد نظر پیدا نشد.');
      return;
    }
    if (
      selectedSubCategoryEditName ||
      selectedSubCategoryEditActiveId ||
      selectedSubCategoryEditParent?.value
    ) {
      return apiCall({
        url: `/api/update-magCategory/${selectedSubCategoryEdit?.value}`,
        method: 'put',
        data: {
          name: selectedSubCategoryEditName,
          iconId: selectedSubCategoryEditActiveId,
          parent: selectedSubCategoryEditParent?.value,
        },
        callback: (res, er) => {
          if (res && res?.msg) {
            refetchCategory();
            toast.success(res?.msg ?? '');
            selectedSubCategoryEditNameSet(null);
            selectedSubCategoryEditActiveIdSet(0);
            selectedSubCategoryEditSet(null);
            selectedSubCategoryEditParentSet(null);
          }
        },
      });
    } else {
      toast.error('لطفا تمام موارد را کامل وارد کنید.');
    }
  };

  useEffect(() => {
    if (selectedSubCategoryEdit) {
      const findEditedCategory = categoryList?.find(
        (item: any) => item?.id == selectedSubCategoryEdit?.value,
      );
      const parent = categoryList?.find((item: any) => item?.id == findEditedCategory?.parent);
      selectedSubCategoryEditNameSet(findEditedCategory?.name);
      selectedSubCategoryEditActiveIdSet(findEditedCategory?.iconId);
      selectedSubCategoryEditParentSet({
        label: parent?.name,
        value: parent?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubCategoryEdit]);

  return (
    <>
      <StepBar array={[{ title: 'مجله' }, { title: 'جدول دسته بندی', icon: 'table-list' }]} />
      <div className="lg:bg-white lg:shadow-sidebar p-4 lg:p-6 mb-6 border border-gray2 rounded-lg">
        {categoryList?.[0] &&
          categoryList?.map((item: any, index: number) => {
            if (!item?.parent) {
              return (
                <div key={index}>
                  <p className="textSm font-bold text-text1 mb-6">{item?.name}</p>
                  {item?.magazineChild?.[0] ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      {item?.magazineChild?.map((item: any, index: number) => {
                        return (
                          <p
                            key={index}
                            className="textSm font-bold text-text1 border border-gray-200 p-2 rounded-lg"
                          >
                            {item?.name}
                          </p>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }
          })}
      </div>

      <StepBar array={[{ title: 'مجله' }, { title: 'دسته بندی ها', icon: 'border-all' }]} />

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
              onClick={forumCategoryDelete}
            >
              حذف
            </CustomButton>
          </div>
        </div>
      </Modal>

      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6 mb-6">
        <div className="border border-gray2 rounded-lg p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            اضافه کردن دسته بندی
          </p>

          <div className="relative">
            <div className="">
              <div className="flex items-end justify-end">
                <CustomInput
                  state={categoryName}
                  setState={categoryNameSet}
                  label="نام دسته بندی"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex items-end">
                <span className="textSmm font-normal text-text3">انتخاب تصویر</span>
              </div>
              <div className="grid grid-cols-4 lg:flex mt-4 w-full">
                {iconList.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative w-full flex items-center justify-center overflow-auto"
                    onClick={() => {
                      setActivId(i);
                    }}
                  >
                    <Image
                      className={`h-[60px] object-fill p-2 ${
                        activId === e.id
                          ? 'transition-all duration-200 border border-green1 rounded-xl'
                          : ''
                      }`}
                      key={i}
                      alt="image"
                      src={e.icon}
                      width={60}
                      height={60}
                    />
                  </div>
                ))}
              </div>
            </div>
            <CustomButton
              variant="primary"
              type="button"
              onClick={handleAddCategory}
              className="w-full lg:!w-fit px-4 !mt-8 !rounded-2xl lg:mr-auto"
            >
              افزودن
            </CustomButton>
          </div>
        </div>
        <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            دسته بندی مورد نظر خود برای حذف را انتخاب کنید.
          </p>
          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList
                ?.filter((item: any) => !item?.parent)
                ?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            onChange={selectRemoveFunction}
            value={mockRemovedItem}
          />
        </div>
        <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            دسته بندی مورد نظر خود برای ویرایش را انتخاب کنید.
          </p>

          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList
                ?.filter((item: any) => !item?.parent)
                ?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            value={selectedEditCategory}
            className="mb-6"
            onChange={selectedEditCategorySet}
          />

          <div className={`${selectedEditCategory ? '' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <div className="flex items-end justify-end">
                <CustomInput
                  state={editedCategoryName}
                  setState={editedCategoryNameSet}
                  label="نام دسته بندی"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex items-end">
                <span className="textSmm font-normal text-text3">انتخاب تصویر</span>
              </div>
              <div className="grid grid-cols-4 lg:flex mt-4 w-full">
                {iconList.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative w-full flex items-center justify-center overflow-auto"
                    onClick={() => {
                      editedActiveIdSet(i);
                    }}
                  >
                    <Image
                      className={`h-[60px] object-fill p-2 ${
                        editedActiveId === e.id
                          ? 'transition-all duration-200 border border-green1 rounded-xl'
                          : ''
                      }`}
                      key={i}
                      alt="image"
                      src={e.icon}
                      width={60}
                      height={60}
                    />
                  </div>
                ))}
              </div>
              <CustomButton
                variant="primary"
                type="button"
                onClick={handleEditCategory}
                className="w-full lg:!w-fit px-4 !mt-8 !rounded-2xl lg:mr-auto"
              >
                ویرایش
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* sub category */}

      <StepBar
        array={[{ title: 'مجله' }, { title: 'زیر مجموعه دسته بندی ها', icon: 'border-all' }]}
      />

      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6">
        <div className="border border-gray2 rounded-lg p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            اضافه کردن زیر مجموعه دسته بندی
          </p>

          <div className="relative">
            <div className="">
              <div className="flex items-end justify-end">
                <CustomInput
                  state={subCategoryName}
                  setState={subCategoryNameSet}
                  label="نام زیر مجموعه دسته بندی"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex items-end">
                <span className="textSmm font-normal text-text3">انتخاب تصویر</span>
              </div>
              <div className="grid grid-cols-4 lg:flex mt-4 w-full">
                {iconList.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative w-full flex items-center justify-center overflow-auto"
                    onClick={() => {
                      subCategoryActiveIdSet(i);
                    }}
                  >
                    <Image
                      className={`h-[60px] object-fill p-2 ${
                        subCategoryActiveId === e.id
                          ? 'transition-all duration-200 border border-green1 rounded-xl'
                          : ''
                      }`}
                      key={i}
                      alt="image"
                      src={e.icon}
                      width={60}
                      height={60}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className={`textSmm font-normal text-text3 mb-2 w-full`}>
                اضافه کردن به دسته بندی:
              </p>
              <CustomSelect
                options={
                  categoryList &&
                  typeof categoryList !== 'string' &&
                  categoryList?.[0] &&
                  categoryList
                    ?.filter((item: any) => !item?.parent)
                    ?.map((item: any) => ({ label: item?.name, value: item?.id }))
                }
                placeholder="جستجو کنید."
                value={parentCategorySelected}
                onChange={parentCategorySelectedSet}
              />
            </div>

            <CustomButton
              variant="primary"
              type="button"
              onClick={handleAddSubCategory}
              className="w-full lg:!w-fit px-4 !mt-8 !rounded-2xl lg:mr-auto"
            >
              افزودن
            </CustomButton>
          </div>
        </div>

        <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            زیر مجموعه دسته بندی مورد نظر خود برای حذف را انتخاب کنید.
          </p>
          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList
                ?.filter((item: any) => item?.parent)
                ?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            onChange={selectRemoveFunction}
            value={mockRemovedItem}
          />
        </div>

        <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            زیر مجموعه دسته بندی مورد نظر خود برای ویرایش را انتخاب کنید.
          </p>

          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList
                ?.filter((item: any) => item?.parent)
                ?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            value={selectedSubCategoryEdit}
            className="mb-6"
            onChange={selectedSubCategoryEditSet}
          />

          <div className={`${selectedSubCategoryEdit ? '' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <div className="flex items-end justify-end">
                <CustomInput
                  state={selectedSubCategoryEditName}
                  setState={selectedSubCategoryEditNameSet}
                  label="نام دسته بندی"
                />
              </div>
            </div>
            <div className="my-4">
              <div className="flex items-end">
                <span className="textSmm font-normal text-text3">انتخاب تصویر</span>
              </div>
              <div className="grid grid-cols-4 lg:flex my-4 w-full">
                {iconList.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative w-full flex items-center justify-center overflow-auto"
                    onClick={() => {
                      selectedSubCategoryEditActiveIdSet(i);
                    }}
                  >
                    <Image
                      className={`h-[60px] object-fill p-2 ${
                        selectedSubCategoryEditActiveId === e.id
                          ? 'transition-all duration-200 border border-green1 rounded-xl'
                          : ''
                      }`}
                      key={i}
                      alt="image"
                      src={e.icon}
                      width={60}
                      height={60}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className={`textSmm font-normal text-text3 mb-2 w-full`}>
                  اضافه شده به دسته بندی:
                </p>
                <CustomSelect
                  options={
                    categoryList &&
                    typeof categoryList !== 'string' &&
                    categoryList?.[0] &&
                    categoryList
                      ?.filter((item: any) => !item?.parent)
                      ?.map((item: any) => ({ label: item?.name, value: item?.id }))
                  }
                  placeholder="جستجو کنید."
                  value={selectedSubCategoryEditParent}
                  className="mb-6"
                  onChange={selectedSubCategoryEditParentSet}
                />
              </div>
              <CustomButton
                variant="primary"
                type="button"
                onClick={handleEditSubCategory}
                className="w-full lg:!w-fit px-4 !mt-8 !rounded-2xl lg:mr-auto"
              >
                ویرایش
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalCategoryEditAndAdd;
