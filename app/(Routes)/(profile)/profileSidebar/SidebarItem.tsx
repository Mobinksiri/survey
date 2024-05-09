'use client';

import { setIsOpenUserRevoke } from '@/app/store/userRevoke';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

const SidebarItem = ({
  title,
  icon,
  href,
  line = true,
  forNavigation = false,
  more,
  children,
  moreFunction,
  showTitle,
  id,
}: {
  title: string;
  icon: string;
  href?: string;
  line?: boolean;
  forNavigation?: boolean;
  more?: boolean;
  children?: React.ReactNode;
  moreFunction?: any;
  showTitle?: boolean;
  id?: string;
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    if (href) {
      if (href === 'profile') {
        router.push('/profile');
      } else {
        router.push(`/profile/${href}`);
      }
    } else {
      if (!more) {
        dispatch(setIsOpenUserRevoke(true));
      }
    }
  };

  const [hoverNavigation, hoverNavigationSet] = useState(false);
  const [hoverSidebar, hoverSidebarSet] = useState(false);
  const variants = {
    visible: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: 10,
      opacity: 0,
    },
  };

  return (
    <>
      {forNavigation ? (
        <>
          <div
            onClick={onClick}
            onMouseOver={() => hoverNavigationSet(true)}
            onMouseLeave={() => hoverNavigationSet(false)}
            className={`flex items-center justify-between px-2 py-1 mx-2 ${
              children ? '' : 'hover:bg-[rgba(0,0,0,0.04)]'
            } transition-all rounded-md relative cursor-pointer last:mb-2`}
          >
            <div>
              {line && (
                <>
                  {pathname == '/profile' && href == 'profile' && (
                    <div className="w-1 h-6 absolute right-0 top-6 -translate-y-6 rounded-tl-2xl rounded-bl-2xl bg-[#A29BFE]" />
                  )}
                  {href && href !== 'profile' && pathname.includes(href) && (
                    <div className="w-1 h-6 absolute right-0 top-6 -translate-y-6 rounded-tl-2xl rounded-bl-2xl bg-[#A29BFE]" />
                  )}
                </>
              )}
              <div className={`flex items-center text-text3 ${line && 'mr-10'}`}>
                <i className={`fa fa-regular text-[18px] fa-${icon} ml-[10px]`} />
                <p className="textSmm leading-4 font-normal">{title}</p>
              </div>
            </div>
            <motion.i
              animate={hoverNavigation ? 'visible' : 'hidden'}
              variants={variants}
              className="fa fa-solid fa-chevron-left text-text3 text-[10px]"
            />
          </div>
        </>
      ) : (
        <>
          <div
            onClick={onClick}
            onMouseOver={() => hoverSidebarSet(true)}
            onMouseLeave={() => hoverSidebarSet(false)}
            id={id ?? ''}
            className={`flex ${children ? '' : 'hover:opacity-80'} transition-all ${
              showTitle ? 'mb-2' : ''
            } lg:pb-4 lg:mb-0 last:mb-0 relative cursor-pointer last:pb-0`}
          >
            {line && (
              <>
                {pathname == '/profile' && href == 'profile' && (
                  <>
                    <div className="hidden lg:block w-1 h-6 absolute right-0 top-6 -translate-y-6 rounded-tl-2xl rounded-bl-2xl bg-[#A29BFE]" />
                    <div className="lg:hidden w-10 h-[5px] absolute right-1/2 translate-x-1/2 -bottom-10 -translate-y-6 rounded-tl-2xl rounded-tr-2xl bg-[#A29BFE]" />
                  </>
                )}
                {href && href !== 'profile' && pathname.includes(href) && (
                  <>
                    <div className="hidden lg:block w-1 h-6 absolute right-0 top-6 -translate-y-6 rounded-tl-2xl rounded-bl-2xl bg-[#A29BFE]" />
                    <div className="lg:hidden w-10 h-[5px] absolute right-1/2 translate-x-1/2 -bottom-10 -translate-y-6 rounded-tl-2xl rounded-tr-2xl bg-[#A29BFE]" />
                  </>
                )}
              </>
            )}
            {children}
            <div
              className={`flex items-center ${
                (href && href !== 'profile' && pathname.includes(href)) ||
                (pathname == '/profile' && href == 'profile')
                  ? 'text-[#A29BFE]'
                  : 'text-text3'
              } ${line && 'p-1 lg:p-0 lg:mr-10'} ${id ? 'pointer-events-none' : ''}`}
              onClick={moreFunction}
            >
              <i
                className={`fa fa-regular text-[21px] lg:text-[18px] fa-${icon} lg:ml-[10px] ${
                  showTitle ? 'ml-[10px]' : ''
                }`}
              />
              <p className={`${showTitle ? '' : 'lg:block hidden'} textSm pt-0.5 font-normal`}>
                {title}
              </p>
              <motion.i
                animate={hoverSidebar ? 'visible' : 'hidden'}
                variants={variants}
                className="hidden lg:block fa fa-solid mr-4 fa-chevron-left text-text3 text-[10px]"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarItem;
