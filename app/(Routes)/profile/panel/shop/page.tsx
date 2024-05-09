'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import StepBar from '@/app/_components/common/panel/StepBar';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  //local states :
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [image, setImage] = useState<File | null | string>(null);
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [description, descriptionSet] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [bookCoverType, setBookCoverType] = useState<string>('');
  const [cut, setCut] = useState<string>('');
  const [translator, setTranslator] = useState<string>('');
  const [price, setPice] = useState<string>('');
  const [shabak, setShabak] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [numberofpages, setNumberofpages] = useState<string>('');
  const [offPrice, setOffPrice] = useState<string>('');
  const [language, setlanguage] = useState<string>('');
  const [entitle, setEntitle] = useState<string>('');
  const [datePub, setDatePub] = useState<string>('');

  const router = useRouter();
  const { data: categoryList } = useApiCall<any>({
    url: `/api/getAllProductCategoryByType/book`,
  });

  const { data: writers } = useApiCall<any>({
    url: `/api/writers`,
  });

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };
  const formData = new FormData();

  const data = {
    file: result,
    author,
    name,
    explanation,
    publisher,
    bookCoverType,
    cut,
    translator,
    type: 'book',
    price,
    shabak,
    weight,
    numberofpages,
    offprice: offPrice,
    writer: author,
    language,
    description,
    entitle,
    publishtime: datePub,
  };

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const createProduct = () => {
    if (result) {
      return apiCall({
        url: '/api/createProduct',
        data: formData,

        method: 'post',
        formDataIsNeeded: true,
        callback(res, er) {
          if (res) {
            toast.success('محصول با موفقیت ایجاد گردید');
            setAuthor('');
            setName('');
            setResult('');
            setPublisher('');
            setBookCoverType('');
            setCut('');
            setExplanation('');
            setTranslator('');
            setOffPrice('');
            setPice('');
            setPice('');
            setPice('');
            setlanguage('');
            setDatePub('');
            setEntitle('');

            setNumberofpages(''), setWeight(''), setShabak('');
            router.push('/profile/panel');
          } else {
            return toast.error('خطا در ایجاد محصول');
          }
        },
      });
    } else {
      toast.error('عکس انتخاب کنید');
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

  return (
    <>
      <StepBar array={[{ title: 'فروشگاه' }, { title: 'کتب' }]} />
      <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
        <div className=" grid grid-cols-2 gap-4 mb-10">
          <div>
            <CustomInput setState={setName} state={name} label="عنوان کتاب" />
          </div>
          <div>
            <p className={`textSmm font-normal text-text3 mb-2 w-full `}>انتخاب نویسنده</p>

            <CustomSelect
              onChange={(e: any) => {
                setAuthor(e?.value?.toString());
              }}
              options={writers
                ?.filter((e: any) => e.type == '1')
                .map((e: any) => {
                  return {
                    label: e?.name,
                    value: e?.id,
                  };
                })}
            />
          </div>
          <div className="">
            <CustomInput setState={descriptionSet} state={description} label="توضیح کوتاه" />
          </div>
          <div className="">
            <p className={`textSmm font-normal text-text3 mb-2 w-full `}>نوع دسته بندی</p>
            <CustomSelect
              onChange={() => {}}
              options={
                categoryList &&
                categoryList.map((e: any) => {
                  return {
                    label: e?.name,
                    value: e?.type,
                  };
                })
              }
            />
          </div>
          <div className="col-span-2 gap-6 mb-6 pb-6 border-b border-b-gray1">
            <div className="w-full">
              <p className="textSmm font-normal text-text3 mb-2 w-full">عکس مجله</p>
              <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
              <p className="textXs font-bold lg:text-[14px] lg:leading-[20px] lg:font-normal text-rose-400 my-4 w-full">
                سایز استاندارد عکس 820 در 620 است
              </p>
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
          <div className="col-span-2">
            <CustomInput
              type="textarea"
              setState={setExplanation}
              state={explanation}
              label="توضیحات"
            />
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
          <div className="">
            <CustomInput
              type="text"
              pattern=""
              setState={setPublisher}
              state={publisher}
              label="نام انتشارات"
            />
          </div>
          <div className="">
            <CustomInput
              type="text"
              pattern=""
              setState={setBookCoverType}
              state={bookCoverType}
              label="نوع جلد"
            />
          </div>
          <div className="">
            <CustomInput type="text" pattern="" setState={setCut} state={cut} label="قطع" />
          </div>
          <div className="">
            {/* <CustomInput type="text" setState={setTranslator} state={translator} label="مترجم" /> */}
            <p className={`textSmm font-normal text-text3 mb-2 w-full `}>انتخاب مترجم</p>

            <CustomSelect
              options={writers
                ?.filter((e: any) => e.type == '2')
                .map((e: any) => {
                  return {
                    label: e?.name,
                    value: e?.id,
                  };
                })}
              onChange={(e: any) => {
                setTranslator(e?.value?.toString());
              }}
            />
          </div>
          <div className="">
            <CustomInput
              type="number"
              pattern=""
              setState={setWeight}
              state={weight}
              label="وزن کتاب"
            />
          </div>
          <div className="">
            <CustomInput
              type="number"
              pattern=""
              setState={setNumberofpages}
              state={numberofpages}
              label="تعداد صفحات"
            />
          </div>
          <div className="">
            <CustomInput type="text" pattern="" setState={setShabak} state={shabak} label="شابک" />
          </div>
          <div className="">
            <CustomInput
              type="text"
              pattern=""
              setState={setlanguage}
              state={language}
              label="زبان"
            />
          </div>
          <div className="">
            <CustomInput
              type="text"
              pattern=""
              setState={setEntitle}
              state={entitle}
              label="عنوان انگلیسی"
            />
          </div>
          <div className="">
            <CustomInput
              type="date"
              placeholder="انتخاب تاریخ"
              pattern=""
              setState={setDatePub}
              state={datePub}
              label="زمان انتشار"
            />
          </div>
          <div className=" justify-end flex items-end">
            <CustomButton className="" onClick={createProduct} variant="primary">
              ایجاد محصول
            </CustomButton>
          </div>
          {/* <div className=" justify-end flex items-end">
          <CustomButton className="" onClick={deleteProduction} variant="primary">
            حذف
          </CustomButton>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
