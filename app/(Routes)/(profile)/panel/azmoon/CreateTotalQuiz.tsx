'use client';
import React, { useState } from 'react';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import Image from 'next/image';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import { toast } from 'react-hot-toast';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import ShowAllQuestion from './component/ShowAllQuestion';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';

const TimeSelect = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
  { label: '60', value: '60' },
  { label: '70', value: '70' },
  { label: '80', value: '80' },
  { label: '90', value: '90' },
  { label: '100', value: '100' },
  { label: '110', value: '110' },
  { label: '120', value: '120' },
];
const CreateTotalQuiz = () => {
  //local State:

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState('');
  const [maxTime, setMaxTime] = useState('120');
  const [ansTime, setAnsTime] = useState('');
  const [fetchedData, setFetchedData] = useState(null);

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };
  const { data: responseData, refetch: categoryQuestionListRefech } = useApiCall<any>({
    url: '/api/poll',
  });

  const handelAddQuizCategory = () => {
    if (!title || !description || !result) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }
    const formData = new FormData();
    formData.append('file', result);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('timeToAnswer', ansTime);
    formData.append('maxTimeToAnswer', maxTime);

    apiCall({
      url: '/api/poll',
      method: 'post',
      data: formData, // Use the FormData object
      formDataIsNeeded: true, // Set this to true
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          categoryQuestionListRefech();
          toast.success(res?.msg);
          setTitle('');
          setDescription('');
          setImage(null);
          resultSet('');
          //   setDesc('');
          //   setImage(null);
          //   resultSet('');
          //   sourceLinkSet('');
          //   setSelectedCategory(null);
        }
      },
    });
  };
  const hadelDeleteQuizCategory = (id: any) => {
    apiCall({
      url: '/api/poll',
      method: 'delete',
      data: {
        id: id,
      }, // Use the FormData object
      // Set this to true
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res) {
          toast.success(res?.msg);
          categoryQuestionListRefech();
        }
      },
    });
  };

  return (
    <div className="mb-10">
      <div className="flex items-center text-text3 mb-5">
        <i className="fa fa-regular fa-memo-circle-check ml-3 text-[18px]" />
        <p className="textMd">آزمون</p>
        <i className="fa fa-solid fa-angle-left mx-4 text-[15px]" />
        <p className="textMd">ایجاد دسته بندی ها</p>
      </div>
      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl mb-5 lg:p-6">
        <CustomInput setState={setTitle} state={title} label="عنوان آزمون" />
        <CustomInput
          parentClassName="mt-5"
          setState={setDescription}
          state={description}
          label="توضیحات آزمون"
        />
        <p className={`mt-5 textSmm font-normal text-text3 mb-2 w-full `}>مدت زمان آزمون</p>
        <CustomSelect
          // value={selectedCategory}
          className=""
          options={TimeSelect}
          onChange={(e: { label: string; value: string }) => {
            setAnsTime(e.value);
          }}
        />

        {/* <CustomInput type="custom" setState={setAnsTime} state={ansTime} label="مدت زمان آزمون" /> */}
        <div className=" lg:rounded-3xl mt-6">
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
                  {!result && (
                    <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
                      <div className="w-full">
                        <p className="textSmm font-normal text-text3 mb-2 w-full">عکس آزمون</p>
                        <input
                          onChange={imageChangeFunction}
                          type="file"
                          accept=".png, .jpg, .jpeg"
                        />
                        <p className="textXs font-bold lg:text-[14px] lg:leading-[20px] lg:font-normal text-rose-400 my-4 w-full">
                          سایز استاندارد عکس آزمون 820 در 620 است
                        </p>
                      </div>
                    </div>
                  )}
                </>
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
                  <CustomButton
                    variant="primary"
                    type="button"
                    onClick={handelAddQuizCategory}
                    className="w-full lg:!w-fit px-4 mt-4 mr-auto"
                    disable={!title || !description || !result}
                  >
                    افزودن
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {responseData && (
        <ShowAllQuestion
          handelDelete={(e: any) => {
            e.stopPropagation();
            hadelDeleteQuizCategory(e);
          }}
          array={responseData}
        />
      )}
    </div>
  );
};

export default CreateTotalQuiz;
