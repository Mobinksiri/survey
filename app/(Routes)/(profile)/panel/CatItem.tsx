'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const CatItem = ({ title, icon, href }: { title: string; icon: string; href: string }) => {
  const router = useRouter();

  const goToHref = () => {
    router.push('/profile/panel/' + href);
  };

  return (
    <div
      onClick={goToHref}
      className="border border-gray2 p-4 rounded-xl flex items-center cursor-pointer hover:bg-gray-50 transition-all"
    >
      <i className={`fa fa-regular fa-${icon} ml-2 text-[16px] leading-[22.5px]`} />
      <p className="text-text1 textSm font-normal">{title}</p>
    </div>
  );
};

export default CatItem;
