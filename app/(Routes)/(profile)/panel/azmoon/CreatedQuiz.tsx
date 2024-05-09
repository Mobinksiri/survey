import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { iconList } from './QuizPanel';
import apiCall from '@/app/_apiCall/apiCall';

const Item = ({ item, removePoll }: { item: any; removePoll: any }) => {
  const foundedIcon = iconList?.find((i) => i?.id == item?.imageId);

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-xl">
      <div className="flex items-center">
        <Image width={50} height={50} src={foundedIcon?.icon} className="ml-4" alt="" />
        <Link href={`/profile/panel/azmoon/${item?.id}`}>
          <p className="cursor-pointer textSmm text-text1">{item?.title}</p>
        </Link>
      </div>
      <i
        className="fa fa-solid textSmm fa-trash text-red p-1 cursor-pointer"
        onClick={() => removePoll(item?.id)}
      />
    </div>
  );
};

const CreatedQuiz = ({ array, removePoll }: { array: any[]; removePoll: any }) => {
  return (
    <div>
      {array && array?.length ? (
        array?.map((item, index) => {
          return <Item removePoll={removePoll} item={item} key={index} />;
        })
      ) : (
        <p>آزمونی ثبت نشده است</p>
      )}
    </div>
  );
};

export default CreatedQuiz;
