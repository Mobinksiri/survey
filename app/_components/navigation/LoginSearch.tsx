'use client';

import useScrollY from '@/app/_hooks/useScrollY';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import { usePathname } from 'next/navigation';
import CustomButton from '../common/custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenLogin } from '@/app/store/login';
import { getUser } from '@/app/store/user';
import SidebarItem from '@/app/(Routes)/(profile)/profileSidebar/SidebarItem';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoginSearch = () => {
  const dispatch = useDispatch();

  const scrollY = useScrollY();
  const pathname = usePathname();

  const [profileDropdownOpen, profileDropdownOpenSet] = useState(false);

  const openLoginModal = (e: any) => {
    e.stopPropagation();
    dispatch(setIsOpenLogin(true));
  };

  const isScrolled =
    scrollY > Number(process?.env?.NEXT_PUBLIC_NAVBAR_SCROLL_Y) || pathname !== '/';
  const buttonClassName = `hidden lg:block mr-[24px] px-3 lg:px-0 !w-fit lg:!w-[130px] h-[40px] flex items-center justify-center border rounded-lg lg:rounded-2xl textSm cursor-pointer ${
    isScrolled ? 'border-text1 text-text1' : 'border-text1 text-text1 lg:border-white lg:text-white'
  }`;

  const { userData } = useSelector(getUser);

  const variants = {
    rotate: { y: 0, opacity: 1 },
    stop: { y: -20, opacity: 0 },
  };

  useEffect(() => {
    profileDropdownOpenSet(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const dropdown = document.querySelector('.profile-dropdown');

      if (dropdown && !dropdown.contains(event.target)) {
        profileDropdownOpenSet(false);
      }
    };

    const closeDropdown = () => {
      profileDropdownOpenSet(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', closeDropdown);
    };
  }, []);

  return (
    <div className="flex items-center">
      <Search />
      <div className="relative">
        {userData ? (
          <div
            onClick={() => profileDropdownOpenSet((prev) => !prev)}
            className="relative bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-6 cursor-pointer "
          >
            {userData?.avatar?.id && userData?.avatar?.url ? (
              <Image fill src={userData?.avatar?.url} alt="user" />
            ) : (
              <i className="fa fa-regular fa-user text-[18px]" />
            )}
          </div>
        ) : (
          <>
            <CustomButton onClick={openLoginModal} className={buttonClassName} variant="outline">
              ورود / ثبت نام
            </CustomButton>
            <div
              onClick={openLoginModal}
              className="lg:hidden relative border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center mr-6 cursor-pointer "
            >
              <i className="fa fa-regular fa-sign-in text-[18px]" />
            </div>
          </>
        )}
        <motion.div
          variants={variants}
          animate={profileDropdownOpen ? 'rotate' : 'stop'}
          className={`w-56 h-fit bg-white shadow-comment absolute mt-4 rounded-lg left-[-0.15rem] ${
            profileDropdownOpen ? 'profile-dropdown' : 'pointer-events-none'
          }`}
        >
          {userData && (
            <>
              <div className="flex items-center justify-between mb-2 p-4 border-b border-b-gray-100">
                <div className="relative bg-gray-100 ml-4 rounded-full w-12 h-12 flex items-center justify-center">
                  {userData?.avatar?.id && userData?.avatar?.url ? (
                    <Image fill src={userData?.avatar?.url} alt="user" />
                  ) : (
                    <i className="fa fa-regular fa-user text-[18px]" />
                  )}
                </div>
                <div className="w-[calc(100%-60px)]">
                  <p className="textSm font-bold text-text3 line-clamp-1">
                    {userData?.name} {userData?.familyname ?? null}
                  </p>
                  <p className="textXs font-normal text-text3 line-clamp-1">
                    {!userData?.writer && !userData?.isAdmin ? 'کاربر عادی ' : null}
                    {userData?.isAdmin && userData?.adminType == 1 ? 'کاربر ادمین ' : null}
                    {userData?.isAdmin && userData?.adminType == 2 ? 'کاربر سوپر ادمین ' : null}
                    {userData?.writer && userData?.writer?.type == '1' ? 'نویسنده ' : null}
                    {userData?.writer && userData?.writer?.type == '2' ? 'مترجم ' : null}
                    {userData?.writer && userData?.writer?.type == '3' ? 'مدرس ' : null}
                  </p>
                </div>
              </div>
              <SidebarItem
                forNavigation
                line={false}
                title="پروفایل کاربری"
                href="profile"
                icon="user"
              />
              {(userData?.isAdmin || userData?.writer) && (
                <SidebarItem
                  forNavigation
                  line={false}
                  title="پنل مدیریتی"
                  href="panel"
                  icon="pen-to-square"
                />
              )}
              <SidebarItem
                forNavigation
                line={false}
                title="داشبورد"
                href="dashboard"
                icon="dashboard"
              />
              <SidebarItem
                forNavigation
                line={false}
                title="سیو شده ها"
                href="bookmarks"
                icon="bookmark"
              />
              <SidebarItem
                forNavigation
                line={false}
                title="پیشنهادات"
                href="recommended"
                icon="message-smile"
              />
              <SidebarItem forNavigation line={false} title="تنظیمات" href="setting" icon="gear" />
              {/* <SidebarItem
                forNavigation
                line={false}
                title="سفارش های من"
                href="my_orders"
                icon="bag-shopping"
              /> */}
              <SidebarItem
                forNavigation
                line={false}
                title="تاریخچه سفارش"
                href="orders_history"
                icon="history"
              />
              <SidebarItem
                forNavigation
                line={false}
                title="نتایج آزمون"
                href="quiz_result"
                icon="question-circle"
              />
              <SidebarItem
                forNavigation
                line={false}
                title="خروج"
                icon="arrow-right-from-bracket"
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSearch;
