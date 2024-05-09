'use client';

import React, { useLayoutEffect } from 'react';
import { getUser } from '@/app/store/user';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { userData } = useSelector(getUser);

  return (
    <div>
      <title>مدیریت کامنت ها (مجله)</title>
      {children}
    </div>
  );
}
