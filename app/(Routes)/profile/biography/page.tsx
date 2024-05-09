'use client';

import CustomInput from '@/app/_components/common/custom/CustomInput';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import personImage from '@/app/_assets/other/profile/person.svg';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import aniagramImage from '@/app/_assets/other/profile/aniagram.svg';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import Modal from '@/app/_components/common/modal/Modal';
import telegram from '@/app/_assets/other/footer/telegram.svg';
import eta from '@/app/_assets/other/footer/eta.svg';
import nody from '@/app/_assets/other/footer/nody.svg';
import bale from '@/app/_assets/other/footer/bale.svg';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';
import { aniagram_types, mbti_types, temperment_types } from '@/app/_utils/types';
import moment from 'moment-jalaali';
import { useApiCall } from '@/app/_apiCall/apiCall';

const options = [
  {
    label: 'دسته بندی تیپ های شخصیتی',
    value: '1',
  },
  {
    label: 'توصیف صفات شخصیتی',
    value: '2',
  },
  {
    label: 'آسیب های روانی',
    value: '3',
  },
  {
    label: 'هوش',
    value: '4',
  },
  {
    label: 'سرگرمی',
    value: '5',
  },
];

const Item = ({ item, onClick }: { item: any; onClick: any }) => {
  return (
    <div className="w-full p-6 shadow-category-item rounded-3xl">
      <div className="flex items-center justify-center flex-col p-4 bg-[#A29BFE1A] rounded-3xl mb-4">
        <Image src={aniagramImage} alt="anigram" className="mb-4" />
        <p className="textMd text-[#A29BFE] font-bold">{item?.poll?.title}</p>
      </div>
      <div className="">
        <p
          className="textSm text-text3 line-clamp-4 mb-6"
          dangerouslySetInnerHTML={{ __html: item?.poll?.about }}
        />
        <div
          onClick={onClick}
          className="flex items-center w-full justify-between text-white bg-[#A29BFE] hover:bg-[#9891ff] transition-all cursor-pointer px-4 py-2 rounded-xl"
        >
          <span>نتیجه تست</span>
          <i className="fa fa-regular fa-chevron-left" />
        </div>
      </div>
    </div>
  );
};

