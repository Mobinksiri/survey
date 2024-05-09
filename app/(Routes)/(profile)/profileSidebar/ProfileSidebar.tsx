'use client';

import React, { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const ProfileSidebar = () => {
  const { userData } = useSelector(getUser);
  const [moreModal, moreModalSet] = useState(false);
  const pathname = usePathname();

  const variants = {
    rotate: { y: '-115%', opacity: 1 },
    stop: { y: '-100%', opacity: 0 },
  };

  useEffect(() => {
    moreModalSet(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const dropdown = document.querySelector('.more-dropdown-profile');

      if (dropdown && !dropdown.contains(event.target) && event.target?.id !== 'more-button') {
        moreModalSet(false);
      }

      if (event.target?.id == 'more-button') {
        moreModalSet((prev) => !prev);
      }
    };

    const closeDropdown = () => {
      moreModalSet(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', closeDropdown);
    };
  }, []);

  return (
    <>
      {/* avatar */}
      <div className="w-11/12 py-2 lg:w-auto justify-around flex mx-auto lg:mx-0 flex-row lg:flex-col">
        <div className="hidden lg:block mb-12">
          <h5 className="mx-auto mb-2 w-fit textMd text-text1">
            {(userData?.name ?? '') + ' ' + (userData?.familyname ?? '')}
          </h5>
          <h5 className="mx-auto w-fit textSm text-text3">{userData?.email ?? ''}</h5>
        </div>

        <SidebarItem title="پروفایل کاربری" href="profile" icon="user" />
        <SidebarItem title="بیوگرافی" href="biography" icon="file-user" />
        {(userData?.isAdmin || userData?.writer) && (
          <SidebarItem title="پنل مدیریتی" href="panel" icon="pen-to-square" />
        )}

        <SidebarItem title="تنظیمات" href="setting" icon="gear" />

        <div className="lg:hidden">
          <SidebarItem
            moreFunction={() => moreModalSet((prev) => !prev)}
            title="بیشتر"
            more
            icon="ellipsis-vertical"
            id="more-button"
          >
            <motion.div
              variants={variants}
              animate={moreModal ? 'rotate' : 'stop'}
              className={`w-56 h-fit bg-white shadow-comment absolute rounded-lg p-4 left-[-0.3rem] ${
                moreModal ? 'more-dropdown-profile' : 'pointer-events-none'
              }`}
              transition={{
                type: 'spring',
                duration: 0.5,
              }}
            >
              <SidebarItem
                line={false}
                showTitle
                title="سیو شده ها"
                href="bookmarks"
                icon="bookmark"
              />
              <SidebarItem
                line={false}
                showTitle
                title="پیشنهادات"
                href="recommended"
                icon="message-smile"
              />
              <SidebarItem
                line={false}
                showTitle
                title="تاریخچه سفارش"
                href="orders_history"
                icon="history"
              />
              <SidebarItem
                line={false}
                showTitle
                title="داشبورد"
                href="dashboard"
                icon="dashboard"
              />
              <SidebarItem
                line={false}
                showTitle
                title="نتایج آزمون"
                href="quiz_result"
                icon="question-circle"
              />
              {userData?.isAdmin && (
                <SidebarItem
                  showTitle
                  line={false}
                  title="گزارش گیری"
                  href="report_history"
                  icon="bug"
                />
              )}
              {userData?.isAdmin && (
                <SidebarItem
                  showTitle
                  line={false}
                  title="خبرنامه"
                  href="news_letter"
                  icon="newspaper"
                />
              )}
              {userData?.adminType == 2 && (
                <SidebarItem
                  line={false}
                  showTitle
                  title="دسترسی ادمین"
                  href="admin_access"
                  icon="user-crown"
                />
              )}
            </motion.div>
          </SidebarItem>
        </div>

        <div className="hidden lg:block mb-4">
          <SidebarItem title="سیو شده ها" href="bookmarks" icon="bookmark" />
          <SidebarItem title="پیشنهادات" href="recommended" icon="message-smile" />
          {/* <SidebarItem title="سفارش های من" href="my_orders" icon="bag-shopping" /> */}
          <SidebarItem title="تاریخچه سفارش" href="orders_history" icon="history" />
          {userData?.isAdmin && <SidebarItem title="گزارش گیری" href="report_history" icon="bug" />}
          {userData?.isAdmin && <SidebarItem title="خبرنامه" href="news_letter" icon="newspaper" />}
          {userData?.adminType == 2 && (
            <SidebarItem title="دسترسی ادمین" href="admin_access" icon="user-crown" />
          )}
          <SidebarItem title="داشبورد" href="dashboard" icon="dashboard" />
          <SidebarItem title="نتایج آزمون" href="quiz_result" icon="question-circle" />
        </div>
      </div>

      <div className="hidden lg:block">
        <SidebarItem title="خروج" icon="arrow-right-from-bracket" />
      </div>
    </>
  );
};

export default ProfileSidebar;
