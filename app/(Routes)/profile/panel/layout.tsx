'use client';

import React, { useLayoutEffect } from 'react';
import { getUser } from '@/app/store/user';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { userData } = useSelector(getUser);

  useLayoutEffect(() => {
    if (!userData?.isAdmin && !userData?.writer) {
      redirect('/');
    }
  }, [userData]);

  return (
    <div>
      <title>پنل مدیریتی</title>
      {children}
    </div>
  );
}
