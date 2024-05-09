'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import SwiperButton from './SwiperButton';

// swiper imports
import './swiperCss.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from 'next/navigation';

const buttonClassName =
  'absolute w-[45px] h-[45px] border border-white bottom-0 lg:top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.1)] z-[10] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition-all shadow-[0px_4px_8px_0px_rgba(0,0,0,0.24)]';

const SwiperSlideContent: React.FC<{
  img: string;
}> = ({ img }) => {
  return (
    <div className="cursor-pointer relative w-full h-full rounded-2xl px-3 lg:px-0">
      <Image fill src={img} alt="background" className="w-full h-full rounded-2xl object-cover" />
    </div>
  );
};

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <SwiperButton
      className={`${buttonClassName} bottom-0 left-8`}
      onClick={() => swiper.slideNext()}
    >
      <i className="fa fa-regular fa-angle-left text-[20px] text-white" />
    </SwiperButton>
  );
};

const PrevButton = () => {
  const swiper = useSwiper();
  return (
    <SwiperButton className={`${buttonClassName} right-8`} onClick={() => swiper.slidePrev()}>
      <i className="fa fa-regular fa-angle-right text-[20px] text-white" />
    </SwiperButton>
  );
};

const CustomSlider: React.FC<{
  array: any[];
  shop?: boolean;
}> = ({ array, shop }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <div className={`relative overflow-x-hidden overflow-y-visible flex items-end pb-12`}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          className="!overflow-visible !w-full"
          spaceBetween={15}
          slidesPerView={1}
          loop
          grabCursor
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {array?.length > 1 && <NextButton />}
          <div className={`overflow-hidden rounded-2xl`}>
            {array?.map((img, index) => (
              <SwiperSlide
                onClick={() => {
                  if (img?.postCategoryId && img?.postId) {
                    router?.push('/journal/' + img?.postCategoryId + '/' + img?.postId);
                  }
                }}
                key={index}
                className={`${shop ? '!h-[280px] lg:!h-[480px]' : '!h-[274px] lg:!h-[374px]'}`}
              >
                {img?.url ? (
                  <a href={img?.url} target="_blank">
                    <SwiperSlideContent img={img?.imageUrl} />
                  </a>
                ) : (
                  <SwiperSlideContent img={img?.imageUrl} />
                )}
              </SwiperSlide>
            ))}
          </div>
          {array?.length > 1 && <PrevButton />}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomSlider;
