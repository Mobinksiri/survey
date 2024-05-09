'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';
import { iconList } from '../(profile)/panel/azmoon/QuizPanel';
import Video from 'next-video';
import Modal from '@/app/_components/common/modal/Modal';
import SoundPlayer from '@/app/_components/common/sound_player/SoundPlayer';
import Collapse from '@kunukn/react-collapse';
import QuizIconBack from '@/app/_assets/other/quiz/icons/quizIconBack.svg';

// icons
import rubika from '../../_assets/other/quiz/socialMedia/rubika.svg';
import bale from '@/app/_assets/other/quiz/socialMedia/bale.svg';
import telegram from '@/app/_assets/other/quiz/socialMedia/telegram.svg';
import eta from '@/app/_assets/other/quiz/socialMedia/eta.svg';
import instagram from '@/app/_assets/other/quiz/socialMedia/instagram.svg';
import Link from 'next/link';
import IconButton from '@/app/_components/common/iconsButton/iconButton';
import useSaveFunction from '@/app/_utils/useSaveFunction';
import useLikeFunction from '@/app/_utils/useLikeFunction';

const ShareLink = () => {
  return (
    <div className="flex md:justify-start justify-center">
      {[
        { image: rubika, href: 'https://rubika.ir/Eema_MBTI' },
        { image: eta, href: 'https://eitaa.com/Eema_MBTI' },
        { image: bale, href: 'https://ble.ir/eema_mbti' },
        { image: telegram, href: 'https://t.me/Eema_Mbti' },
        { image: instagram, href: 'https://instagram.com/Eema_Mbti' },
      ].map((src, index) => (
        <a
          className="ml-3 last:ml-0 p-[2px] rounded-md flex items-center justify-center text-center"
          key={index}
          href={src.href}
          target="_blank"
        >
          <Image src={src.image} alt={`social-${index}`} className="p-1 " />
        </a>
      ))}
    </div>
  );
};
const MainQuizContent = ({ data, refetch }: { data: any; refetch: any }) => {
  const [videoModalIsOpen, videoModalIsOpenSet] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    videoModalIsOpenSet(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoClose = () => {
    videoModalIsOpenSet(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const poll = data?.poll;

  const [soundIsOpen, soundIsOpenSet] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSoundClick = () => {
    soundIsOpenSet((prev) => !prev);
  };

  const handlePlayPause = (isNowPlaying: boolean) => {
    setIsPlaying(isNowPlaying);
  };

  const saveFunction = useSaveFunction(refetch);
  const likeFunction = useLikeFunction(refetch);

  return (
    <div className="h-fit w-full p-8 pb-6 shadow-articlePost rounded-2xl bg-white md:relative  ">
      <Modal isOpen={videoModalIsOpen} onClick={handleVideoClose}>
        <div className="bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[660px] h-fit rounded-lg">
          <div className="py-4 px-5 flex items-center justify-between">
            <h3 className="textMd text-text1">ویدیو معرفی آزمون</h3>
            <i
              onClick={handleVideoClose}
              className="fa fa-solid fa-close textMd cursor-pointer text-text1"
            />
          </div>
          <Video
            // className={!videoModalIsOpen ? '!pointer-events-none' : ''}
            className="!pointer-events-none"
            src={poll?.videourl}
            autoPlay={videoModalIsOpen}
            ref={videoRef}
          />
        </div>
      </Modal>

      <div className="flex h-full flex-col">
        <div className="flex items-center absolute top-4 left-4">
          <IconButton
            onClick={() => saveFunction({ id: poll?.id, markType: 4, isSaved: data?.isSave })}
            parentClassName="ml-2 bg-gray2"
            icon={data && data?.isSave ? ' fa-solid fa-bookmark' : 'bookmark'}
            iconClassName="text-text3"
          />
          <IconButton
            onClick={() => likeFunction({ id: poll?.id, markType: 4, isLiked: data?.isLiked })}
            parentClassName="ml-2 bg-gray2"
            icon={data && data?.isLiked ? ' fa-solid fa-heart' : 'heart'}
            iconClassName="text-text3"
          />
        </div>
        <div className="flex h-full flex-col justify-between md:flex-row mb-8">
          <div className="relative object-cover h-[176px] w-[176px]">
            <Image
              alt="image"
              src={iconList?.find((i) => i?.id === poll?.imageId)?.icon ?? ''}
              fill
              className="z-[10]"
            />
            <Image src={QuizIconBack} alt="icon" className="absolute top-0 w-full h-full" />
          </div>
          <div className="flex flex-col mt-4 lg:mt-0 lg:w-[calc(100%-204px)]">
            {/* title */}
            <p className="text-[18px] md:text-[24px] font-extrabold mb-2">{poll?.title}</p>
            {/* type */}
            <p className="mb-6 text-[#858687] text-[12px] md:text-[14px]">
              دسته بندی :{' '}
              <Link
                href={`/quiz/category?sortBy=${data?.poll_category?.id}`}
                className="textSmm text-text1 font-bold"
              >
                {data?.poll_category?.name}
              </Link>
            </p>
            {/* about */}
            <p className="text-ellipsis justify-start text-[14px] text-[#555] md:text-[16px]">
              {poll?.about ? stripHtmlTags(poll?.about) : null}
            </p>
          </div>
          div
        </div>
        <div className="flex flex-col gap-4 md:flex-row items-center w-full justify-between pt-4 border-t border-t-gray-300">
          <div className="flex w-full gap-2 justify-evenly md:justify-start md:w-fit h-full">
            {poll?.voiceurl && (
              <ButtonQuiz icon="microphone" onClick={handleSoundClick} title="درباره تست بشنوید" />
            )}
            {poll?.videourl && (
              <ButtonQuiz icon="play" onClick={handleVideoClick} title="ویدیو معرفی آزمون" />
            )}
          </div>
          <ShareLink />
        </div>
        <Collapse className={`w-full h-fit`} transition="all 0.4s" isOpen={soundIsOpen}>
          <SoundPlayer
            url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with your audio URL
            playing={isPlaying}
            onPlayPause={handlePlayPause}
          />
        </Collapse>
      </div>
    </div>
  );
};

export default MainQuizContent;

const ButtonQuiz = ({
  onClick,
  title,
  icon,
}: {
  onClick: (e?: any) => void;
  title: string;
  icon: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`textSmm text-text1 flex cursor-pointer justify-evenly items-center border border-black rounded-full py-2 lg:px-3 w-1/2 lg:!w-fit`}
    >
      <i className={`fa fa-regular fa-${icon} ml-1 hidden lg:block`} />
      <span>{title}</span>
    </div>
  );
};
