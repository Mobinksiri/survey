'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LogoBlack from '@/app/_assets/other/navigation/ema-logo-black.svg';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getSearchRedux } from '@/app/store/searchOpen';
import { MobileNavLink } from './MobileNavLink';
import { motion } from 'framer-motion';

const HamburgerMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchActive } = useSelector(getSearchRedux);

  const [menuOpen, setMenuOpen] = useState(false);

  // disable scroll
  function preventDefault(e: Event): void {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }
  function theMouseWheel(e: WheelEvent): void {
    preventDefault(e);
  }
  function disableScroll(): void {
    if (window.addEventListener) {
      window.addEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
    }
    document.addEventListener('wheel', theMouseWheel, { passive: false } as EventListenerOptions);
  }
  function enableScroll(): void {
    if (window.removeEventListener) {
      window.removeEventListener('wheel', theMouseWheel, {
        passive: false,
      } as EventListenerOptions);
    }
    document.removeEventListener('wheel', theMouseWheel, {
      passive: false,
    } as EventListenerOptions);
  }
  const handelHamburgerMenu = () => {
    setMenuOpen(true);
  };
  // --------------

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      preventDefault(e);
    };

    if (menuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('wheel', handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  const variants = {
    initial: {
      right: '-100%',
      // opacity: 0,
    },
    animate: {
      right: 0,
      // opacity: 1,
    },
  };

  const backdropOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === 'menu-hamburger-list') {
      setMenuOpen(false);
    }
  };

  return (
    <div className="lg:hidden">
      <Image
        src={LogoBlack}
        alt="ema logo"
        width={65}
        height={39}
        className={`${
          !searchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-all absolute right-1/2 translate-x-[calc(50%+20px)] top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={() => router.push('/')}
        priority={true}
      />
      {/* <div
        className={`${
          !searchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-all absolute right-1/2 translate-x-[calc(50%+20px)] top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={() => router.push('/')}
      >
        <svg
          width="84"
          height="50"
          viewBox="0 0 84 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="65" height="39" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_1_2" transform="scale(0.0119048 0.02)" />
            </pattern>
            <image
              id="image0_1_2"
              width="84"
              height="50"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>

      </div> */}

      <div className="flex bg-gray-100 rounded-full w-12 h-12 justify-center items-center">
        <i
          className="fa-solid fa-bars cursor-pointer w-full h-full flex items-center justify-center"
          onClick={handelHamburgerMenu}
        ></i>
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] transition duration-300 z-[2] ${
            menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={backdropOnClick}
          id="menu-hamburger-list"
        />
        <motion.div
          variants={variants}
          initial="initial"
          animate={menuOpen ? 'animate' : 'initial'}
          transition={{}}
          className="fixed w-2/3 z-[50] top-0 h-screen"
        >
          <div className="relative h-full bg-white pt-20">
            <i
              onClick={() => setMenuOpen(false)}
              className="absolute py-4 px-6 top-0 left-0 fa fa-regular fa-close text-[22px] text-text1 cursor-pointer"
            />
            <Image
              src={LogoBlack}
              alt="ema logo"
              width={65}
              height={39}
              className={`cursor-pointer absolute p-3 top-3 right-4`}
              priority={true}
              onClick={() => {
                if (pathname !== '/') {
                  router.push('/');
                  setMenuOpen(false);
                }
              }}
            />
            <MobileNavLink setMenuOpen={setMenuOpen} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
