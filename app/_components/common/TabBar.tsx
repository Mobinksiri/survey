import React from 'react';
import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import CommentBox from './CommentBox';

export interface CommentDetail {
  totalComment: number;
  subject: string;
  id: number;
  comments: {
    arthur: {
      name: string;
      profileImage: StaticImageData;
    };
    timestamp: string;
    message: string;
  }[];
}

export interface TabBarListInterface {
  id: string;
  title: string;
  detail: CommentDetail[];
}

interface TabBarInterface {
  list: TabBarListInterface[];
  state: number | null;
  setState: React.Dispatch<React.SetStateAction<null | number>>;
}

const TabBar = ({ list, state, setState }: TabBarInterface) => {
  const findActiveDetail = list.find((tab) => Number(tab.id) === state);

  return (
    <>
      <div className="justify-center lg:justify-start flex mb-8">
        {list.map((tab) => (
          <motion.p
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => {
              setState(Number(tab.id));
            }}
            key={tab.id}
            className={`textMd font-medium ml-8 last:ml-0 cursor-pointer transition-all ${
              state === Number(tab.id) ? 'text-text1' : 'text-text3'
            }`}
          >
            {tab.title}
          </motion.p>
        ))}
      </div>
      {state && (
        <div className="flex  flex-col lg:flex-row px-2 lg:px-0 gap-8">
          {findActiveDetail?.detail && findActiveDetail?.detail?.[0] ? (
            findActiveDetail?.detail
              ?.slice(0, 2)
              ?.map((comment, index) => <CommentBox key={index} id={state} detail={comment} />)
          ) : (
            <p>اطلاعاتی برای نمایش وجود ندارد</p>
          )}
        </div>
      )}
    </>
  );
};

export default TabBar;
