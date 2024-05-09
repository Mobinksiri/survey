'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const typeCat = [
  {
    label: 'کتب',
    value: 'book',
  },
  {
    label: 'جزوات',
    value: 'note',
  },
  {
    label: 'دوره ها',
    value: 'course',
  },

  {
    label: 'سایر محصولات',
    value: 'other',
  },
];
const Page = () => {
  //local state

  const [nameCategory, nameCategorySet] = useState<string>('');
  const [typeCategory, typeCategorySet] = useState<any>(null);
  const { data: categoryList, refetch: refetchCategory } = useApiCall<any>({
    url: `/api/getAllProductCategoryByType/book`,
  });

  const createCategory = () => {
    return apiCall({
      url: '/api/createProductCategory',
      method: 'post',
      data: {
        name: nameCategory.trim(),
        type: typeCategory?.value,
      },
      callback: (res, er) => {
        if (res) {
          //   refetchCategory();
          toast.success('دسته بندی محصول با موفقیت ایجاد گردید');
        }
      },
    });
  };

  return (
    <>
      <div className="flex items-center text-text3 mb-5">
        <i className="fa fa-regular fa-memo-circle-check ml-3 text-[18px]" />
        <Link href="/profile/panel">
          <p className="textMd">محصول</p>
        </Link>
        <i className="fa fa-solid fa-angle-left mx-4 text-[15px]" />
        <p className="textMd">دسته بندی ها</p>
      </div>
      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6">
        <div className="border border-gray2 rounded-lg p-6 mb-4">
          <div className="relative">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
              <div className="flex items-end justify-end">
                <CustomInput
                  state={nameCategory}
                  setState={nameCategorySet}
                  label="نام دسته بندی"
                />
              </div>
              <div className="">
                <p className={`textSmm font-normal text-text3 mb-2 w-full `}>نوع دسته بندی</p>
                <CustomSelect
                  options={typeCat}
                  onChange={(e: any) => {
                    typeCategorySet(e);
                  }}
                />
              </div>
            </div>
            {/* <div className="my-4">
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
            </div> */}
            <CustomButton
              variant="primary"
              type="button"
              onClick={createCategory}
              className="w-full lg:!w-fit px-4 !mt-8 !rounded-2xl lg:mr-auto"
            >
              افزودن
            </CustomButton>
          </div>
        </div>
        {/* <div className="border border-gray2 rounded-lg p-4 lg:p-6 mb-4">
          <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
            دسته بندی مورد نظر خود برای حذف را انتخاب کنید.
          </p>
          <CustomSelect
            options={
              []
              //   categoryList &&
              //   typeof categoryList !== 'string' &&
              //   categoryList?.[0] &&
              //   categoryList?.map((item: any) => ({ label: item?.name, value: item?.id }))
            }
            placeholder="جستجو کنید."
            onChange={() => {}}
          />
        </div> */}
      </div>
    </>
  );
};

export default Page;
