"use client";
import apiCall, { useApiCall } from "@/app/_apiCall/apiCall";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import CustomInput from "@/app/_components/common/custom/CustomInput";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import Modal from "@/app/_components/common/modal/Modal";
import StepBar from "@/app/_components/common/panel/StepBar";

export const JournalCategoryEditAndAdd = () => {
   const router = useRouter();
   const dispatch = useDispatch();

   const [categoryName, categoryNameSet] = useState("");

   const [selectedEditCategory, selectedEditCategorySet] = useState<{
      value: number;
      label: string;
   } | null>(null);
   const [editedCategoryName, editedCategoryNameSet] = useState(null);
   const [editedActiveId, editedActiveIdSet] = useState(0);

   useEffect(() => {
      if (selectedEditCategory) {
         const findEditedCategory = categoryList?.find(
            (item: any) => item?.id == selectedEditCategory?.value
         );
         editedCategoryNameSet(findEditedCategory?.name);
         editedActiveIdSet(findEditedCategory?.iconId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedEditCategory]);

   const handleAddCategory = () => {
      if (categoryName) {
         return apiCall({
            url: "/api/create-pollCategory",
            method: "post",
            data: {
               name: categoryName,
            },
            callback: (res, er) => {
               if (res) {
                  refetchCategory();
                  toast.success(res);
                  categoryNameSet("");
               }
            },
         });
      } else {
         toast.error("لطفا نام دسته بندی را وارد کنید.");
      }
   };

   const handleEditCategory = () => {
      if (!selectedEditCategory?.value) {
         toast?.error("دسته بندی مورد نظر پیدا نشد.");
         return;
      }
      if (editedCategoryName || editedActiveId) {
         return apiCall({
            url: `/api/updatePollCategory/${selectedEditCategory?.value}`,
            method: "put",
            data: {
               name: editedCategoryName,
            },
            callback: (res, er) => {
               if (res) {
                  refetchCategory();
                  toast.success("دسته بندی با موفقیت ادیت شد.");
                  editedCategoryNameSet(null);
                  editedActiveIdSet(0);
                  selectedEditCategorySet(null);
               }
            },
         });
      } else {
         toast.error("لطفا نام دسته بندی را وارد کنید.");
      }
   };

   const { data: categoryList, refetch: refetchCategory } = useApiCall<any>({
      url: "/api/get-pollCategory",
   });

   const forumCategoryDelete = () => {
      if (removedMagazineId) {
         return apiCall({
            url: `/api/deletePollCategory/${removedMagazineId}`,
            method: "delete",
            callback: (res, er) => {
               if (res) {
                  refetchCategory();
                  removedMagazineIdSet(null);
                  mockRemovedItemSet(null);
                  toast.success("دسته بندی با موفقیت پاک شد.");
               }
            },
         });
      } else {
         toast?.error("مجله ی مورد نظر پیدا نشد.");
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
         <div className="mb-6">
            <StepBar array={[{ title: "آزمون" }, { title: "دسته بندی ها" }]} />
         </div>

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

         <div className="">
            <div className="flex gap-6 mb-6">
               {/* add */}
               <div className="rounded-md shadow-default p-6 w-full h-[250px]">
                  <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray-300">
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
                        className="w-full lg:!w-fit px-4 !mt-6 lg:mr-auto"
                     >
                        افزودن
                     </CustomButton>
                  </div>
               </div>

               {/* delete */}
               <div className="rounded-md shadow-default p-6 w-full h-[250px]">
                  <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
                     حذف دسته بندی
                  </p>
                  <p className={`textSmm font-normal text-text3 mb-2 w-full`}>
                     دسته بندی مورد نظر خود برای حذف را انتخاب کنید.
                  </p>
                  <CustomSelect
                     options={
                        categoryList &&
                        typeof categoryList !== "string" &&
                        categoryList?.[0] &&
                        categoryList?.map((item: any) => ({ label: item?.name, value: item?.id }))
                     }
                     placeholder="جستجو کنید."
                     onChange={selectRemoveFunction}
                     value={mockRemovedItem}
                  />
               </div>
            </div>

            {/* edit */}
            <div className="rounded-md shadow-default p-6 w-full h-full">
               <p className="textSm font-normal text-text1 mb-5 pb-5 border-b border-b-gray2">
                  ویرایش دسته بندی
               </p>
               <p className={`textSmm font-normal text-text3 mb-2 w-full`}>
                  دسته بندی مورد نظر خود برای ویرایش را انتخاب کنید.
               </p>

               <CustomSelect
                  options={
                     categoryList &&
                     typeof categoryList !== "string" &&
                     categoryList?.[0] &&
                     categoryList?.map((item: any) => ({ label: item?.name, value: item?.id }))
                  }
                  placeholder="جستجو کنید."
                  value={selectedEditCategory}
                  className="mb-6"
                  onChange={selectedEditCategorySet}
               />

               <div className={`${selectedEditCategory ? "" : "opacity-50 pointer-events-none"}`}>
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
                     {/* <div className="flex items-end">
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
     </div> */}
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
