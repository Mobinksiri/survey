import React from 'react';
import Image from 'next/image';
import LogoWhite from '@/app/_assets/other/navigation/ema-logo-white.svg';
import Background from '@/app/_assets/other/footer/background.png';
import telegram from '@/app/_assets/other/footer/telegram.svg';
import eta from '@/app/_assets/other/footer/eta.svg';
import instagram from '@/app/_assets/other/footer/instagram.svg';
import nody from '@/app/_assets/other/footer/nody.svg';
import bale from '@/app/_assets/other/footer/bale.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative lg:px-0 px-4 h-fit lg:h-[540px] pt-10 mt-16 lg:mt-0 lg:pt-[180px] z-[1] bg-[#848688] lg:bg-transparent">
      <Image
        src={Background}
        alt="footer background"
        className="lg:block hidden w-full h-full max-w-[2000px] absolute bottom-0 left-1/2 -translate-x-1/2 -z-10"
      />
      <div className="custom-container">
        <Image src={LogoWhite} alt="logo" className="mb-8" />
        <div className="w-full flex flex-col lg:flex-row lg:justify-between">
          <p className="textSm leading-[32px] text-white w-full lg:max-w-[480px] text-justify px-1 mb-4 pb-4 lg:mb-0 lg:pb-0 border-b lg:border-b-0 border-b-[#ffffff36]">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
            است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
            تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-1 items-center lg:mt-0 mt-3 lg:items-start mb-4 pb-4 lg:mb-0 lg:pb-0 border-b lg:border-b-0 border-b-[#ffffff36]">
            <Link
              href="/contactUs"
              className="text-center lg:text-right textSm text-white hover:underline font-medium mb-4"
            >
              ارتباط با ما
            </Link>
            <Link
              href="/aboutus"
              className="text-center lg:text-right textSm text-white hover:underline font-medium mb-4"
            >
              درباره ما
            </Link>
            <Link
              href="/teammate"
              className="text-center lg:text-right textSm text-white hover:underline font-medium mb-4"
            >
              همکاران ما
            </Link>
            <Link
              href="/guide"
              className="text-center lg:text-right textSm text-white hover:underline font-medium mb-4"
            >
              راهنما
            </Link>
            <Link
              href="/rules"
              className="text-center lg:text-right textSm text-white hover:underline font-medium mb-4"
            >
              قوانین
            </Link>
          </div>
          <div>
            <p className="textMd lg:text-right text-center  text-white mb-6">با ما همراه باشید</p>
            <div className="flex justify-center lg:justify-start mb-8">
              {[
                //
                { image: instagram, href: 'https://www.instagram.com/eema_mbti' },
                { image: nody, href: 'https://rubika.ir/Eema_MBTI' },
                { image: eta, href: 'https://eitaa.com/Eema_MBTI' },
                { image: bale, href: 'https://ble.ir/eema_mbti' },
                { image: telegram, href: 'https://t.me/Eema_Mbti' },
              ].map((src, index) => (
                <a key={index} href={src.href} target="_blank">
                  <Image src={src.image} alt={`social-${index}`} className="ml-6 text-white" />
                </a>
              ))}
            </div>
            <p className="textMd font-light  text-center lg:text-right text-white mb-6">
              ima.info@gmail.com
            </p>
          </div>
        </div>
        {/* bottom */}
        <div className="w-full bg-[#767676] max-w-[2000px] absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[52px]">
          <p className="textXs text-white">تمام حقوق مادی و معنوی این سایت متعلق به ایما است.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
