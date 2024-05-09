'use client';

import React, { useState } from 'react';
import CommentSection from './subComponents/CommentSection';
import { useApiCall } from '@/app/_apiCall/apiCall';

const TABBAR_LIST = [
  {
    id: 0,
    title: 'توضیحات',
  },
  {
    id: 1,
    title: 'اعتبار آزمون',
  },
  {
    id: 2,
    title: 'دیدگاه کاربران',
  },
  {
    id: 3,
    title: 'سوالات متداول',
  },
  {
    id: 4,
    title: 'گزارش تغییرات',
  },
];

const Comments = ({ data }: { data: any }) => {
  //local state :

  const { data: commentsArray, refetch: commentsRefetch } = useApiCall<any>({
    url: '/api/getAllcommentOnPoll/' + data?.poll?.id,
    shouldCallApi: !!data?.poll?.id,
  });
  const { data: changesReport, refetch: changedReportRefetch } = useApiCall<any>({
    url: '/api/getPollChanges/' + data?.poll?.id,
    shouldCallApi: !!data?.poll?.id,
  });

  const [activeId, setActiveId] = useState(0);
  return (
    <div className="w-full h-full">
      <div className="flex w-full flex-col">
        <div className=" z-[1] flex lg:p-3 sticky top-[84px] rounded-md lg:rounded-2xl shadow-articlePost w-full bg-white md:flex-row justify-between lg:justify-start lg:gap-4 items-center text-center mb-4">
          {TABBAR_LIST.map((e, i) => {
            return (
              <div key={i} className=" flex ">
                <span
                  onClick={() => {
                    setActiveId(i);
                  }}
                  className={`cursor-pointer relative p-1 py-2 lg:p-2 rounded-md lg:rounded-lg transition-all ${
                    activeId === e.id ? 'bg-[#6BAAEB] text-white' : 'bg-transparent text-[#858687]'
                  }`}
                >
                  <p className="text-[10px] lg:text-[15px]">{e.title}</p>
                </span>
              </div>
            );
          })}
        </div>
        <div className="shadow-articlePost bg-white p-6 rounded-2xl overflow-hidden">
          <CommentSection
            commentsArray={commentsArray}
            commentsRefetch={commentsRefetch}
            changesArray={changesReport}
            data={data}
            id={activeId}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;