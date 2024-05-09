import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import { magazinePostsArray } from '@/app/_interface';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ImageGalleryModal = ({
  isOpen,
  isOpenSet,
  order,
  img,
  refetch,
}: {
  isOpen: boolean;
  isOpenSet: any;
  order: number;
  img: any;
  refetch: any;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedJournal, setSelectedJournal] = useState<any>(null);
  const [image, imageSet] = useState<File | null>(null);
  const [result, resultSet] = useState<File | string>('');
  const [url, urlSet] = useState<string>('');

  const [activeTab, activeTabSet] = useState(1);

  const { data: categoryList } = useApiCall<any>({
    url: '/api/get-magCategory',
  });
  const { data: magazinePosts } = useApiCall<magazinePostsArray[]>({
    url: '/api/magazine',
  });

  const tabBarList = [
    {
      id: 1,
      title: 'لینک به مقاله',
    },
    {
      id: 2,
      title: 'لینک به سایت دیگر',
    },
  ];

  const clearFunction = () => {
    setSelectedCategory(null);
    setSelectedJournal(null);
    imageSet(null);
    resultSet('');
    isOpenSet(false);
    urlSet('');
  };

  function isValidUrl(str: string) {
    const pattern = new RegExp(
      '^(https?|ftp):\\/\\/' + '(www\\.)?' + '([a-zA-Z0-9.-]+)' + '(:\\d+)?' + '(/\\S*)?$',
      'i',
    );
    return pattern.test(str);
  }

  const imageApiCallFunction = () => {
    if (activeTab == 2 && !isValidUrl(url)) {
      toast.error('فرمت لینک نادرست است.');
      return;
    }

    const formData = new FormData();
    formData.append('file', result);
    // @ts-ignore
    formData.append('type', 1);
    // @ts-ignore
    formData.append('column', order);
    formData.append('postId', activeTab == 1 ? selectedJournal?.value : '');
    formData.append('postCategoryId', activeTab == 1 ? selectedCategory?.value : '');
    // @ts-ignore
    formData.append('url', activeTab == 2 ? url : '');

    if (img?.id) {
      formData.append('id', img?.id);
      return apiCall({
        url: `/api/banner/${img?.id}`,
        method: 'put',
        data: formData,
        formDataIsNeeded: true,
        callback: (res, er) => {
          if (res && res?.msg) {
            toast?.success(res?.msg ?? '');
            clearFunction();
            refetch();
          }
          if (er) toast?.error('خطا در برقراری ارتباط.');
        },
      });
    } else {
      return apiCall({
        url: '/api/banner',
        method: 'post',
        data: formData,
        formDataIsNeeded: true,
        callback: (res, er) => {
          if (res && res?.msg) {
            toast?.success(res?.msg ?? '');
            clearFunction();
            refetch();
          }
          if (er) toast?.error('خطا در برقراری ارتباط.');
        },
      });
    }
  };

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      imageSet(selectedImage);
    }
  };

  return (
    <Modal isOpen={isOpen} onClick={clearFunction}>
      <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[760px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">
          {!img?.id ? 'افزودن' : 'ویرایش'} مشخصات عکس
        </h4>
        {!image && (typeof result === 'string' || !result) ? (
          <div className="relative w-full h-12 rounded-lg flex mb-8 items-center justify-center bg-gray-200">
            <input
              onChange={imageChangeFunction}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="opacity-0 w-full h-full absolute top-0 left-0"
            />
            <i className="fa fa-solid fa-plus text-text1 ml-2" />
            <p className="textSmm text-text1">افزودن عکس</p>
          </div>
        ) : (
          <></>
        )}
        {result && typeof result !== 'string' && (
          <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-6">
            <i
              onClick={() => {
                resultSet('');
                imageSet(null);
              }}
              className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
            />
            <Image
              width={100}
              height={100}
              className="max-w-[200px] max-h-[200px]"
              src={URL.createObjectURL(result)}
              alt=""
            />
          </div>
        )}

        {!result && (
          <ImageEditor
            className={`${image ? '!h-[400px] pb-8' : '!h-0 pb-0'}`}
            image={image}
            imageSet={imageSet}
            resultSet={resultSet}
          />
        )}

        <div className="grid grid-cols-2 mb-4 border border-gray-200 rounded-xl p-1">
          {tabBarList?.map((item, index) => {
            return (
              <div
                className={`w-full flex items-center justify-center p-2 rounded-xl cursor-pointer transition-all ${
                  item?.id === activeTab ? 'bg-gray-200' : ''
                }`}
                key={index}
                onClick={() => activeTabSet(item?.id)}
              >
                {item?.title}
              </div>
            );
          })}
        </div>

        {activeTab == 1 ? (
          <div className="mb-6">
            <p className="textSmm text-text1 mb-6">
              دسته بندی و مقاله ی مورد نظر خود برای لینک کردن را انتخاب کنید.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  onChange={(e: any) => {
                    setSelectedCategory(e);
                    setSelectedJournal(null);
                  }}
                  label="دسته بندی مجله"
                />
              </div>
              <div className="w-full items-end">
                <p className="textSmm font-normal text-text3 mb-2 w-full">دسته بندی مجله</p>
                <CustomSelect
                  value={selectedJournal ?? null}
                  isDisabled={!selectedCategory}
                  options={
                    (magazinePosts &&
                      typeof magazinePosts !== 'string' &&
                      magazinePosts?.[0] &&
                      magazinePosts
                        ?.filter((item) => item?.catId == selectedCategory?.value)
                        ?.map((item: any) => ({
                          label: item?.title,
                          value: item?.id,
                        }))) ??
                    []
                  }
                  onChange={setSelectedJournal}
                  label="مجله"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <CustomInput label="لینک" state={url} setState={urlSet} />
          </div>
        )}

        <div className="flex w-fit mr-auto">
          <CustomButton
            className="!w-fit px-4 ml-2"
            variant="outline"
            type="button"
            onClick={clearFunction}
          >
            انصراف
          </CustomButton>
          <CustomButton
            className="!w-fit px-4"
            variant="primary"
            type="button"
            onClick={imageApiCallFunction}
            disable={
              activeTab == 1
                ? !selectedCategory?.value || !selectedJournal || !result
                : !url || !result
            }
          >
            ثبت
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;
