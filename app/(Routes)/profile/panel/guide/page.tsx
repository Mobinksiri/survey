/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import { generateID } from '@/app/_utils/idGenerator';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddModal = ({
  isOpen,
  isOpenSet,
  questionsListSet,
}: {
  isOpen: any;
  isOpenSet: any;
  questionsListSet: any;
}) => {
  const [title, titleSet] = useState<string>('');

  const clearFunction = () => {
    isOpenSet(false);
    titleSet('');
  };

  const imageApiCallFunction = () => {
    if (!title) {
      toast?.error('لطفا همه موارد را وارد کنید.');
      return;
    }
    questionsListSet((prev: any) => [
      ...prev,
      {
        title,
        id: generateID(10),
      },
    ]);
    clearFunction();
  };

  return (
    <Modal isOpen={isOpen} onClick={clearFunction}>
      <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[760px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">افزودن باکس راهنما</h4>

        <div className="flex flex-col gap-4 mb-6">
          <CustomInput label="عنوان باکس" state={title} setState={titleSet} />
        </div>

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
            disable={!title}
          >
            افزودن
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const AddQuestionModal = ({
  isOpen,
  isOpenSet,
  onClick,
}: {
  isOpen: any;
  isOpenSet: any;
  onClick: any;
}) => {
  const [list, listSet] = useState<any>([]);
  const [answer, answerSet] = useState<string>('');
  const [question, questionSet] = useState<string>('');

  useEffect(() => {
    listSet(isOpen?.items ?? []);
  }, [isOpen]);

  const clearFunction = () => {
    isOpenSet(null);
    answerSet('');
    questionSet('');
    listSet([]);
  };

  const addQuestionFunction = () => {
    listSet((prev: any) => [...prev, { question, answer, id: generateID(10) }]);
    answerSet('');
    questionSet('');
  };
  const deleteQuestionFunction = (id: any) => {
    listSet((prev: any) => prev?.filter((item: any) => item?.id !== id));
  };

  return (
    <Modal enableScrollProp isOpen={!!isOpen} onClick={clearFunction}>
      <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[960px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray">{isOpen?.title}</h4>

        <p className="textSm font-bold text-text1 mb-2">موارد اضافه شده:</p>
        <div className="mb-6 max-h-[300px] custom-scrollBar overflow-y-auto p-4 border border-gray-200">
          {list?.length
            ? list?.map((item: any, index: any) => {
                return (
                  <div
                    className="border border-gray-200 p-4 rounded-md flex items-center justify-between mb-2 last:mb-0"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <p className="textSm font-bold text-text1 mb-2">پرسش: {item?.question}</p>
                      <p className="textSmm text-text1">پاسخ: {item?.answer}:</p>
                    </div>
                    <i
                      onClick={() => deleteQuestionFunction(item?.id)}
                      className="fa fa-regular fa-trash text-red p-4 cursor-pointer"
                    />
                  </div>
                );
              })
            : null}
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <CustomInput type="textarea" label="پرسش" state={question} setState={questionSet} />
          <CustomInput type="textarea" label="پاسخ" state={answer} setState={answerSet} />
        </div>

        <div className="mb-4 pb-4 border-b border-b-gray-200">
          <CustomButton
            className="!w-fit px-4 mr-auto"
            variant="primary"
            type="button"
            onClick={addQuestionFunction}
            disable={!question || !answer}
          >
            افزودن سوال
          </CustomButton>
        </div>

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
            onClick={() => {
              onClick(list);
              clearFunction();
            }}
          >
            ذخیره
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const JournalAddArthurSlide = () => {
  // const { data: usersDashboard } = useApiCall<any>({
  //   url: '/api/usersDashboard',
  //   loading: false,
  // });

  const [isOpen, isOpenSet] = useState(false);
  const [questionsIsOpen, questionsIsOpenSet] = useState<any>(null);
  const [questionsList, questionsListSet] = useState<any>([]);

  const { data } = useApiCall<any>({
    url: '/api/getPage/guide',
  });

  useEffect(() => {
    if (data) {
      const pageValue = JSON.parse(data?.page_value);
      questionsListSet(pageValue ?? []);
    }
  }, [data]);

  const handleAddPost = async () => {
    apiCall({
      url: '/api/upsertPage',
      method: 'post',
      data: {
        page_name: 'guide',
        page_value: JSON.stringify(questionsList),
      },
      callback: (res, er) => {
        if (res && res?.message) {
          toast?.success(res?.message);
        }
      },
    });
  };

  const addListFunction = (list: any) => {
    const foundedObjIndex = questionsList?.findIndex(
      (item: any) => item?.id == questionsIsOpen?.id,
    );
    const foundedObj = questionsList?.find((item: any) => item?.id == questionsIsOpen?.id);
    foundedObj.items = list;

    questionsListSet((prev: any) => {
      const updatedList = [...prev];
      updatedList[foundedObjIndex] = foundedObj;
      return updatedList;
    });
    questionsIsOpenSet(null);
  };

  const deleteBoxFunction = (id: any) => {
    questionsListSet((prev: any) => prev?.filter((item: any) => item?.id !== id));
  };

  return (
    <div className="my-6">
      <AddModal questionsListSet={questionsListSet} isOpen={isOpen} isOpenSet={isOpenSet} />
      <AddQuestionModal
        onClick={addListFunction}
        isOpen={questionsIsOpen}
        isOpenSet={questionsIsOpenSet}
      />
      <StepBar array={[{ title: 'دیگر صفحات' }, { title: 'راهنما' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6">
        <CustomButton
          variant="outline"
          type="button"
          onClick={() => isOpenSet(true)}
          className="w-full lg:!w-fit px-4 ml-auto mb-6"
        >
          ایجاد باکس پرسش
        </CustomButton>
        {questionsList?.length
          ? questionsList?.map((item: any, index: any) => {
              return (
                <div
                  className="border border-gray-200 p-4 rounded-md flex items-center justify-between mb-2 last:mb-0"
                  key={index}
                >
                  <div className="flex items-center">
                    <p className="textSm font-bold text-text1 mr-4">
                      {index + 1} - {item?.title}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CustomButton
                      variant="outline"
                      type="button"
                      onClick={() => questionsIsOpenSet(item)}
                      className="w-full lg:!w-fit px-3 ml-4"
                    >
                      افزودن سوال
                    </CustomButton>
                    <i
                      onClick={() => deleteBoxFunction(item?.id)}
                      className="fa fa-regular fa-trash text-red p-2 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })
          : null}

        <CustomButton
          variant="primary"
          type="button"
          onClick={handleAddPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>
    </div>
  );
};

export default JournalAddArthurSlide;
