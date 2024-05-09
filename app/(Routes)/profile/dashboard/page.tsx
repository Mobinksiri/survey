'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from '@/app/_assets/other/profile/dashboard/dashboard.png';
import Image from 'next/image';
import { useApiCall } from '@/app/_apiCall/apiCall';

const Box = ({ count, title }: { count: number | string; title: string }) => {
  return (
    <div className="w-full aspect-square bg-[#F2F1FB] flex flex-col items-center justify-center rounded-xl lg:rounded-3xl p-4 lg:p-10">
      <h2 className="text-[36px] leading-[51px] text-text1 font-extrabold text-center">{count}</h2>
      <p className="text-sm font-bold text-text1 text-center">{title}</p>
    </div>
  );
};

const CircleProgressBar = ({ percentage }: { percentage: number }) => {
  const calculateDashArray = () => {
    const circumference = 2 * Math.PI * 40; // Assuming a radius of 40
    const dashLength = (percentage / 100) * circumference;
    return `${dashLength} ${circumference - dashLength}`;
  };

  return (
    <div className="relative w-32 h-32 mb-4">
      {/* Parent Circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full border-[8px] border-gray-100 border-solid"
        style={{
          zIndex: 1,
          strokeDasharray: '100%',
          strokeDashoffset: 0,
        }}
      ></div>
      {/* Child Circle */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 2 }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#A29BFE"
          strokeWidth="8"
          strokeDasharray={calculateDashArray()}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
      </svg>
      <p className="w-full h-full flex items-center justify-center text-2xl text-text1 font-extrabold">
        {percentage}%
      </p>
    </div>
  );
};

const PercentageBox = ({ percentage }: { percentage: number }) => {
  return (
    <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-4 lg:p-8 flex flex-col items-center">
      <CircleProgressBar percentage={percentage} />
      <p className="text-[18px] font-extrabold text-text1 mb-2">لورم ایپسوم</p>
      <p className="text-[16px] font-normal text-text3">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
        است،
      </p>
    </div>
  );
};

const Page = () => {
  const [countsArray, countsArraySet] = useState([
    {
      count: 0,
      title: 'دعوت دوستان',
    },
    {
      count: 0,
      title: `پروفایل های به ثبت رسانده`,
    },
    {
      count: 0,
      title: 'ثبت نظرات',
    },
    {
      count: 0,
      title: 'کامنت ها',
    },
  ]);
  const [box, boxSet] = useState<any>(null);

  const { data: usersDashboard } = useApiCall<any>({
    url: '/api/usersDashboard',
    // shouldCallApi: isIntersecting,
    loading: false,
  });

  useEffect(() => {
    if (usersDashboard) {
      countsArraySet([
        {
          count: 0,
          title: 'دعوت دوستان',
        },
        {
          count: usersDashboard?.usersCount,
          title: `پروفایل های به ثبت رسانده`,
        },
        {
          count: usersDashboard?.commentListReplysCount,
          title: 'ثبت نظرات',
        },
        {
          count: usersDashboard?.commentListCount,
          title: 'کامنت ها',
        },
      ]);
      if (usersDashboard?.box) {
        boxSet(usersDashboard?.box);
      }
    }
  }, [usersDashboard]);

  return (
    <div>
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-4 lg:p-8 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {countsArray.map((item, index) => {
            return <Box key={index} count={item?.count} title={item?.title} />;
          })}
        </div>
      </div>

      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-8 mb-6 flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="w-full lg:max-w-[470px]">
          <h5 className="textXl text-text1 mb-4 text-center lg:text-right">{box?.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: box?.description }} />
        </div>

        <div className="w-[210px] h-[200px] relative">
          <Image src={box?.image ?? Dashboard} fill alt="image" className="mb-6 lg:mb-0" />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <PercentageBox percentage={45} />
        <PercentageBox percentage={65} />
        <PercentageBox percentage={23} />
      </div> */}
    </div>
  );
};

export default Page;
