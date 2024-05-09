'use client';
import person from '@/app/_assets/other/post/article-post.jpg';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShopItem = ({ item }: { item?: any }) => {
  return (
    <div className="p-6 rounded-3xl bg-[#FBFBFB] flex items-center justify-between mb-4 last:mb-0">
      <div className="flex items-center">
        <div className="relative w-[70px] h-[70px] ml-6">
          <Image src={person} fill className="object-cover rounded-2xl" alt="" />
        </div>
        <h4 className="textSm font-normal text-text1 w-[350px] line-clamp-2">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
        </h4>
      </div>
      <p className="textSm font-normal text-text1">186.800 تومان</p>
    </div>
  );
};

const Page = () => {
  return (
    <div className="mb-6">
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="textXl text-text1">جزئیات سفارش</h4>
          <Link href={'/profile/orders_history'} className="flex items-center cursor-pointer">
            <h4 className="textSm text-text1 font-bold ml-2">بازگشت</h4>
            <i className="fa fa-solid fa-arrow-left text-text1" />
          </Link>
        </div>
        <div className="border border-[#D6D6D6] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-b-[#d6d6d6]">
            <div className="textMd font-bold text-text1">
              <span>کد سفارش:</span> <span>12345678</span>
            </div>
            <div className="textSm text-text3">1402/08/12</div>
          </div>
          <div className="p-6 border-b border-b-[#d6d6d6]">
            <div className="mb-8">
              <ShopItem />
              <ShopItem />
              <ShopItem />
            </div>
            <div className="flex mb-6 items-center justify-between w-full">
              <p className="textSm font-medium text-text1">هزینه</p>
              <p className="textSm font-medium text-text1">186.800 تومان</p>
            </div>
            <div className="flex mb-6 items-center justify-between w-full">
              <p className="textSm font-medium text-text3">
                <span className="text-[#F54D42]">مجموع تخفیف ها</span> (کد تخفیف 12345)
              </p>
              <p className="textSm font-medium text-[#F54D42] ">186.800 تومان</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="textSm font-medium text-text1">جمع کل</p>
              <p className="textSm font-medium text-text1">186.800 تومان</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex mb-6 items-center justify-between w-full">
              <p className="textSm font-medium text-text1">وضعیت پرداخت</p>
              <p className="textSm font-medium text-[#00AD7C]">در انتظار پرداخت</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="textSm font-medium text-text1">پرداخت آنلاین</p>
              <p className="textSm font-medium text-text1">186.800 تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
