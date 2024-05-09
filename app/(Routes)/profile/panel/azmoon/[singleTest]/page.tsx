'use client';

import Toggle from '@/app/_components/common/Toggle';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import Collapse from '@kunukn/react-collapse';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Rating } from 'react-simple-star-rating';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Link from 'next/link';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import { DEFAULT_ERROR } from '@/app/_toast_messages';

interface typeProp {
  [key: string]: {
    value: string | null | { value: any; label: any };
    active: boolean;
  };
}

interface choicesProp {
  id: string;
  question: null | string;
  typesShowArray: typeProp;
}

const quizTypes = [
  {
    label: 'چند گزینه‌ای',
    type: 1,
    color: '#f4bbe1',
    icon: 'list-check',
  },
  {
    label: 'لیست کشویی',
    type: 2,
    color: '#bfeded',
    icon: 'list-dropdown',
  },
  {
    label: 'طیفی',
    type: 3,
    color: '#A0E4FF',
    icon: 'scale-balanced',
  },
  {
    label: 'درجه‌بندی',
    type: 4,
    color: '#f8e393',
    icon: 'star',
  },
  {
    label: 'متنی',
    type: 5,
    color: '#bbc5f9',
    icon: 'text',
  },
];

const quizAnswerTypes = [
  {
    type: 'mbti',
    id: 'mbtiRate',
  },
  {
    type: 'انیاگرام',
    id: 'aniagramRate',
  },
  {
    type: 'غرایز انیاگرام',
    id: 'aniagraminstinctRate',
  },
  {
    type: 'مزاج',
    id: 'tempermentRate',
  },
  {
    type: 'ضریب',
    id: 'simpleRate',
  },
];

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const multiQuestionDefault = (id: string) => {
  return {
    id: id,
    question: null,
    typesShowArray: {
      mbtiRate: {
        value: null,
        active: false,
      },
      aniagramRate: {
        value: null,
        active: false,
      },
      aniagraminstinctRate: {
        value: null,
        active: false,
      },
      tempermentRate: {
        value: null,
        active: false,
      },
      simpleRate: {
        value: null,
        active: false,
      },
    },
  };
};

const DraggableQuestion = ({
  index,
  label,
  type,
  onEdit,
  onRemove,
  order,
}: // moveQuestion,
{
  index: number;
  label: string;
  type: number;
  onEdit: any;
  onRemove: any;
  order: string;
  // moveQuestion: any;
}) => {
  // const [{ isDragging }, drag] = useDrag({
  //   type: 'QUESTION',
  //   item: { index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const [, drop] = useDrop({
  //   accept: 'QUESTION',
  //   hover: (draggedItem: { index: number }) => {
  //     if (draggedItem.index !== index) {
  //       moveQuestion(draggedItem.index, index);
  //       draggedItem.index = index;
  //     }
  //   },
  // });

  return (
    <div
      // ref={(node) => drag(drop(node))}
      className={`cursor-grab w-full mb-2 last:mb-0 py-2 px-3 flex items-center justify-between border border-gray-200 hover:bg-gray-50 transition-all rounded-lg  ${
        false ? 'opacity-50' : ''
      }`}
      key={index}
    >
      <div
        onClick={onEdit}
        className={`w-fit rounded-lg cursor-pointer transition-all flex items-center`}
      >
        <div
          style={{ backgroundColor: quizTypes[type - 1]?.color }}
          className={`w-11 px-1 h-6 flex items-center justify-around rounded-md bg-[${
            quizTypes[type - 1]?.color
          }] ml-2`}
        >
          <i className={`fa fa-regular text-text1 textSmm fa-${quizTypes[type - 1]?.icon}`} />
          <span className="textSmm font-normal text-text1">{order}</span>
        </div>
        <p className="textSmm text-text1 line-clamp-1">{label}</p>
      </div>
      <div
        onClick={onRemove}
        className="w-8 h-8 rounded-lg hover:bg-gray-100 transition-all flex items-center cursor-pointer justify-center z-[2]"
      >
        <i className="fa fa-regular fa-trash text-red" />
      </div>
    </div>
  );
};

