'use client';

import React, { useLayoutEffect } from 'react';
import { getUser } from '@/app/store/user';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { userData } = useSelector(getUser);

  // useLayoutEffect(() => {
  //   if (userData?.adminType !== 2) {
  //     toast.error('شما به این بخش دسترسی ندارید.');
  //     redirect('/profile/panel');
  //   }
  // }, [userData]);

  return (
    <div>
      <title>مدیریت نویسندگان</title>
      {children}
    </div>
  );
}
