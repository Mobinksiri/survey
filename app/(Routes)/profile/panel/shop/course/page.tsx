'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import { getUser } from '@/app/store/user';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const AddCourse = () => {
  const [courseName, setCourseName] = useState<string>('');
  const [image, setImage] = useState<File | null | string>(null);
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [suitableFor, setSuitableFor] = useState<string>('');
  const [notSuitableFor, setNotSuitableFor] = useState<string>('');
  const [price, setPice] = useState<string>('');
  const [offPrice, setOffPrice] = useState<string>('');
  const [video, setVideo] = useState<File | null>();
  const [listItem, setListItem] = useState<any>([]);
  const [listContinuQuestion, listContinuQuestionSet] = useState<any>([]);
  const [question, questionSet] = useState<any>('');
  const [answer, answerSet] = useState<any>('');
  const [noListItem, setNoListItem] = useState<any>([]);

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  const { userData } = useSelector(getUser);
  const router = useRouter();
  const formData = new FormData();

  const data = {
    file: result,
    intro: video,
    duration,
    name: courseName,
    explanation,
    suitableFor: listItem,
    notSuitableFor: noListItem,
    type: 'course',
    price,
    offprice: offPrice,
    userId: userData?.userId,
    continueQuestion: JSON.stringify(listContinuQuestion),
    writer: userData?.writer?.id,
  };

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const createCourse = () => {
    if (result) {
      return apiCall({
        url: '/api/createProduct',
        data: formData,
        method: 'post',
        formDataIsNeeded: true,
        callback(res, er) {
          if (res) {
            toast.success('محصول با موفقیت ایجاد گردید');
            setCourseName('');
            setResult('');
            setNotSuitableFor('');
            setExplanation('');
            setSuitableFor('');
            setOffPrice('');
            setDuration('');
            setPice('');

            setTimeout(() => {
              toast.success('تا لحظاتی دیگر به صفحه سرفصل دوره ها منتقل میشوید');
              router.push('/profile/panel/shop/courseDetail');
            }, 2500);
          } else {
            return toast.error('خطا در ایجاد محصول');
          }
        },
      });
    } else {
      toast.error('عکس انتخاب کنید');
    }
  };

  const { data: writers } = useApiCall<any>({
    url: `/api/writers`,
  });

  const videoChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setVideo(selectedImage);
    }
  };
  // const deleteProduction = () => {
  //   return apiCall({
  //     url: '/api/product/11',
  //     data: {},

  //     method: 'delete',

  //     callback(res, er) {
  //       if (res) {
  //       } else {
  //       }
  //     },
  //   });
  // };
  const hadnelFilter = (id: number, listName: [], setListName: any) => {
    const filteredList = listName.filter((e: any, index: number) => id !== index);
    setListName(filteredList);
  };

  const addSutableItem = (newItem: string) => [setListItem((prev: any) => [...prev, newItem])];
  const addContiniueQuestion = (newItem: { question: string; answer: string }) => [
    listContinuQuestionSet((prev: any) => [...prev, newItem]),
  ];

  const addNoSutableItem = (newItem: string) => [setNoListItem((prev: any) => [...prev, newItem])];
  return (
    <>
      <StepBar array={[{ title: 'فروشگاه' }, { title: 'دوره ها' }]} />
      <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
        <div className=" grid grid-cols-2 gap-4 mb-10">
          <div>
            <CustomInput setState={setCourseName} state={courseName} label="عنوان دوره" />
          </div>
          <div>
            <CustomInput setState={setDuration} state={duration} label="مدت دوره" />
          </div>
          <div className="col-span-full">
            {/* setState={setAuthor} state={author} label="نویسنده" */}
            {/* <p className={`textSmm font-normal text-text3 mb-2 w-full `}>انتخاب مدرس</p> */}

            {/* <CustomSelect
            onChange={(e: any) => {
            
              // setAuthor(JSON.stringify(e));
            }}
            options={
              writers
                ?.filter((e: any) => Number(e?.type) == 3)
                ?.map((item: any) => ({ label: 'd', value: 'dafs' })) ?? []
            }
          /> */}
          </div>
          <div className="col-span-1 gap-6 mb-6 pb-6 ">
            <div className="w-full">
              <p className="textSmm font-normal text-text3 mb-2 w-full">عکس دوره</p>
              <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
              <p className="textXs font-bold lg:text-[14px] lg:leading-[20px] lg:font-normal text-rose-400 my-4 w-full">
                سایز استاندارد عکس 820 در 620 است
              </p>
            </div>
          </div>
          <div>
            <div className="col-span-1 gap-6 mb-6 pb-6 ">
              <div className="w-full">
                <p className="textSmm font-normal text-text3 mb-2 w-full">ویدئو معرفی دوره</p>
                <input onChange={videoChangeFunction} type="file" accept="video/*" />
              </div>
            </div>
          </div>

          {
            <div className="mb-6  col-span-2">
              <ImageEditor
                className={`${image ? '!h-[550px] pb-8' : '!h-0 pb-0'}`}
                image={image}
                imageSet={setImage}
                resultSet={setResult}
              />
              {typeof result !== 'string' && (
                <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-3">
                  <i
                    onClick={() => {
                      setResult('');
                      setImage('');
                    }}
                    className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
                  />
                  {
                    <div>
                      <Image width={100} height={100} src={URL.createObjectURL(result)} alt="" />
                    </div>
                  }
                </div>
              )}
            </div>
          }
          <hr className="col-span-full" />
          <div className="col-span-2 mb-2">
            {/* <CustomInput
            type="textarea"
            setState={setExplanation}
            state={explanation}
            label="توضیحات"
          /> */}
            <p className="textSmm font-normal text-text3 mb-2 w-full"> توضیحات دوره</p>
            <RichTextEditor setState={setExplanation} defaultValue={explanation} />
          </div>
          <div className="">
            <CustomInput
              type="number"
              setState={setPice}
              state={price.toLocaleString().split('.')[0]}
              label="قیمت"
            />
          </div>
          <div className="">
            <CustomInput type="number" setState={setOffPrice} state={offPrice} label="درصد تخفیف" />
          </div>
          <div className="col-span-full flex items-end justify-end">
            <CustomInput
              type="text"
              pattern=""
              setState={setSuitableFor}
              state={suitableFor}
              label="مناسب برای کسانی که"
            />
            <CustomButton
              className="!w-1/4 mr-2"
              variant="outline"
              disable={listItem.length > 4 ? true : false}
              onClick={() => {
                addSutableItem(suitableFor);
                setSuitableFor('');
              }}
            >
              افزودن
            </CustomButton>
          </div>
          <div className="col-span-full">
            {listItem &&
              listItem.length > 0 &&
              listItem.map((e: string, index: number) => (
                <div key={index} className="w-full justify-between flex border p-2 mb-3 rounded-xl">
                  <p>{`${index + 1}. ${e}`}</p>
                  <i
                    className="fa-solid fa-trash text-red cursor-pointer"
                    onClick={() => hadnelFilter(index, listItem, setListItem)}
                  />
                </div>
              ))}
          </div>

          <div className="col-span-full flex items-end justify-end ">
            <CustomInput
              type="text"
              pattern=""
              setState={setNotSuitableFor}
              state={notSuitableFor}
              label=" مناسب نیست برای کسانی که"
            />
            <CustomButton
              className="!w-1/4 mr-2"
              variant="outline"
              disable={noListItem.length > 4 ? true : false}
              onClick={() => {
                addNoSutableItem(notSuitableFor);
                setNotSuitableFor('');
              }}
            >
              افزودن
            </CustomButton>
          </div>
          <div className="col-span-full">
            {noListItem &&
              noListItem.length > 0 &&
              noListItem.map((e: string, index: number) => (
                <div key={index} className="w-full justify-between flex border p-2 mb-3 rounded-xl">
                  <p>{`${index + 1}. ${e}`}</p>
                  <i
                    className="fa-solid fa-trash text-red cursor-pointer"
                    onClick={() => hadnelFilter(index, noListItem, setNoListItem)}
                  />
                </div>
              ))}
            <hr />
          </div>

          <div className=" justify-end flex items-end"></div>

          {/* <div className=" justify-end flex items-end">
          <CustomButton className="" onClick={deleteProduction} variant="primary">
            حذف
          </CustomButton>
        </div> */}
        </div>

        <div className="border border-gray2 rounded-lg p-6 mb-4 gap-">
          <CustomInput
            type="text"
            pattern=""
            setState={questionSet}
            state={question}
            label="اضافه کردن کردن سوالات متداول"
          />
          <CustomInput
            parentClassName="mt-2"
            type="text"
            pattern=""
            setState={answerSet}
            state={answer}
            label="اضافه کردن کردن جواب "
          />
          <CustomButton
            className="!w-1/4  mr-auto mt-4"
            variant="outline"
            onClick={() => {
              addContiniueQuestion({ question, answer });
              questionSet('');
              answerSet('');
            }}
          >
            افزودن
          </CustomButton>
        </div>
        <div className="col-span-full">
          {listContinuQuestion &&
            listContinuQuestion.length > 0 &&
            listContinuQuestion.map((e: any, index: number) => (
              <div
                key={index}
                className="w-full justify-between flex border p-2 mb-3 rounded-xl items-center"
              >
                <div>
                  <p>{`${index + 1}. ${e?.question}`}</p>
                  <p className="mt-3">{`${index + 1}. ${e?.answer}`}</p>
                </div>
                <i
                  className="fa-solid fa-trash text-red cursor-pointer"
                  onClick={() => hadnelFilter(index, listContinuQuestion, listContinuQuestionSet)}
                />
              </div>
            ))}
        </div>
        <CustomButton className="" onClick={createCourse} variant="primary">
          ایجاد محصول
        </CustomButton>
      </div>
    </>
  );
};

export default AddCourse;
