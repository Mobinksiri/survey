'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';

const JournalCategoryEditAndAdd = () => {
  const { data: categoryList, refetch: refetchCategory } = useApiCall<any>({
    url: '/api/get-forumCategory',
  });

  const [categoryName, categoryNameSet] = useState('');

  const [selectedEditCategory, selectedEditCategorySet] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [editedCategoryName, editedCategoryNameSet] = useState<string | null>(null);

  useEffect(() => {
    if (selectedEditCategory) {
      const findEditedCategory = categoryList?.find(
        (item: any) => item?.id == selectedEditCategory?.value,
      );
      editedCategoryNameSet(findEditedCategory?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEditCategory]);

  const handleAddCategory = () => {
    if (categoryName) {
      return apiCall({
        url: '/api/create-forumCategory',
        method: 'post',
        data: {
          name: categoryName,
        },
        callback: (res, er) => {
          if (res) {
            refetchCategory();
            toast.success(res);
            categoryNameSet('');
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
    if (editedCategoryName) {
      return apiCall({
        url: `/api/update-forumCategory/${selectedEditCategory?.value}`,
        method: 'put',
        data: {
          name: editedCategoryName,
        },
        callback: (res, er) => {
          if (res && res?.msg) {
            refetchCategory();
            toast.success(res?.msg ?? '');
            editedCategoryNameSet('');
            selectedEditCategorySet(null);
          }
        },
      });
    } else {
      toast.error('لطفا نام دسته بندی را وارد کنید.');
    }
  };

  const forumCategoryDelete = () => {
    if (removedMagazineId) {
      return apiCall({
        url: `/api/delete-forumCategory/${removedMagazineId}`,
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

  return (
    <>
      <StepBar
        array={[{ title: 'تالار گفت و گو' }, { title: 'دسته بندی ها', icon: 'table-list' }]}
      />

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

      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6">
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
            مجله مورد نظر خود برای حذف را انتخاب کنید.
          </p>
          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            onChange={selectRemoveFunction}
            value={mockRemovedItem}
          />
        </div>
        <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            مجله مورد نظر خود برای ویرایش را انتخاب کنید.
          </p>

          <CustomSelect
            options={
              categoryList &&
              typeof categoryList !== 'string' &&
              categoryList?.[0] &&
              categoryList?.map((item: any) => ({ label: item?.name, value: item?.id }))
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
    </>
  );
};

export default JournalCategoryEditAndAdd;
