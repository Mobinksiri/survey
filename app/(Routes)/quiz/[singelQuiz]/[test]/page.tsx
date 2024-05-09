'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import { getTest, setTest } from '@/app/store/test';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import toast from 'react-hot-toast';
import Modal from '@/app/_components/common/modal/Modal';

const Page = () => {
  const { test, singelQuiz } = useParams();

  const { indexOfTest, answers, access } = useSelector(getTest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!access) {
      router?.push(`/quiz/${singelQuiz}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [submitAnswersModal, submitAnswersModalSet] = useState(false);

  const router = useRouter();
  const { data: responseData } = useApiCall<any>({
    url: `/api/questions/${test}`,
    shouldCallApi: !!test,
  });

  let question = responseData?.[indexOfTest - 1];

  const increaseStep = (select: boolean = false) => {
    if (indexOfTest < responseData?.length) {
      if (select) {
        dispatch(setTest({ type: 'INC_STEP' }));
      } else {
        if (question?.require && !answers?.find((item) => item?.questionId === question?.id)) {
          toast.error('یکی از گزینه ها را باید انتخاب نمایید.');
        } else {
          dispatch(setTest({ type: 'INC_STEP' }));
        }
      }
    }
  };
  const decreaseStep = () => {
    if (indexOfTest !== 1) {
      dispatch(setTest({ type: 'DEC_STEP' }));
    }
  };

  const handleSubmitPoll = () => {
    if (question?.require && !answers?.find((item) => item?.questionId === question?.id)) {
      toast.error('یکی از گزینه ها را باید انتخاب نمایید.');
    } else {
      return apiCall({
        url: '/api/takePoll',
        method: 'post',
        data: {
          pollId: Number(test),
          choices: answers,
        },
        callback: (res, er) => {
          if (res && res?.msg) {
            toast?.success(res?.msg);
            submitAnswersModalSet(true);
            dispatch(
              setTest({
                type: 'RESET',
              }),
            );
            router?.push(`/quiz/${singelQuiz}/${test}/result`);
          }
        },
      });
    }
  };

  return (
    <div className="navigation-padding custom-container h-full w-1/2 mx-auto">
      <Modal isOpen={submitAnswersModal} onClick={() => null}>
        <div className="relative bg-white shadow-comment w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[400px] lg:mx-auto h-fit p-6 rounded-xl">
          <div className="flex items-center justify-center border-b border-b-gray-200 mb-4 pb-4">
            <div className="w-7 h-7 ml-2 flex items-center justify-center rounded-md bg-green-500">
              <i className="fa fa-solid fa-check text-white" />
            </div>
            <h3 className="textMd text-text1">آزمون با موفقیت ثبت شد.</h3>
          </div>
          <p className="textSm font-normal text-text3 mb-6">
            نتیجه آزمون بعد از تایید ادمین، در پنل کاربری شما به نمایش در میاید.
          </p>
          <CustomButton onClick={() => router.push('/')} variant="outline">
            بازگشت به صفحه اصلی
          </CustomButton>
        </div>
      </Modal>

      <Question increaseStep={increaseStep} decreaseStep={decreaseStep} data={question} />

      <div className="flex items-center w-fit gap-4 mr-auto">
        <CustomButton
          variant="outline"
          className="!w-fit px-4 !rounded-md"
          onClick={() => {
            if (indexOfTest === 1) {
              router.push(`/quiz/${singelQuiz}`);
            } else {
              decreaseStep();
            }
          }}
        >
          <div className="flex items-center gap-2">
            <i className="fa fa-solid fa-chevron-right text-[12px]" />
            قبلی
          </div>
        </CustomButton>
        {indexOfTest === responseData?.length ? (
          <CustomButton
            variant="primary"
            className="!w-fit px-4 !rounded-md"
            primaryButtonStyle="!bg-[#1BBC9C]"
            primaryButtonHoverStyle="#2bad93BBC9C]"
            onClick={handleSubmitPoll}
          >
            اتمام آزمون
          </CustomButton>
        ) : (
          <CustomButton
            variant="outline"
            className="!w-fit px-4 !rounded-md"
            onClick={() => increaseStep()}
          >
            <div className="flex items-center gap-2">
              بعدی
              <i className="fa fa-solid fa-chevron-left text-[12px]" />
            </div>
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Page;
