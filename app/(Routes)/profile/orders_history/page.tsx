'use client';

import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import Link from 'next/link';
import React, { useState } from 'react';

const TableItem = ({ data }: { data?: any }) => {
  return (
    <div className="grid grid-cols-12 gap-4 w-[885px] lg:w-[780px] p-4 border-b border-b-[#D6D6D6] last:border-b-0">
      <div className="flex items-center col-span-2">
        <p className="text-text3 font-normal textSmm">123654678</p>
      </div>
      <div className="flex items-center col-span-2">
        <p className="text-text3 font-normal textSmm">1402/08/12</p>
      </div>
      <div className="flex items-center col-span-2">
        <p className="text-text3 font-normal textSmm">186.800 تومان</p>
      </div>
      <div className="flex items-center col-span-2">
        <p className="text-text3 font-normal textSmm">در انتظار پرداخت</p>
      </div>
      <div className="flex items-center col-span-4">
        <CustomButton variant="primary" className="!w-fit textSm font-bold rounded-xl px-4 ml-2">
          پرداخت
        </CustomButton>
        <Link href="/profile/orders_history/1">
          <CustomButton variant="outline" className="!w-fit textSm font-bold rounded-xl px-4 ml-2">
            جزییات
          </CustomButton>
        </Link>
        <CustomButton
          variant="primary"
          className="!w-fit textSm font-bold rounded-xl px-4"
          primaryButtonStyle="!bg-[#F54D42]"
          primaryButtonHoverStyle="!bg-[#f86459]"
        >
          لغو
        </CustomButton>
      </div>
    </div>
  );
};

const array = Array.from(Array(9));
const MAXIMUM_POSTS_PER_PAGE = 5;

const Page = () => {
  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  return (
    <div>
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-8 mb-6">
        <h4 className="textXl text-text1 mb-8">تاریخچه سفارش</h4>
        <div className="border border-[#D6D6D6] rounded-2xl overflow-hidden mb-8">
          <div className="w-full h-full overflow-x-auto custom-scrollBar">
            <div className="grid grid-cols-12 gap-4 w-[885px] lg:w-[780px] p-6 border-b border-b-[#d6d6d6]">
              <p className="text-text1 textMd col-span-2">کد سفارش</p>
              <p className="text-text1 textMd col-span-2">تاریخ</p>
              <p className="text-text1 textMd col-span-2">مجموع</p>
              <p className="text-text1 textMd col-span-2">وضعیت</p>
              <p className="text-text1 textMd col-span-4">جزئیات</p>
            </div>
            {array?.slice(startIndex, endIndex)?.map((item, index) => (
              <TableItem key={index} />
            ))}
          </div>
        </div>
        {array &&
        typeof array !== 'string' &&
        array?.length &&
        array?.length > MAXIMUM_POSTS_PER_PAGE ? (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={array?.length}
            activeClass="!bg-[#A29BFE]"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
