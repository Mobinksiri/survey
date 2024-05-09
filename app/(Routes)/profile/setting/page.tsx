'use client';
import Toggle from '@/app/_components/common/Toggle';
import React, { useState } from 'react';

const SettingItem = ({
  title,
  description,
  state,
  setState,
}: {
  title: string;
  description?: string;
  state: boolean;
  setState: any;
}) => {
  return (
    <div className="flex items-start justify-between mb-8 last:mb-0">
      <div className="max-w-[670px]">
        <h4 className={`textMd text-text1 ${description ? 'mb-4' : ''}`}>{title}</h4>
        <p className="textSmm font-light text-text3">{description}</p>
      </div>
      <Toggle state={state} setState={setState} />
    </div>
  );
};

const Page = () => {
  const [accountStatus, accountStatusSet] = useState(false);
  const [show, showSet] = useState(false);
  const [email, emailSet] = useState(false);
  const [message, messageSet] = useState(false);

  return (
    <div>
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-8 mb-6">
        <h4 className="textXl text-text1 mb-8">تنظیمات</h4>
        <SettingItem
          title="نمایان بودن پروفایل شما (عمومی یا خصوصی بودن)"
          description="افرادی که پیوند نمایه رمزگذاری شده شما رو دارن میتونن به نمایه های عمومی دسترسی داشته باشن
اگرپروفایل شما خصوصی باشه، فقط افرادی که تو لیست دوستانتون هستن میتون نتایج شما رو ببینن"
          state={accountStatus}
          setState={accountStatusSet}
        />
        <SettingItem
          title="نمایان بودن اطلاعات شما"
          description="سن، جنسیت، شهر محل سکونت"
          state={show}
          setState={showSet}
        />
        <SettingItem title="ارسال ایمیل اطلاع رسانی" state={email} setState={emailSet} />
        <SettingItem title="ارسال پیامک اطلاع رسانی" state={message} setState={messageSet} />
      </div>
    </div>
  );
};

export default Page;