const Page = () => {
  const { singleTest } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const { data: singlePoll } = useApiCall<any>({
    url: `/api/poll/${singleTest}`,
    shouldCallApi: !!singleTest,
  });
  const { data: questionsList, refetch: questionsListRefetch } = useApiCall<any>({
    url: `/api/questions/${singleTest}`,
    shouldCallApi: !!singleTest,
  });

  const { data: mbti } = useApiCall<any>({
    url: '/api/mbti',
  });
  const { data: aniagram } = useApiCall<any>({
    url: '/api/aniagram',
  });
  const { data: aniagramInstinct } = useApiCall<any>({
    url: '/api/aniagramInstinct',
  });
  const { data: temperment } = useApiCall<any>({
    url: '/api/temperment',
  });

  const addModalByTypeOpen = (type: number, action: string, id?: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('action', action);
    current.set('type', type?.toString());

    if (id) current.set('id', id?.toString());

    if (action === 'edit' && id) {
      const questionToEdit = questionsList.find((item: any) => item.id === id);
      if (questionToEdit) {
        setSelectedQuestion(questionToEdit);
      } else {
        setSelectedQuestion(null);
        return;
      }
    } else {
      setSelectedQuestion(null);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (
      searchParams?.get('action') == 'edit' &&
      searchParams?.get('type') &&
      searchParams?.get('id') &&
      questionsList &&
      questionsList?.[0]
    ) {
      const id = searchParams?.get('id');
      const questionToEdit = questionsList.find((item: any) => item.id === Number(id));
      if (questionToEdit) {
        setSelectedQuestion(questionToEdit);
      } else {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('action', 'add');
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }
    } else {
      setSelectedQuestion(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const foundedItem = quizTypes?.find((item) => item?.type === Number(searchParams?.get('type')));

  useEffect(() => {
    if (!foundedItem) {
      router?.push(pathname);
    }
  }, [foundedItem, pathname, router]);

  const [questionTitle, questionTitleSet] = useState<string | null>(null);
  const [descriptionToggle, descriptionToggleSet] = useState(false);
  const [description, descriptionSet] = useState<string | null>(null);
  const [requiredQuestion, requiredQuestionSet] = useState(false);
  const [duplicateErrors, setDuplicateErrors] = useState<{ [key: string]: string }>({});
  const [textShow, textShowSet] = useState<null | string>(null);
  const [multiQuestion, multiQuestionSet] = useState<choicesProp[]>([
    multiQuestionDefault(generateUniqueId()),
  ]);
  const [rangeValue, setRangeValue] = useState(3);
  const [selectedOrder, selectedOrderSet] = useState(null);

  useEffect(() => {
    if (selectedQuestion) {
      questionTitleSet(selectedQuestion?.title);
      descriptionToggleSet(!!selectedQuestion?.description);
      if (selectedQuestion?.description) {
        descriptionSet(selectedQuestion.description);
      }
      requiredQuestionSet(selectedQuestion?.require);
      if (selectedQuestion?.answers) {
        if (mbti && aniagram && aniagramInstinct && temperment) {
          multiQuestionSet(
            selectedQuestion?.answers?.map((item: any) => {
              const foundedMbti = mbti?.find((i: any) => i?.id === item?.mbtiRate);
              const foundedAniagram = aniagram?.find((i: any) => i?.id === item?.aniagramRate);
              const foundedAniagramInstinct = aniagramInstinct?.find(
                (i: any) => i?.id === item?.aniagraminstinctRate,
              );
              const foundedTemperment = temperment?.find(
                (i: any) => i?.id === item?.tempermentRate,
              );

              return {
                question: item?.choiceTitle,
                id: item?.id,
                typesShowArray: {
                  mbtiRate: {
                    value: foundedMbti
                      ? { value: foundedMbti?.value, label: foundedMbti?.name }
                      : null,
                    active: !!item?.mbtiRate,
                  },
                  aniagramRate: {
                    value: foundedAniagram
                      ? { value: foundedAniagram?.value, label: foundedAniagram?.name }
                      : null,
                    active: !!item?.aniagramRate,
                  },
                  aniagraminstinctRate: {
                    value: foundedAniagramInstinct
                      ? {
                          value: foundedAniagramInstinct?.value,
                          label: foundedAniagramInstinct?.name,
                        }
                      : null,
                    active: !!item?.aniagraminstinctRate,
                  },
                  tempermentRate: {
                    value: foundedTemperment
                      ? { value: foundedTemperment?.value, label: foundedTemperment?.name }
                      : null,
                    active: !!item?.tempermentRate,
                  },
                  simpleRate: {
                    value: item?.simpleRate ?? null,
                    active: !!item?.simpleRate,
                  },
                },
              };
            }),
          );
        }
      }
      if (selectedQuestion?.scale) {
        setRangeValue(selectedQuestion?.scale);
      }
      if (selectedQuestion?.rate) {
        setRangeValue(selectedQuestion?.rate);
      }
      if (selectedQuestion?.order) {
        selectedOrderSet(selectedQuestion?.order);
      }
    }
  }, [aniagram, aniagramInstinct, mbti, selectedQuestion, temperment]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  const checkDuplicate = (value: string, id: string) => {
    const trimmedValue = value.trim();
    const duplicateIds = multiQuestion
      .filter((item) => item.question?.trim() === trimmedValue && item.id !== id)
      .map((item) => item.id);
    return duplicateIds;
  };

  const changeQuestionInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.value;

    setDuplicateErrors((prev) => {
      const trimmedValue = value.trim();
      const duplicateIds = checkDuplicate(trimmedValue, id);
      return {
        ...prev,
        [id]: duplicateIds.length > 0 ? 'پاسخ نمیتواند تکراری باشد.' : '',
      };
    });

    multiQuestionSet((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, question: value };
        }
        return item;
      });
    });
  };

  const changeQuestionTypes = (id: string, property: string, value: string) => {
    multiQuestionSet((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, [property]: value };
        }
        return item;
      });
    });
  };

  const addToMultiQuestion = () => {
    if (foundedItem?.type === 1) {
      let count = 6;
      if (multiQuestion?.length < count) {
        multiQuestionSet((prev) => [...prev, multiQuestionDefault(generateUniqueId())]);
      } else {
        toast.error(`تعداد گزینه ها نباید بیشتر از ${count} باشد.`);
      }
    }
    if (foundedItem?.type === 2) {
      let count = 10;
      if (multiQuestion?.length < count) {
        multiQuestionSet((prev) => [...prev, multiQuestionDefault(generateUniqueId())]);
      } else {
        toast.error(`تعداد گزینه ها نباید بیشتر از ${count} باشد.`);
      }
    }
  };
  const deleteMultiQuestion = (idToDelete: string) => {
    if (multiQuestion?.length !== 1) {
      const hasDuplicateError = !!duplicateErrors[idToDelete];

      multiQuestionSet((prev) => prev.filter((item) => item.id !== idToDelete));

      if (hasDuplicateError) {
        clearDuplicateError(idToDelete);
      }
    }
  };

  const clearDuplicateError = (id: string) => {
    setDuplicateErrors((prev) => {
      const { [id]: deletedError, ...rest } = prev;
      return rest;
    });
  };

  const clearDataWhenModalClose = (message?: string) => {
    questionTitleSet(null);
    descriptionToggleSet(false);
    descriptionSet(null);
    requiredQuestionSet(false);
    multiQuestionSet([multiQuestionDefault(generateUniqueId())]);
    setDuplicateErrors({});
    setRangeValue(3);
    setSelectedQuestion(null);
    viewSet('desktop');
    selectedOrderSet(null);
    if (message) toast.success(message);
    router.push(pathname);
  };

  const addQuestion = () => {
    if (!questionTitle) {
      toast.error('عنوان سوال را وارد نمایید.');
      return;
    }
    if (descriptionToggle && !description) {
      toast.error('توضیحات را وارد کنید.');
      return;
    }
    if (foundedItem?.type === 1 && multiQuestion?.length < 2) {
      toast.error('سوال حداقل باید دو جوابی باشد.');
      return;
    }

    if (foundedItem?.type === 1 || foundedItem?.type === 2) {
      const hasErrors =
        Object.values(duplicateErrors).some((error) => error) ||
        multiQuestion.some((item) => !item.question);

      if (hasErrors) {
        if (Object.values(duplicateErrors).some((error) => error)) {
          toast.error('پاسخ نمیتواند تکراری باشد.');
          return;
        }
        if (multiQuestion.some((item) => !item.question)) {
          toast.error('پاسخ نمیتواند خالی باشد.');
          return;
        }
      }
    }

    // api call conditions ---
    const method = searchParams.get('action') === 'edit' ? 'put' : 'post';
    let order;

    if (method === 'post') {
      if (!questionsList?.[0]) {
        order = 1;
      } else {
        order = questionsList?.[questionsList?.length - 1]?.order + 1;
      }
    }
    if (method === 'put') {
      order = selectedOrder;
    }

    const commonData = {
      title: questionTitle,
      require: requiredQuestion,
      order: order,
      pollId: Number(singleTest),
      description: descriptionToggle ? description : null,
      type: foundedItem?.type,
    };

    let typeSpecificData;

    switch (foundedItem?.type) {
      case 1:
      case 2:
        typeSpecificData = {
          choices: multiQuestion?.map((item) => ({
            title: item?.question,
            rate: null,
            pollId: Number(singleTest),
            ...(method === 'put'
              ? { id: item?.id && typeof item?.id === 'number' ? item?.id : null }
              : {}),
            mbtiRate:
              (item?.typesShowArray?.mbtiRate?.value &&
                (item?.typesShowArray?.mbtiRate?.value as { value: any; label: any })?.value) ??
              null,
            aniagramRate:
              (item?.typesShowArray?.aniagramRate?.value &&
                (item?.typesShowArray?.aniagramRate?.value as { value: any; label: any })?.value) ??
              null,
            aniagraminstinctRate:
              (item?.typesShowArray?.aniagraminstinctRate?.value &&
                (item?.typesShowArray?.aniagraminstinctRate?.value as { value: any; label: any })
                  ?.value) ??
              null,
            tempermentRate:
              (item?.typesShowArray?.tempermentRate?.value &&
                (item?.typesShowArray?.tempermentRate?.value as { value: any; label: any })
                  ?.value) ??
              null,
            simpleRate: item?.typesShowArray?.simpleRate?.value ?? null,
          })),
        };
        break;

      case 3:
        typeSpecificData = {
          scale: rangeValue,
        };
        break;

      case 4:
        typeSpecificData = {
          rate: rangeValue,
        };
        break;

      case 5:
        break;

      default:
        toast?.error(DEFAULT_ERROR);
        break;
    }

    const requestData = { ...commonData, ...typeSpecificData };

    apiCall({
      url: '/api/question',
      method: method,
      data: {
        ...requestData,
        ...(searchParams.get('action') === 'edit' && selectedQuestion
          ? { id: Number(searchParams.get('id')) }
          : {}),
      },
      callback: (res, er) => {
        if (res) {
          clearDataWhenModalClose(res);
          questionsListRefetch();
          return;
        }
        if (er) {
          toast?.error(DEFAULT_ERROR);
        }
      },
    });
  };

  const removeQuestion = (id: number) => {
    apiCall({
      url: `/api/question/${id}`,
      method: 'delete',
      callback: (res, er) => {
        if (res) {
          questionsListRefetch();
          if (res && res?.message) toast.success('سوال با موفقیت حذف شد.');
        }
        if (er) {
          toast?.error(DEFAULT_ERROR);
        }
      },
    });
  };

  // const moveQuestion = (fromIndex: number, toIndex: number) => {
  //   const updatedQuestions = [...questionsList];
  //   const [movedItem] = updatedQuestions.splice(fromIndex, 1);
  //   updatedQuestions.splice(toIndex, 0, movedItem);

  //   updatedQuestions.forEach((item, index) => {
  //     item.order = index + 1;
  //   });

  //   questionsListSet(updatedQuestions);
  // };

  const [openQuestionOptionsInMobile, openQuestionOptionsInMobileSet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        openQuestionOptionsInMobileSet(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // view options ------------------
  const [view, viewSet] = useState<'desktop' | 'mobile'>('desktop');
  const changeViewFunction = (data: 'desktop' | 'mobile') => {
    viewSet(data);
  };
  // -------------------------------

  if (!singlePoll) {
    return <p className="textSm font-bold text-text1">آزمون مورد نظر پیدا نشد.</p>;
  }

  const addActiveTypeFunction = (questionId: string, typeId: string) => {
    const foundChoice = multiQuestion?.find((m) => m.id === questionId) as choicesProp;
    const foundTypeObj = foundChoice?.typesShowArray?.[typeId] as {
      value: string | null;
      active: boolean;
    };
    multiQuestionSet((prev) => {
      const foundItemIndex = prev?.findIndex((item) => item?.id === questionId);
      if (foundItemIndex > -1) {
        return [
          ...prev.slice(0, foundItemIndex),
          {
            ...prev[foundItemIndex],
            typesShowArray: {
              ...prev[foundItemIndex]?.typesShowArray,
              [typeId]: {
                value: foundTypeObj?.value,
                active: !foundTypeObj?.active,
              },
            },
          },
          ...prev.slice(foundItemIndex + 1),
        ];
      }
      return prev;
    });
  };

  const changeValueOfTypeInQuestionFunction = (questionId: string, typeId: string, value: any) => {
    const foundChoice = multiQuestion?.find((m) => m.id === questionId) as choicesProp;
    const foundTypeObj = foundChoice?.typesShowArray?.[typeId] as {
      value: string | null;
      active: boolean;
    };
    multiQuestionSet((prev) => {
      const foundItemIndex = prev?.findIndex((item) => item?.id === questionId);
      if (foundItemIndex > -1) {
        return [
          ...prev.slice(0, foundItemIndex),
          {
            ...prev[foundItemIndex],
            typesShowArray: {
              ...prev[foundItemIndex]?.typesShowArray,
              [typeId]: {
                value: value,
                active: foundTypeObj?.active,
              },
            },
          },
          ...prev.slice(foundItemIndex + 1),
        ];
      }
      return prev;
    });
  };

  const getValueOfTypeInQuestionFunction = (questionId: string, typeId: string) => {
    const foundChoice = multiQuestion?.find((m) => m.id === questionId) as choicesProp;
    const foundTypeObj = foundChoice?.typesShowArray?.[typeId] as {
      value: string | null;
      active: boolean;
    };
    return foundTypeObj?.value;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full rounded-lg bg-white border border-gray-100">
        <Modal
          isOpen={!!searchParams.get('type')}
          enableScrollProp
          onClick={() => {
            clearDataWhenModalClose();
          }}
        >
          <div className="relative grid grid-cols-20 bg-white shadow-comment w-screen lg:w-[calc(100vw-75px)] h-screen lg:h-[calc(100vh-75px)] lg:mx-auto lg:rounded-xl overflow-hidden">
            {/* right side */}
            <div className="h-screen lg:h-[calc(100vh-75px)] border-l border-l-gray-100 flex flex-col justify-between col-span-20 lg:col-span-6">
              {/* header */}
              <div className="flex items-center px-6 py-4 border-b border-b-gray-100">
                <i
                  onClick={() => {
                    clearDataWhenModalClose();
                  }}
                  className="cursor-pointer fa fa-regular fa-close text-[20px]"
                />
                <div className={`mr-4 w-fit bg-white rounded-lg flex items-center mb-2 last:mb-0`}>
                  <div
                    style={{ backgroundColor: foundedItem?.color }}
                    className={`w-10 px-1 h-6 flex items-center justify-around rounded-md ml-2`}
                  >
                    <i className={`fa fa-regular text-text1 textSmm fa-${foundedItem?.icon}`} />
                    <span className="">{selectedQuestion?.order ?? questionsList?.length + 1}</span>
                  </div>
                  <h3 className="textSm font-bold text-text1">{foundedItem?.label}</h3>
                </div>
              </div>

              {/* forms */}
              <div className="px-5 py-4 h-[calc(100%-132px)] overflow-auto">
                <div className="pb-2 border-b border-b-gray-100">
                  <CustomInput
                    label="سوال"
                    type="textarea"
                    state={questionTitle}
                    setState={questionTitleSet}
                    paragraphClassName="!text-text1"
                  />
                </div>
                <div className="py-2 border-b border-b-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="textSmm text-text1 font-normal">توضیحات</p>
                    <Toggle state={descriptionToggle} setState={descriptionToggleSet} />
                  </div>
                  <Collapse isOpen={descriptionToggle} transition="height 0.2s">
                    <CustomInput
                      parentClassName="mt-2"
                      type="textarea"
                      state={description}
                      setState={descriptionSet}
                    />
                  </Collapse>
                </div>

                {foundedItem?.type == 1 || foundedItem?.type == 2 ? (
                  <div className="py-4 w-full border-b border-b-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <p className="textSmm text-text1 font-normal">گزینه ها</p>
                      <div
                        onClick={addToMultiQuestion}
                        className="w-8 transition-all h-8 border rounded-md border-gray-100 bg-gray-100 flex cursor-pointer hover:bg-gray-200 items-center justify-center"
                      >
                        <i className="fa fa-solid text-[13px] fa-plus" />
                      </div>
                    </div>
                    {multiQuestion?.map((item, index) => {
                      const hasError = duplicateErrors[item.id];
                      const foundChoice = multiQuestion?.find((m) => m.id === item?.id);

                      return (
                        <div key={index} className="mb-2 last:mb-0">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex justify-between w-full gap-2">
                              <input
                                value={item?.question ?? ''}
                                onChange={(e) => changeQuestionInput(e, item?.id)}
                                className={`border h-8 text-[11px] text-text1 font-normal px-2 w-[calc(100%-40px)] rounded-md ${
                                  hasError ? 'border-red' : 'border-gray-200'
                                } outline-none`}
                              />
                              <div className="w-8 h-8 border rounded-md border-gray-100 bg-gray-100 flex">
                                <div
                                  onClick={() => deleteMultiQuestion(item.id)}
                                  className="w-full transition-all cursor-pointer hover:bg-gray-200 h-full flex items-center justify-center"
                                >
                                  <i className="fa fa-solid text-[13px] fa-close" />
                                </div>
                              </div>
                            </div>
                            {hasError && (
                              <p className="text-red text-[10px] font-normal mt-1">{hasError}</p>
                            )}
                            <p className="textSmm mb-2 text-text1 font-medium mt-4">
                              تایپ گزینه ها
                            </p>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md overflow-hidden">
                              {quizAnswerTypes?.map((i, index) => {
                                const foundTypeObj = foundChoice?.typesShowArray?.[i?.id];

                                return (
                                  <p
                                    className={`textXs font-bold text-text1 py-2.5 transition-all whitespace-nowrap w-full px-3 text-center cursor-pointer ${
                                      foundTypeObj?.active ? 'bg-gray-300' : 'hover:bg-gray-200'
                                    }`}
                                    onClick={() => addActiveTypeFunction(item?.id, i?.id)}
                                    key={index}
                                  >
                                    {i?.type}
                                  </p>
                                );
                              })}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4">
                              {Object?.entries(foundChoice?.typesShowArray as typeProp).map(
                                ([k, v]) => {
                                  return Object?.entries(v).map(([key, value]) => {
                                    if (key === 'active' && value) {
                                      if (k === quizAnswerTypes?.[0]?.id) {
                                        return (
                                          <div key={k}>
                                            <div className="flex items-center justify-between">
                                              <p className={`textSmm font-normal text-text3 mb-2`}>
                                                mbti:
                                              </p>
                                              <p
                                                className={`textXs font-normal text-text3 mb-2 cursor-pointer hover:text-text1 transition-all`}
                                                onClick={() =>
                                                  changeValueOfTypeInQuestionFunction(
                                                    item?.id,
                                                    k,
                                                    null,
                                                  )
                                                }
                                              >
                                                پاک کردن
                                              </p>
                                            </div>
                                            <CustomSelect
                                              options={
                                                (mbti?.length &&
                                                  mbti?.map((m: any) => ({
                                                    value: m.id,
                                                    label: m.name,
                                                  }))) ??
                                                []
                                              }
                                              placeholder={`متن ورودی`}
                                              value={getValueOfTypeInQuestionFunction(item?.id, k)}
                                              onChange={(e: any) =>
                                                changeValueOfTypeInQuestionFunction(item?.id, k, e)
                                              }
                                              menuPlacement="top"
                                            />
                                          </div>
                                        );
                                      }
                                      if (k === quizAnswerTypes?.[1]?.id) {
                                        return (
                                          <div key={k}>
                                            <div className="flex items-center justify-between">
                                              <p className={`textSmm font-normal text-text3 mb-2`}>
                                                انیاگرام:
                                              </p>
                                              <p
                                                className={`textXs font-normal text-text3 mb-2 cursor-pointer hover:text-text1 transition-all`}
                                                onClick={() =>
                                                  changeValueOfTypeInQuestionFunction(
                                                    item?.id,
                                                    k,
                                                    null,
                                                  )
                                                }
                                              >
                                                پاک کردن
                                              </p>
                                            </div>
                                            <CustomSelect
                                              options={
                                                (aniagram?.length &&
                                                  aniagram?.map((m: any) => ({
                                                    value: m.id,
                                                    label: m.name,
                                                  }))) ??
                                                []
                                              }
                                              placeholder={`متن ورودی`}
                                              value={getValueOfTypeInQuestionFunction(item?.id, k)}
                                              onChange={(e: any) =>
                                                changeValueOfTypeInQuestionFunction(item?.id, k, e)
                                              }
                                              menuPlacement="top"
                                            />
                                          </div>
                                        );
                                      }
                                      if (k === quizAnswerTypes?.[2]?.id) {
                                        return (
                                          <div key={k}>
                                            <div className="flex items-center justify-between">
                                              <p className={`textSmm font-normal text-text3 mb-2`}>
                                                غرایز انیاگرام:
                                              </p>
                                              <p
                                                className={`textXs font-normal text-text3 mb-2 cursor-pointer hover:text-text1 transition-all`}
                                                onClick={() =>
                                                  changeValueOfTypeInQuestionFunction(
                                                    item?.id,
                                                    k,
                                                    null,
                                                  )
                                                }
                                              >
                                                پاک کردن
                                              </p>
                                            </div>
                                            <CustomSelect
                                              options={
                                                (aniagramInstinct?.length &&
                                                  aniagramInstinct?.map((m: any) => ({
                                                    value: m.id,
                                                    label: m.name,
                                                  }))) ??
                                                []
                                              }
                                              placeholder={`متن ورودی`}
                                              value={getValueOfTypeInQuestionFunction(item?.id, k)}
                                              onChange={(e: any) =>
                                                changeValueOfTypeInQuestionFunction(item?.id, k, e)
                                              }
                                              menuPlacement="top"
                                            />
                                          </div>
                                        );
                                      }
                                      if (k === quizAnswerTypes?.[3]?.id) {
                                        return (
                                          <div key={k}>
                                            <div className="flex items-center justify-between">
                                              <p className={`textSmm font-normal text-text3 mb-2`}>
                                                مزاج:
                                              </p>
                                              <p
                                                className={`textXs font-normal text-text3 mb-2 cursor-pointer hover:text-text1 transition-all`}
                                                onClick={() =>
                                                  changeValueOfTypeInQuestionFunction(
                                                    item?.id,
                                                    k,
                                                    null,
                                                  )
                                                }
                                              >
                                                پاک کردن
                                              </p>
                                            </div>
                                            <CustomSelect
                                              options={
                                                (temperment?.length &&
                                                  temperment?.map((m: any) => ({
                                                    value: m.id,
                                                    label: m.name,
                                                  }))) ??
                                                []
                                              }
                                              placeholder={`متن ورودی`}
                                              value={getValueOfTypeInQuestionFunction(item?.id, k)}
                                              onChange={(e: any) =>
                                                changeValueOfTypeInQuestionFunction(item?.id, k, e)
                                              }
                                              menuPlacement="top"
                                            />
                                          </div>
                                        );
                                      }
                                      if (k === quizAnswerTypes?.[4]?.id) {
                                        return (
                                          <div key={k}>
                                            <CustomInput
                                              label=" ضریب:"
                                              state={getValueOfTypeInQuestionFunction(item?.id, k)}
                                              type="number"
                                              placeholder="متن ورودی"
                                              props={{
                                                onChange: (
                                                  e: ChangeEvent<
                                                    HTMLInputElement | HTMLTextAreaElement
                                                  >,
                                                ) => {
                                                  changeValueOfTypeInQuestionFunction(
                                                    item?.id,
                                                    k,
                                                    e?.target?.value,
                                                  );
                                                },
                                              }}
                                            />
                                          </div>
                                        );
                                      }
                                    }
                                  });
                                },
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {foundedItem?.type == 3 || foundedItem?.type == 4 ? (
                  <div className="py-4 w-full border-b border-b-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="textSmm mb-2 text-text1 font-normal">
                        {foundedItem?.type === 3 ? 'تنظیم طیف' : 'تنظیم درجه'}
                      </p>
                      <p className="textSmm mb-2 text-text1 font-normal">{rangeValue}</p>
                    </div>
                    <input
                      className="w-full custom-slider"
                      type="range"
                      id="rangeInput"
                      name="rangeInput"
                      min={foundedItem?.type === 3 ? 3 : 5}
                      max={foundedItem?.type === 3 ? 11 : 10}
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                  </div>
                ) : null}

                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <p className="textSmm text-text1 font-normal">پاسخ به سوال اجباری باشد</p>
                    <Toggle state={requiredQuestion} setState={requiredQuestionSet} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end w-full p-3 border-t border-t-gray-100">
                <CustomButton
                  className="!w-[60px] h-[30px] ml-2 rounded-md textSmm text-text1 font-normal"
                  variant="outline"
                  onClick={() => {
                    clearDataWhenModalClose();
                  }}
                >
                  انصراف
                </CustomButton>
                <CustomButton
                  onClick={addQuestion}
                  className="!w-[60px] h-[30px] rounded-md textSmm text-text1 font-normal"
                  variant="primary"
                >
                  ذخیره
                </CustomButton>
              </div>
            </div>

            {/* left side (preview) */}
            <div
              className={`hidden lg:block col-span-14 bg-gray-100 relative m-auto ${
                view === 'mobile'
                  ? 'w-[375px] h-[667px] rounded-lg border-2 border-gray-200 pt-20 overflow-auto'
                  : 'w-full h-full rounded-none border-2 border-transparent'
              } transition-all ${view == 'mobile' ? 'p-6' : 'px-10'}`}
            >
              <div className="flex items-center absolute bg-white top-4 rounded-lg left-1/2 -translate-x-1/2 w-fit overflow-hidden">
                <i
                  onClick={() => changeViewFunction('desktop')}
                  className={`fa fa-regular px-2 py-1 text-[20px] cursor-pointer hover:bg-gray-200 transition-all fa-desktop ${
                    view == 'desktop' ? 'text-green1' : ''
                  }`}
                />
                <i
                  onClick={() => changeViewFunction('mobile')}
                  className={`fa fa-regular px-2 py-1 text-[20px] cursor-pointer hover:bg-gray-200 transition-all fa-mobile ${
                    view == 'mobile' ? 'text-green1' : ''
                  }`}
                />
              </div>
              <div className={`w-full h-full flex items-center`}>
                <div className="w-full">
                  {questionTitle ? (
                    <p className="textSm font-bold text-text1 mb-2">
                      {requiredQuestion ? <span className="text-red"> * </span> : null}
                      {questionsList?.length + 1}_ {questionTitle}
                    </p>
                  ) : null}
                  {descriptionToggle && description ? (
                    <p className="textSmm font-normal text-text3 mb-4">{description}</p>
                  ) : null}

                  {foundedItem?.type === 1 ? (
                    <div
                      className={`grid gap-2 ${
                        view == 'mobile' ? 'grid-cols-1' : 'grid-cols-4'
                      } transition-all`}
                    >
                      {multiQuestion?.map((item, index) => {
                        if (item?.question) {
                          return (
                            <p
                              key={index}
                              className="py-1 px-1 pl-2 bg-gray-300 border rounded-md border-gray-400 textSmm font-normal text-text1 mb-2"
                            >
                              <span className="inline-block w-5 h-5 rounded-md ml-2 text-center bg-text1 text-white">
                                {index + 1}
                              </span>
                              <span>{item?.question}</span>
                            </p>
                          );
                        }
                      })}
                    </div>
                  ) : null}
                  {foundedItem?.type === 2 ? (
                    <div className="flex items-center gap-2">
                      {multiQuestion?.length && (
                        <CustomSelect
                          className={`${view == 'mobile' ? 'w-full' : 'w-[380px]'}`}
                          maxHeight="200px"
                          options={
                            multiQuestion?.some((item) => item?.question)
                              ? multiQuestion?.map((item) => ({
                                  label: item?.question,
                                  value: item?.id,
                                }))
                              : []
                          }
                          placeholder="پاسخ خود را انتخاب یا جستجو نمایید."
                        />
                      )}
                    </div>
                  ) : null}
                  {foundedItem?.type === 3 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center w-[380px] h-[40px] rounded-xl overflow-hidden">
                        {Array.from(Array(rangeValue).keys())?.map((item, index) => {
                          const displayedValue = item + 1;
                          return (
                            <div
                              key={index}
                              className="bg-[#333] flex items-center justify-center hover:bg-[#222] transition-all cursor-pointer w-full h-full text-white textSmm"
                            >
                              {displayedValue}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {foundedItem?.type === 4 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center w-[380px] h-[40px] rounded-xl overflow-hidden">
                        <Rating SVGclassName="inline w-8 h-8" transition iconsCount={rangeValue} />
                      </div>
                    </div>
                  ) : null}
                  {foundedItem?.type === 5 ? (
                    <div className="">
                      <p className="text-[12px] text-text3 font-normal mb-2">
                        می‌توانید با SHIFT+ENTER به خط بعد بروید.
                      </p>
                      <CustomInput
                        type="textarea"
                        state={textShow}
                        setState={textShowSet}
                        paragraphClassName="!text-text1"
                        parentClassName="!w-[300px]"
                        inputClassName="!bg-transparent"
                        placeholder="محل درج پاسخ"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* header */}
        <div className="flex items-center p-4 border-b border-b-gray-100 justify-between w-full">
          <div className="flex items-center">
            <Link
              href="/profile/panel/azmoon"
              className="w-8 h-8 ml-2 hover:bg-gray-50 flex items-center justify-center transition-all rounded-lg cursor-pointer"
            >
              <i className="fa fa-regular fa-arrow-right text-text1" />
            </Link>

            <div className="flex items-center">
              <Link
                href="/profile/panel/azmoon"
                className="textSmm text-text3 font-normal rounded-lg"
              >
                آزمون های من
              </Link>
              <span className="mx-2 text-text1">/</span>
              <span className="textSmm text-text1">{singlePoll?.poll?.title}</span>
            </div>
          </div>
        </div>

        {/* grid division */}
        <div className="grid grid-cols-12 gap-4">
          {/* right side */}
          <div
            className={`lg:block lg:col-span-3 lg:border-l border-l-gray-100  lg:bg-gray-100 ${
              openQuestionOptionsInMobile
                ? 'fixed top-0 left-0 w-screen h-screen bg-white z-[16] p-6'
                : 'hidden p-4'
            }`}
          >
            {/* mobile elements */}
            {openQuestionOptionsInMobile ? (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-b-gray-200">
                <h4 className="textMd text-text1 font-bold">افزودن سوال</h4>
                <i
                  onClick={() => openQuestionOptionsInMobileSet(false)}
                  className="fa fa-solid fa-close text-[20px]"
                />
              </div>
            ) : null}

            {/* multi choice */}
            {quizTypes?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    addModalByTypeOpen(item?.type, 'add');
                    openQuestionOptionsInMobileSet(false);
                  }}
                  key={index}
                  className={`w-full bg-white p-2 rounded-lg hover:shadow-articlePost cursor-pointer transition-all flex items-center mb-2 last:mb-0`}
                >
                  <div
                    style={{ backgroundColor: item?.color }}
                    className={`w-8 h-8 flex items-center justify-center rounded-md bg-[${item?.color}] ml-2`}
                  >
                    <i className={`fa fa-regular text-text1 fa-${item?.icon}`} />
                  </div>
                  <p className="textSmm text-text1">{item?.label}</p>
                </div>
              );
            })}
          </div>

          {/* left side */}
          <div className="col-span-12 lg:col-span-9 p-4">
            {questionsList && questionsList?.[0] ? (
              questionsList.map((item: any, index: number) => (
                <DraggableQuestion
                  key={index}
                  index={index}
                  label={item.title}
                  type={item.type}
                  order={item?.order}
                  onEdit={() => addModalByTypeOpen(item.type, 'edit', item.id)}
                  onRemove={() => removeQuestion(item?.id)}
                  // moveQuestion={moveQuestion}
                />
              ))
            ) : (
              <p className="textSmm font-normal text-text1">سوالی اضافه نکردید.</p>
            )}
          </div>

          <div
            onClick={() => openQuestionOptionsInMobileSet((prev) => !prev)}
            className="lg:hidden flex items-center justify-center z-[3] fixed bottom-4 left-4 w-14 h-14 rounded-full bg-[#3B368E]"
          >
            <i className="fa fa-solid fa-plus text-[20px] text-white" />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;