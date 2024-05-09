'use client';

import React, { useState } from 'react';
import CreatedQuiz from './CreatedQuiz';
import AddQuizButton from './AddQuizButton';
import Modal from '@/app/_components/common/modal/Modal';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// icons -----------------------------------------------
import developmentPys from '@/app/_assets/other/quiz/icons/1.svg';
import MBTI from '@/app/_assets/other/quiz/icons/2.svg';
import bodyLanguage from '@/app/_assets/other/quiz/icons/3.svg';
import counseling from '@/app/_assets/other/quiz/icons/4.svg';
import brainNeuroscience from '@/app/_assets/other/quiz/icons/5.svg';
import character from '@/app/_assets/other/quiz/icons/6.svg';
import enneagram from '@/app/_assets/other/quiz/icons/7.svg';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import toast from 'react-hot-toast';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import StepBar from '@/app/_components/common/panel/StepBar';
// -----------------------------------------------

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export const iconList = [
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
    icon: brainNeuroscience,
  },
  {
    id: 4,
    icon: MBTI,
  },
  {
    id: 5,
    icon: bodyLanguage,
  },
  {
    id: 6,
    icon: character,
  },
];

const QuizPanel = () => {
  const [addModalOpen, addModalOpenSet] = useState(false);

  const { data: pollList, refetch: pollListRefetch } = useApiCall<any>({
    url: '/api/poll',
  });
  const { data: pollCategories, refetch: pollCategoriesRefetch } = useApiCall<any>({
    url: '/api/get-pollCategory',
  });

  const [activeId, activeIdSet] = useState<number>(0);

  const [quizAddIndex, quizAddIndexSet] = useState(1);
  const [quizName, quizNameSet] = useState<string>('');
  const [about, aboutSet] = useState<string>('');
  const [quizDescription, quizDescriptionSet] = useState<string>('');
  const [quizValue, quizValueSet] = useState<string>('');
  const [minAge, minAgeSet] = useState<string>('');
  const [maxAge, maxAgeSet] = useState<string>('');

  const [accordionTitle, accordionTitleSet] = useState('');
  const [accordionDesc, accordionDescSet] = useState('');
  const [accordionList, accordionListSet] = useState<any[]>([]);
  const [maxTimeToAnswer, maxTimeToAnswerSet] = useState<string>('');
  const [timeToAnswer, timeToAnswerSet] = useState<string>('');

  const [video, videoSet] = useState<File | null>(null);
  const [audio, audioSet] = useState<File | null>(null);

  const clearFunction = () => {
    addModalOpenSet(false);
    quizAddIndexSet(1);
    quizNameSet('');
    quizDescriptionSet('');
    quizValueSet('');
    activeIdSet(0);
    aboutSet('');
    minAgeSet('');
    maxAgeSet('');
    accordionTitleSet('');
    accordionDescSet('');
    accordionListSet([]);
    maxTimeToAnswerSet('');
    timeToAnswerSet('');
  };

  const addQuizFunction = () => {
    const formData = new FormData();
    if (video) {
      formData.append('video', video);
    }

    if (audio) {
      formData.append('voice', audio);
    }

    formData.append('title', quizName);
    formData.append('description', quizDescription);
    formData.append('maxTimeToAnswer', maxTimeToAnswer);
    formData.append('timeToAnswer', timeToAnswer);
    formData.append('Validity', quizValue);
    // @ts-ignore
    formData.append('imageId', activeId);
    formData.append('frequentlyQuestions', JSON.stringify(accordionList));
    formData.append('fromAge', minAge);
    formData.append('toAge', maxAge);
    formData.append('about', about);
    formData.append('pollcategoryId', selectedCategory?.value);

    return apiCall({
      url: '/api/poll',
      method: 'post',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res?.msg) {
          toast.success(res?.msg ?? '');
          pollListRefetch();
          clearFunction();
        }
      },
    });
  };

  const removeQuizFunction = (id: number) => {
    return apiCall({
      url: `/api/poll/${id}`,
      method: 'delete',
      data: {},
      callback: (res, er) => {
        pollListRefetch();
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
      toast.error('لطفا سوال را وارد نمایید');
      return;
    }
    if (!accordionDesc) {
      toast.error('لطفا پاسخ را وارد نمایید');
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

  const videoChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      videoSet(selectedImage);
    }
  };
  const audioChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      audioSet(selectedImage);
    }
  };

  const [selectedCategory, selectedCategorySet] = useState<any>(null);

  return (
    <>
      <StepBar array={[{ title: 'آزمون های من' }]} />
      <Modal isOpen={addModalOpen} enableScrollProp onClick={() => null}>
        <div className="relative my-6 p-6 bg-white w-[calc(100vw-32px)] md:w-[calc(100vw-50vw)] lg:w-[calc(100vw-50vw)] rounded-2xl">
          <div
            className="items-end mr-auto w-fit flex justify-end absolute top-4 left-4 p-2 cursor-pointer"
            onClick={() => {
              clearFunction();
            }}
          >
            <i className="fa fa-regular fa-close text-[20px]" />
          </div>
          <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">اضافه کردن آزمون</h4>

          {quizAddIndex == 1 && (
            <div className="mb-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <CustomInput
                  parentClassName="mb-6"
                  label="نام آزمون"
                  state={quizName}
                  setState={quizNameSet}
                />
                <div className="w-full">
                  <p className={`textSmm font-normal text-text3 mb-2 w-full`}>دسته بندی آزمون</p>
                  <CustomSelect
                    options={
                      (pollCategories &&
                        pollCategories?.map((item: any) => ({
                          label: item?.name,
                          value: item?.id,
                        }))) ??
                      []
                    }
                    value={selectedCategory}
                    onChange={selectedCategorySet}
                    noOptionsMessage={() => {
                      return (
                        <p className="textXs font-medium text-text3">
                          تاپیکی برای این موضوع وجود ندارد.
                        </p>
                      );
                    }}
                  />
                </div>
              </div>
              <p className="textSmm text-text1 mb-4 text-center lg:text-right">
                لطفا تصویر مورد نظر خود را انتخاب کنید.
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 mb-6">
                {iconList.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative w-full flex items-center justify-center overflow-auto"
                    onClick={() => {
                      activeIdSet(i);
                    }}
                  >
                    <Image
                      className={`h-[60px] object-fill p-2 ${
                        activeId === e.id
                          ? 'transition-all duration-200 border-2 border-text1 rounded-xl'
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
              <CustomInput
                parentClassName="mb-10"
                label="درباره آزمون"
                type="textarea"
                state={about}
                setState={aboutSet}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <p className={`textSmm font-normal text-text3 mb-2 w-full`}>ویدیو معرفی آزمون</p>
                  <input
                    onChange={videoChangeFunction}
                    className=""
                    type="file"
                    accept="video/*"
                    name="file"
                  />
                </div>
                <div>
                  <p className={`textSmm font-normal text-text3 mb-2 w-full`}>درباره تست، بشنوید</p>
                  <input
                    onChange={audioChangeFunction}
                    className=""
                    type="file"
                    accept="audio/*"
                    name="file"
                  />
                </div>
              </div>
            </div>
          )}
          {quizAddIndex == 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <CustomInput
                state={timeToAnswer}
                setState={timeToAnswerSet}
                label="مدت زمان آزمون (دقیقه)"
                type="number"
              />
              <CustomInput
                state={maxTimeToAnswer}
                setState={maxTimeToAnswerSet}
                label="حداکثر زمان پاسخگویی (دقیقه)"
                type="number"
              />
              <CustomInput state={minAge} setState={minAgeSet} label="حداقل سن" type="number" />
              <CustomInput state={maxAge} setState={maxAgeSet} label="حداکثر سن" type="number" />
            </div>
          )}
          {quizAddIndex == 3 && (
            <div className="mb-6">
              <div className="mb-6 pb-6 border p-4 rounded-lg border-gray1">
                <h5 className="mb-3 pb-3 border-b border-b-gray-300 w-full">سوالات متداول</h5>
                <div className="grid grid-cols-2 mb-4 gap-2">
                  {accordionList &&
                    accordionList?.[0] &&
                    accordionList?.map((item, index) => {
                      return (
                        <div
                          className="border p-1 px-2 rounded-lg border-gray1 last:mb-0 flex items-center gap-4"
                          key={index}
                        >
                          <p className="w-full text-text1 ">
                            <span className="font-bold textSmm ml-1">سوال: </span>
                            <span className="font-normal text-[rgba(0,0,0,0.7)] textSmm">
                              {item?.title}
                            </span>
                          </p>
                          <i
                            onClick={() => removeAccordion(item?.id)}
                            className="fa fa-solid p-2 fa-trash text-red cursor-pointer"
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="lg:flex flex-col lg:flex-row gap-6">
                  <CustomInput
                    parentClassName="mb-4 lg:mb-0"
                    state={accordionTitle}
                    setState={accordionTitleSet}
                    label="سوال"
                  />
                  <CustomInput
                    parentClassName="mb-4 lg:mb-0"
                    state={accordionDesc}
                    setState={accordionDescSet}
                    label="پاسخ"
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
            </div>
          )}
          {quizAddIndex == 4 && (
            <div className="mb-6">
              <p className={`textSmm font-normal text-text3 mb-2 w-full`}>توضیحات آزمون</p>
              <RichTextEditor defaultValue={quizDescription} setState={quizDescriptionSet} />
            </div>
          )}
          {quizAddIndex == 5 && (
            <div className="mb-6">
              <p className={`textSmm font-normal text-text3 mb-2 w-full`}>اعتبار آزمون</p>
              <RichTextEditor defaultValue={quizValue} setState={quizValueSet} />
            </div>
          )}

          <div className="flex w-fit mr-auto">
            {quizAddIndex === 1 ? null : (
              <CustomButton
                className="!w-fit px-4 ml-2"
                variant="outline"
                type="button"
                onClick={() => quizAddIndexSet((prev) => prev - 1)}
              >
                قبلی
              </CustomButton>
            )}
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              onClick={() => {
                if (quizAddIndex < 5) {
                  quizAddIndexSet((prev) => prev + 1);
                } else {
                  addQuizFunction();
                }
              }}
              disable={
                (quizAddIndex == 1 && (!quizName || !selectedCategory?.value)) ||
                !about ||
                (quizAddIndex == 2 && (!timeToAnswer || !maxTimeToAnswer || !minAge || !maxAge)) ||
                (quizAddIndex == 4 && !quizDescription) ||
                (quizAddIndex == 5 && !quizValue)
              }
            >
              {quizAddIndex == 5 ? 'ثبت' : 'ادامه'}
            </CustomButton>
          </div>
        </div>
      </Modal>
      <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
        <div className="mb-6">
          <CreatedQuiz
            removePoll={removeQuizFunction}
            array={pollList?.polls?.[0] ? pollList?.polls : []}
          />
        </div>
        <AddQuizButton onClick={() => addModalOpenSet(true)} />
      </div>
    </>
  );
};

export default QuizPanel;
