import { commentProps, magazineCommentProps } from '@/app/_interface';
import Image from 'next/image';
import React, { useState } from 'react';
import Collapse from '@kunukn/react-collapse';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import moment from 'moment-jalaali';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';

export const IconBox = ({
  icon,
  text,
  className,
  iconClassName,
  onClick,
}: {
  icon: string;
  text?: string | number;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray2 rounded-md transition-all ${className}`}
    >
      <i className={`fa-regular fa-${icon} ml-2 text-[10px] lg:text-[14px] ${iconClassName}`} />
      {text && <h6 className="text-[12px] lg:text-[14px] font-normal text-text1">{text}</h6>}
    </div>
  );
};

const Comment = ({
  data,
  totalComments,
  index,
  refetch,
  hasReply = true,
}: magazineCommentProps & { totalComments: number; index: number }) => {
  const { userData } = useSelector(getUser);

  const [replyIsActive, replyIsActiveSet] = useState(false);
  const [replyText, replyTextSet] = useState(null);

  const addCommentFunction = () => {
    if (!replyText) {
      toast.error('لطفا همه موارد را پر کنید');
      return;
    }
    return apiCall({
      url: '/api/magazineComments',
      method: 'post',
      data: {
        magazineId: data?.magazineId,
        description: replyText,
        name: userData?.name,
        subject: '',
        email: userData?.email,
        replyTo: data?.id,
      },
      callback: (res, er) => {
        refetch();
        replyTextSet(null);
        replyIsActiveSet(false);
      },
    });
  };

  return (
    <div
      className={`${
        index == totalComments
          ? 'mb-[70px] pb-0 border-none'
          : 'mb-8 pb-8 border-b border-b-gray2 last:mb-0 last:pb-0 last:border-none'
      }`}
    >
      {/* head */}
      <div className="flex items-center w-full mb-5">
        {/* avatart */}
        <i className="w-12 h-12 rounded-full ml-4 flex items-center justify-center text-[15px] fa fa-regular fa-user bg-gray-100" />

        {/* other */}
        <div className="flex items-center justify-between w-full">
          {/* detail of comment */}
          <div className="flex items-center">
            <h5 className="textSm font-medium text-text1 ml-4">{data?.name}</h5>
            <h5 className="textSm text-text3 ml-8">
              {moment(data?.createdAt).format('jYYYY/jMM/jDD - HH:mm')}
            </h5>
            {hasReply ? (
              <IconBox onClick={() => replyIsActiveSet((prev) => !prev)} icon="share" text="پاسخ" />
            ) : null}
          </div>

          {/* like and dislike */}
          {/* <div className="flex items-center">
            <IconBox iconClassName="text-[17px]" icon="thumbs-up" text={'0'} />
            <IconBox iconClassName="text-[17px]" icon="thumbs-down" text={'0'} />
          </div> */}
        </div>
      </div>

      {/* body of comment */}
      <div className={`transition-all ${replyIsActive ? 'mb-2' : 'mb-0'}`}>
        <p className="textSm text-text3 leading-8">{data?.description}</p>
      </div>

      {hasReply ? (
        <Collapse transition="height .2s" isOpen={replyIsActive}>
          <div className="flex flex-col lg:flex-row items-center">
            <CustomInput
              state={replyText}
              setState={replyTextSet}
              type="text"
              placeholder="نظر خود را بنویسید..."
            />
            <CustomButton
              primaryButtonHoverStyle="!bg-[#A29BFE]"
              primaryButtonStyle="!bg-[rgb(0,184,148)]"
              variant="primary"
              type="button"
              className="w-full my-4 lg:my-0 lg:!w-1/5 lg:mr-2"
              onClick={addCommentFunction}
            >
              ثبت نظر
            </CustomButton>
          </div>
        </Collapse>
      ) : null}

      {data?.replies &&
        data?.replies?.[0] &&
        data?.replies?.map((item: any, index: any) => {
          return (
            <div key={index} className="mr-10 mt-6">
              <Comment
                hasReply={false}
                data={item}
                index={index}
                totalComments={data?.replies?.length}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
