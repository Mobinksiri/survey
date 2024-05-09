'use client';
import FormikTest from '@/app/(Routes)/(profile)/panel/azmoon/FormikTest';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const id = useParams();
  const [title, setTitle] = useState<string>('');
  const [allQuestion, setAllQuestion] = useState<any>([]);
  const [answers, setAnswers] = useState<any>();

  const { data: responseData, refetch: quizListRefech } = useApiCall<any>({
    url: `/api/question/${id?.singel}`,
  });

  const handelAddSingelQuiz = () => {
    if (!title) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    apiCall({
      url: '/api/question',
      method: 'post',
      data: {
        title,
        pollId: id.singel,
        type: 1,
        answers: answers.answers,
        // answers:allQuestion&& allQuestion.map((e)=>e)
      }, // Use the FormData object
      // Set this to true
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res) {
          toast.success('سوال با موفقیت ایجاد شد');
          quizListRefech();
          // categoryQuestionListRefech();
          // toast.success(res?.msg);
          // setTitle('');
          // setDescription('');
          // setImage(null);
          // resultSet('');
        }
      },
    });
  };
  const handeDeleteSingelQuestion = (id: any) => {
    apiCall({
      url: `/api/question`,
      method: 'delete',
      data: {
        id,
      },
      // Use the FormData object
      // Set this to true
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res) {
          toast.success('سوال با موفقیت حذف شد');
          quizListRefech();
          // categoryQuestionListRefech();
          // toast.success(res?.msg);
          // setTitle('');
          // setDescription('');
          // setImage(null);
          // resultSet('');
        }
      },
    });
  };
  return (
    <div>
      <FormikTest
        handelAddSingelQuiz={handelAddSingelQuiz}
        title={title}
        setTitle={setTitle}
        // allQuestion={allQuestion}
        // setAllQuestion={setAllQuestion}
        answers={answers}
        setAnswers={setAnswers}
      />
      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6 my-5">
        <p>لیست سوالات</p>
        <div>
          {responseData?.map((e: any, i: number) => {
            return (
              <div key={i} className="border border-yellow rounded-md p-2 my-3">
                <div>
                  <p>{`سوال${i + 1}:`}</p>
                  <span>{e.title}</span>
                  <div className="">
                    <CustomButton
                      className="text-red"
                      variant="outline"
                      onClick={() => {
                        handeDeleteSingelQuestion(e?.id);
                      }}
                    >
                      حذف سوال
                    </CustomButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