const ShareModal = ({
  shareModalIsOpen,
  shareModalIsOpenSet,
}: {
  shareModalIsOpen: any;
  shareModalIsOpenSet: any;
}) => {
  return (
    <Modal isOpen={shareModalIsOpen} onClick={() => shareModalIsOpenSet(false)}>
      <div className="p-6 bg-white w-[460px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">اشتراک گذاری</h4>

        <div className="flex mb-7">
          {/* image */}
          <Image
            src={personImage}
            alt="profile image"
            width={120}
            height={120}
            className="ml-6 w-[120px] min-h-full object-cover rounded-xl"
          />

          {/* detail of user */}
          <div className="w-full">
            <h3 className="textMd text-text1 mb-4">کیوان نیک اندیش</h3>
            <div className="w-full">
              <div className="grid grid-cols-2 w-full mb-2">
                <p className="textSm text-text3 font-normal whitespace-nowrap">تایپ mbti</p>
              </div>
              <div className="grid grid-cols-2 w-full mb-2">
                <p className="textSm text-text3 font-normal whitespace-nowrap">تایپ انیاگرام</p>
              </div>
              <div className="grid grid-cols-2 w-full">
                <p className="textSm text-text3 font-normal whitespace-nowrap">
                  تایپ در سایر متدها
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-6">
          {[
            // { image: instagram, href: '' },
            { image: nody, href: 'https://eitaa.com/Eema_MBTI' },
            { image: eta, href: 'https://rubika.ir/Eema_MBTI' },
            { image: bale, href: 'https://ble.ir/eema_mbti' },
            { image: telegram, href: 'https://t.me/Eema_Mbti' },
          ].map((src, index) => (
            <div
              key={index}
              className="w-11 h-11 flex items-center justify-center bg-text3 ml-4 last:ml-0 rounded-2xl transition-all cursor-pointer"
            >
              <a target="_blank" href={src.href}>
                <Image src={src.image} alt={`social-${index}`} />
              </a>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <p className="textSm text-text1 mb-1 font-normal">لینک</p>
          <div className="rounded-2xl border border-gray1 flex items-center justify-between px-4 py-2">
            <span>http://loremsaz.com/lorem_ipsum</span>
            <i className="fa fa-regular fa-copy text-text1 text-[18px]" />
          </div>
        </div>

        <div className="flex w-fit mr-auto">
          <CustomButton
            className="!w-fit px-4"
            variant="outline"
            type="button"
            onClick={() => shareModalIsOpenSet(false)}
          >
            بستن
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const AddFriendsModal = ({
  shareModalIsOpen,
  shareModalIsOpenSet,
}: {
  shareModalIsOpen: any;
  shareModalIsOpenSet: any;
}) => {
  const [email, emailSet] = useState(null);
  const [message, messageSet] = useState(null);

  return (
    <Modal isOpen={shareModalIsOpen} onClick={() => shareModalIsOpenSet(false)}>
      <div className="p-6 bg-white w-[460px] rounded-2xl">
        <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">دعوت دوستان</h4>

        <div className="mb-8">
          <CustomInput
            parentClassName="mb-4"
            state={email}
            setState={emailSet}
            type="text"
            label="ایمیل"
          />
          <CustomInput
            parentClassName=""
            state={message}
            setState={messageSet}
            type="textarea"
            label="پیام"
          />
        </div>

        <div className="flex w-fit mr-auto">
          <CustomButton
            className="!w-fit px-4 ml-4"
            variant="outline"
            type="button"
            onClick={() => shareModalIsOpenSet(false)}
          >
            انصراف
          </CustomButton>
          <CustomButton
            className="!w-fit px-4"
            variant="primary"
            type="button"
            onClick={() => shareModalIsOpenSet(false)}
          >
            ارسال دعوت
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

const array = Array.from(Array(100).keys());
const MAXIMUM_POSTS_PER_PAGE = 9;

const Page = () => {
  const [activePage, setActivePage] = useState(1);
  const [shareModalIsOpen, shareModalIsOpenSet] = useState(false);
  const [addFriendsModalIsOpen, addFriendsModalIsOpenSet] = useState(false);

  const { data } = useApiCall<any>({
    url: '/api/getPollResults',
  });

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  const userDetailTitleRef = useRef<HTMLHeadingElement | null>(null);
  const isFirstRender = useRef(true);

  useEffectSkipFirstRender(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (userDetailTitleRef.current) {
        userDetailTitleRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [activePage]);

  const { userData } = useSelector(getUser);

  // types
  let mbtiType = mbti_types?.find((item) => item?.value == userData?.mbti)?.label;
  let aniagramType = aniagram_types?.find((item) => item?.value == userData?.mbti)?.label;
  let temperment = temperment_types?.find((item) => item?.value == userData?.mbti)?.label;

  // get age of user
  let dateOfBirth = moment(userData.birthDate, 'jYYYY/jMM/jDD');
  let currentDate = moment();

  let age = currentDate.diff(dateOfBirth, 'years');

  let createdAtDate = moment(userData.createdAt, 'YYYY/MM/DD');
  let createdAtCurrent = moment();

  let date = createdAtCurrent.diff(createdAtDate, 'years');

  const [hover, hoverSet] = useState(false);
  const [modalIsOpen, modalIsOpenSet] = useState<any>(null);

  const onClick = (item: any) => {
    modalIsOpenSet(item);
  };

  return (
    <div>
      <ShareModal shareModalIsOpen={shareModalIsOpen} shareModalIsOpenSet={shareModalIsOpenSet} />
      <AddFriendsModal
        shareModalIsOpen={addFriendsModalIsOpen}
        shareModalIsOpenSet={addFriendsModalIsOpenSet}
      />

      <Modal
        isOpen={!!modalIsOpen}
        onClick={() => {
          modalIsOpenSet(null);
        }}
      >
        <div className="relative bg-white shadow-comment w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[calc(100vw-50px)] lg:max-w-[90%] lg:mx-auto h-fit p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="textLg text-text1">نتیجه آزمون {modalIsOpen?.poll?.title}</h4>
            <i
              className="fa fa-solid fa-close p-2 text-[20px] cursor-pointer"
              onClick={() => {
                modalIsOpenSet(null);
              }}
            />
          </div>
          <div className="rounded-md">
            {modalIsOpen?.mostRepeatedValues &&
            Object?.entries(modalIsOpen?.mostRepeatedValues)?.length
              ? Object?.entries(modalIsOpen?.mostRepeatedValues)?.map(
                  ([key, value]: any, index: number) => {
                    if (key === 'mbtiRate' && value) {
                      return (
                        <div className="p-6 border w-full rounded-md mb-4 last:mb-0" key={index}>
                          <p className="textMd text-text1">تایپ mbti شما {value?.name} است:</p>
                          <p
                            className="mt-4 textSmm text-text3"
                            dangerouslySetInnerHTML={{ __html: value?.content }}
                          />
                        </div>
                      );
                    }
                    if (key === 'aniagramRate' && value) {
                      return (
                        <div className="p-6 border w-full rounded-md mb-4 last:mb-0" key={index}>
                          <p className="textMd text-text1">تایپ انیاگرام شما {value?.name} است:</p>
                          <p
                            className="mt-4 textSmm text-text3"
                            dangerouslySetInnerHTML={{ __html: value?.content }}
                          />
                        </div>
                      );
                    }
                    if (key === 'aniagraminstinctRate' && value) {
                      return (
                        <div className="p-6 border w-full rounded-md mb-4 last:mb-0" key={index}>
                          <p className="textMd text-text1">
                            تایپ غرایز انیاگرام شما {value?.name} است:
                          </p>
                          <p
                            className="mt-4 textSmm text-text3"
                            dangerouslySetInnerHTML={{ __html: value?.content }}
                          />
                        </div>
                      );
                    }
                    if (key === 'tempermentRate' && value) {
                      return (
                        <div className="p-6 border w-full rounded-md mb-4 last:mb-0" key={index}>
                          <p className="textMd text-text1">تایپ مزاج شما {value?.name} است:</p>
                          <p
                            className="mt-4 textSmm text-text3"
                            dangerouslySetInnerHTML={{ __html: value?.content }}
                          />
                        </div>
                      );
                    }
                  },
                )
              : null}
          </div>
        </div>
      </Modal>

      <div className="bg-white shadow-sidebar rounded-3xl p-5 pb-10 mb-6">
        {/* 1 */}
        <div className="flex p-6 rounded-2xl bg-[#FBFBFB] mb-8">
          {/* image */}
          <div
            onMouseOver={() => hoverSet(true)}
            onMouseLeave={() => hoverSet(false)}
            className="relative w-[262px] ml-6 min-h-full rounded-xl"
          >
            {/* <div
              className={`w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] rounded-xl overflow-hidden transition-all cursor-pointer ${
                hover ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } z-[2]`}
            >
              <p className="textSm font-bold bg-white text-text3 px-2 py-1 rounded-lg">تغییر عکس</p>
            </div> */}
            <Image
              src={userData?.avatar?.url ?? personImage}
              alt="profile image"
              className="object-cover"
              fill
            />
          </div>

          {/* detail of user */}
          <div className="w-[calc(100%-286px)]">
            <h3 className="textXl text-text1 mb-6">
              {userData?.name + ' ' + userData?.familyname}
            </h3>
            <div className="mb-5 w-full">
              <div className="grid grid-cols-2 w-full mb-2">
                <p className="textSm font-normal text-text3">
                  {(mbtiType ?? null) +
                    ' - ' +
                    (aniagramType ?? null) +
                    ' - ' +
                    (temperment ?? null)}
                </p>
                <p className="textSm font-normal text-text3">
                  {userData?.birthDate ? age + ' سال' : 'وارد نشده است'}
                </p>
              </div>
              <div className="grid grid-cols-2 w-full mb-2">
                <p className="textSm font-normal text-text3">{date ?? 0} سال همراهی با ایما</p>
                <p className="textSm font-normal text-text3">
                  {userData?.gender == 1 ? 'مرد' : 'زن'}
                </p>
              </div>
              <div className="grid grid-cols-2 w-full">
                <p className="textSm font-normal text-text3">کاربر فعال</p>
                <p className="textSm font-normal text-text3">{userData?.city ?? 'نامشخص'}</p>
              </div>
            </div>
            <p className="textSmm text-text3 mb-6">{userData?.bio}</p>
            <div className="flex">
              {/* <CustomButton
                type="button"
                variant="outline"
                className="!w-fit px-6 ml-4 flex items-center"
                onClick={() => shareModalIsOpenSet(true)}
              >
                <i className="fa fa-regular fa-share-nodes ml-3" />
                اشتراک گذاری
              </CustomButton> */}
              <CustomButton
                type="button"
                variant="primary"
                className="!w-fit px-6 flex items-center"
                onClick={() => addFriendsModalIsOpenSet(true)}
              >
                <i className="fa fa-regular fa-plus ml-3" />
                دعوت دوستان
              </CustomButton>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div>
          <h3 ref={userDetailTitleRef} className="textXl text-text1 mb-5">
            ویژگی های شخصیتی
          </h3>
          <div className="flex items-center justify-between mb-6">
            <p className="textSm text-text3 font-light">{data?.length} تست</p>
            <CustomSelect className="min-w-[300px]" options={options} />
          </div>

          {/* grid */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {data &&
              typeof data !== 'string' &&
              data?.length &&
              data?.slice(startIndex, endIndex).map((item: any, index: any) => {
                return <Item onClick={() => onClick(item)} item={item} key={index} />;
              })}
          </div>
          <div>
            {data &&
              typeof data !== 'string' &&
              data?.length &&
              data?.length > MAXIMUM_POSTS_PER_PAGE && (
                <CustomPagination
                  activePage={activePage}
                  activePageSet={setActivePage}
                  itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
                  totalItemsCount={data?.length}
                  activeClass="!bg-[#A29BFE]"
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
