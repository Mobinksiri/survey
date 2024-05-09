'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import CustomButton from '@/app/_components/common/custom/CustomButton';

import CustomInput from '@/app/_components/common/custom/CustomInput';

const TypeSelect = [
  { label: 'EN', value: 1 },
  { label: 'ES', value: 2 },
  { label: 'IJ', value: 3 },
  { label: 'IN', value: 4 },
];

const FormikTest = ({
  title,
  setTitle,

  answers,
  setAnswers,
  handelAddSingelQuiz,
}: {
  title: string;
  setTitle: any;

  setAnswers: any;
  answers: [];
  handelAddSingelQuiz: any;
}) => {
  //local state:

  // const [title, setTitle] = useState<string>('');
  // const [allQuestion, setAllQuestion] = useState<any>([]);
  // const [answers, setAnswers] = useState<any>();

  return (
    <>
      <div className="flex items-center text-text3 mb-5">
        <i className="fa fa-regular fa-memo-circle-check ml-3 text-[18px]" />
        <p className="textMd">آزمون</p>
        <i className="fa fa-solid fa-angle-left mx-4 text-[15px]" />
        <p className="textMd">دسته بندی ها</p>
      </div>
      <div className="lg:bg-white lg:shadow-sidebar rounded-3xl lg:p-6">
        <CustomInput
          parentClassName="my-5"
          type="textArea"
          setState={setTitle}
          state={title}
          label="عنوان سوال:"
        />
        <Formik
          onSubmit={(values) => {
            
            // setAllQuestion([...allQuestion, { title, ...values }]);
            setAnswers(values);
            handelAddSingelQuiz();
          }}
          initialValues={{
            answers: [
              {
                rate: '1',
                title: '',
              },
            ],
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="answers">
                {({ insert, remove, push }) => (
                  <div>
                    {values.answers.length > 0 &&
                      values.answers.map((qusetion, idx) => (
                        <>
                          <div className="border border-gray-300 rounded-2xl p-2 w-full">
                            <div className=" ">
                              <h4 className="mb-3">جواب:{idx + 1}</h4>
                              <Field
                                name={`answers[${idx}].title`}
                                className="w-full border border-gray-500 rounded-2xl px-3 py-2"
                                placeholder="عنوان جواب"
                                type="textarea "
                              />
                            </div>
                            <div>
                              <h4 className="mb-3">تایپ سوال:{idx + 1}</h4>
                              <Field
                                name={`answers[${idx}].rate`}
                                component={'select'}
                                className={'w-full border border-r-gray-300 rounded-2xl p-2 mb-2'}
                                placeholder={'انتخاب کنید'}
                              >
                                {/* <Field name={`answers[${idx}].type`} component={'select'}> */}
                                {TypeSelect.map((e, i) => {
                                  return (
                                    <option className="w-3/4" key={i} value={e.value}>
                                      {e.label}
                                    </option>
                                  );
                                })}
                              </Field>
                            </div>
                            <div className="w-full flex items-end justify-end">
                              <CustomButton
                                variant="primary"
                                className="bg-rose-600 w-1/6 flex justify-end items-end"
                                onClick={() => remove(idx)}
                              >
                                حذف
                              </CustomButton>
                            </div>
                          </div>
                        </>
                      ))}
                    <CustomButton
                      variant="outline"
                      className="mt-5"
                      onClick={() =>
                        push({
                          type: '',
                          content: '',
                        })
                      }
                    >
                      اضافه کردن جواب
                    </CustomButton>
                  </div>
                )}
              </FieldArray>
              <CustomButton className="mt-5" variant="primary" type="submit">
                افزودن
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormikTest;
