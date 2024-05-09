import CustomButton from '@/app/_components/common/custom/CustomButton';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

interface QuestionCategory {
  array: [];
  handelDelete: any;
  // handelRouteTo:()=>{}
}

const ShowAllQuestion = ({ array, handelDelete }: QuestionCategory) => {
  const router = useRouter();
  return (
    <div className={`grid grid-cols-3 gap-4 `}>
      {array.length > 0 &&
        array.map((e: any, i) => (
          <div
            key={i}
            className="flex flex-col justify-between  bg-PostCardBg w-full shadow-category-item rounded-2xl p-4 z-[1]"
          >
            <div className="flex justify-between">
              <Image
                src={e?.image}
                alt=""
                className="rounded-xl !w-[120px] !max-h-[120px] object-cover mb-4"
                layout="responsive"
                width={100}
                height={100}
              />
              <div className="h-fit px-3 py-1 rounded-md bg-rose-400 text-white text-[11px]">
                {e?.price == null ? 'رایگان' : 'پولی'}
              </div>
            </div>
            <span>{e?.title}</span>
            <p className="text-[11px] my-2 truncate text-gray-500">{e?.description}</p>
            <div className=" flex items-center ">
              <span className="bg-yellow rounded ml-2 text-[10px] px-2 py-1">
                <i className="fa-regular fa-heart  ml-1" />
                200
              </span>
              <span className="bg-yellow rounded ml-2 text-[10px] px-2 py-1">
                <i className="fa-regular fa-clock ml-1" />
                {`${e?.timeToAnswer}دقیقه`}
              </span>
              <span className="bg-yellow rounded ml-2 text-[10px] px-2 py-1">
                <i className="fa-regular fa-user  ml-1" />
                200
              </span>
            </div>
            <div className=" border border-gray-200 mt-5"></div>
            <div className=" flex  mt-2 bottom-2   ">
              <CustomButton
                className="text-[11px]"
                variant="primary"
                onClick={() => {
                  router.push(`/profile/panel/azmoon/${e?.id}`);
                }}
              >
                ورود به بخش سوالات
              </CustomButton>
              <CustomButton
                className="w-1/3 mr-4 text-[11px] text-rose-500 border-red"
                variant="outline"
                onClick={() => handelDelete(e?.id)}
              >
                حذف
              </CustomButton>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowAllQuestion;
