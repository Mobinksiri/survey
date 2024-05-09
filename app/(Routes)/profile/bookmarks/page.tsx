'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ShareDropdown from '@/app/_components/common/ShareDropdown';
import IconButton from '@/app/_components/common/iconsButton/iconButton';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import moment from 'moment-jalaali';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';
import Link from 'next/link';
import toast from 'react-hot-toast';
import testImage from '@/app/_assets/teacher.jpg';
import { SingelProduct } from '../../(shop)/SingelProduct';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import { iconList } from '../../(profile)/panel/azmoon/QuizPanel';
import PostCard from '@/app/_components/common/PostCard';
import useLikeFunction from '@/app/_utils/useLikeFunction';
import PostsFlex from '@/app/_components/common/PostsFlex';

const Tabbar = ({
  array,
  onClick,
  activeItem,
}: {
  array: { title: string }[];
  onClick: any;
  activeItem: string;
}) => {
  return (
    <div className="grid  lg:flex rounded-2xl p-4 lg:p-2 bg-[#F2F1FB] lg:w-fit mb-10">
      {array?.map((item, index) => {
        return (
          <p
            onClick={() => onClick(item)}
            className={`px-2 lg:px-4 py-2 rounded-2xl cursor-pointer lg:text-[14px] ${
              activeItem === item?.title ? 'bg-[#A29BFE] text-white' : ''
            }`}
            key={index}
          >
            {item?.title}
          </p>
        );
      })}
    </div>
  );
};

// typology items -----------
const TypologyItem = ({ item }: { item: any }) => {
  const [shareDropdownIsOpen, shareDropdownIsOpenSet] = useState(false);
  const openDropdown = () => {
    shareDropdownIsOpenSet((prev) => !prev);
  };

  return (
    <div className="bg-PostCardBg rounded-lg lg:rounded-3xl lg:shadow-articlePost border lg:border-none border-gray-200 p-4">
      <div className="relative w-full h-[200px] mb-4">
        <Image className="rounded-2xl object-cover" src={item?.image} alt={item?.name ?? ''} fill />
      </div>
      <h6 className="textMd text-text1 mb-2">{item?.name}</h6>
      <p className="text-text3 textSm mb-2 line-clamp-1">
        {item?.description ? stripHtmlTags(item?.description) : null}
      </p>
      <div className="flex items-center h-7">
        <p className="text-text3 textSmm flex items-center justify-center w-fit px-6 h-full bg-gray2 rounded-lg">
          <i className={`fa fa-solid fa-bookmark ml-2`} />
          <span>ذخیره شده</span>
        </p>
        <IconButton
          onClick={openDropdown}
          icon="share-nodes"
          parentClassName="w-7 h-full bg-gray2 relative mr-2"
          iconClassName="text-text3"
        >
          <ShareDropdown setIsOpen={shareDropdownIsOpenSet} isOpen={shareDropdownIsOpen} />
        </IconButton>
      </div>
    </div>
  );
};
const TypologySection = ({ data }: { data: any[] }) => {
  const MAXIMUM_POSTS_PER_PAGE = 6;

  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h5 className="textMd text-text1 font-medium">{data?.length} پروفایل</h5>
        {/* <CustomButton className="!w-fit px-4" variant="outline" type="button">
          ایجاد لیست جدید
        </CustomButton> */}
      </div>

      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mb-6">
        {data && data?.[0] ? (
          data?.slice(startIndex, endIndex)?.map((item, index) => {
            return <TypologyItem key={index} item={item} />;
          })
        ) : (
          <p className="textMd text-text3">پروفایلی ذخیره نکردید.</p>
        )}
      </div>
      {data && typeof data !== 'string' && data?.length && data?.length > MAXIMUM_POSTS_PER_PAGE ? (
        <CustomPagination
          activePage={activePage}
          activePageSet={setActivePage}
          itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
          totalItemsCount={data?.length}
        />
      ) : null}
    </div>
  );
};
// --------------------------

// course items ------

const CourseItem = ({ item }: { item: any }) => {
  const [shareDropdownIsOpen, shareDropdownIsOpenSet] = useState(false);
  const openDropdown = () => {
    shareDropdownIsOpenSet((prev) => !prev);
  };

  return (
    <div className="bg-PostCardBg rounded-lg lg:rounded-3xl lg:shadow-articlePost border lg:border-none border-gray-200 p-4">
      <div className="relative w-full h-[200px] mb-4">
        <Image className="rounded-2xl object-cover" src={item?.image} alt={item?.name ?? ''} fill />
      </div>
      <h6 className="textMd text-text1 mb-2">{item?.name}</h6>
      <p className="text-text3 textSm mb-2 line-clamp-1">
        {item?.description ? stripHtmlTags(item?.description) : null}
      </p>
      <div className="flex items-center h-7">
        <p className="text-text3 textSmm flex items-center justify-center w-fit px-6 h-full bg-gray2 rounded-lg">
          <i className={`fa fa-solid fa-bookmark ml-2`} />
          <span>ذخیره شده</span>
        </p>
        <IconButton
          onClick={openDropdown}
          icon="share-nodes"
          parentClassName="w-7 h-full bg-gray2 relative mr-2"
          iconClassName="text-text3"
        >
          <ShareDropdown setIsOpen={shareDropdownIsOpenSet} isOpen={shareDropdownIsOpen} />
        </IconButton>
      </div>
    </div>
  );
};
const CourseSection = ({ data }: { data: any[] }) => {
  const MAXIMUM_POSTS_PER_PAGE = 6;

  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h5 className="textMd text-text1 font-medium">{data?.length} پروفایل</h5>
        {/* <CustomButton className="!w-fit px-4" variant="outline" type="button">
          ایجاد لیست جدید
        </CustomButton> */}
      </div>

      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mb-6">
        {data && data?.[0] ? (
          data?.slice(startIndex, endIndex)?.map((item, index) => {
            return <CourseItem key={index} item={item} />;
          })
        ) : (
          <p className="textMd text-text3">پروفایلی ذخیره نکردید.</p>
        )}
      </div>
      {data && typeof data !== 'string' && data?.length && data?.length > MAXIMUM_POSTS_PER_PAGE ? (
        <CustomPagination
          activePage={activePage}
          activePageSet={setActivePage}
          itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
          totalItemsCount={data?.length}
        />
      ) : null}
    </div>
  );
};

// --------

// article items ------------
const ArticleSection = ({ data, refetch }: { data: any[]; refetch: any }) => {
  const MAXIMUM_POSTS_PER_PAGE = 6;

  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  const magazines =
    data && data?.length
      ? data?.map((mg: any) => ({
          journal: true,
          postImage: mg?.url,
          isLiked: mg?.isLiked,
          writerId: mg?.magWriterId,
          title: {
            value: mg?.title,
            className: 'textSm text-text1 font-normal min-h-[45px] line-clamp-2 mb-4',
          },
          author: {
            time: mg?.createdAt,
            profileImage: mg?.image?.url,
          },

          ...(mg?.hashtag
            ? {
                badgeList: [
                  <p
                    key={1}
                    className="textXs text-white font-normal rounded-lg bg-[#00B894] px-2 py-1"
                  >
                    {mg?.hashtag}
                  </p>,
                ],
              }
            : {}),
          catId: mg?.catId,
          id: mg?.id,
          tags: [
            {
              icon: 'clock',
              title: `${mg?.readingTime ?? 0} دقیقه`,
            },
            {
              icon: 'eye',
              title: mg?.numViews,
            },
            {
              icon: mg?.isSaved ? ' fa-solid fa-bookmark' : 'bookmark',
              title: mg?.saveCount ?? 0,
              save: true,
            },
            {
              icon: mg?.isLiked ? ' fa-solid fa-heart' : 'heart',
              title: mg?.likeCount ?? 0,
              like: true,
            },
          ],
          userId: mg?.userId,
          isSaved: mg?.isSaved,
          userName: mg?.magWriter,
        }))
      : [];

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h5 className="textMd text-text1 font-medium">{data?.length} مقالات</h5>
        {/* <CustomSelect /> */}
      </div>

      {/* list */}
      <PostsFlex
        title="مقاله ای"
        onClick={refetch}
        array={magazines?.slice(startIndex, endIndex)}
        className="relative z-[1] !min-h-[357.3px]"
        column="3"
      />
      {data && typeof data !== 'string' && data?.length && data?.length > MAXIMUM_POSTS_PER_PAGE ? (
        <CustomPagination
          activePage={activePage}
          activePageSet={setActivePage}
          itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
          totalItemsCount={data?.length}
        />
      ) : null}
    </div>
  );
};
// --------------------------

const ShopSection = ({ data, refetch }: { data: any[]; refetch: any }) => {
  const MAXIMUM_POSTS_PER_PAGE = 6;

  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  const filterArray = [
    {
      label: 'بر اساس تاریخ',
      value: 1,
    },
    {
      label: 'قیمت محصول (کم به زیاد)',
      value: 2,
    },
    {
      label: 'قیمت محصول (زیاد به کم)',
      value: 3,
    },
  ];

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h5 className="textMd text-text1 font-medium">{data?.length} محصول</h5>
        <CustomSelect options={filterArray} className="min-w-[200px]" />
      </div>

      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mb-6">
        {data?.slice(startIndex, endIndex)?.map((item, index) => {
          return <SingelProduct refetch={refetch} detail={item} key={index} />;
        })}
      </div>
      {data &&
        typeof data !== 'string' &&
        data?.length &&
        data?.length > MAXIMUM_POSTS_PER_PAGE && (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={data?.length}
          />
        )}
    </div>
  );
};

const TestSection = ({ data }: { data: any[] }) => {
  const MAXIMUM_POSTS_PER_PAGE = 6;

  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h5 className="textMd text-text1 font-medium">{data?.length} تست</h5>
        {/* <CustomSelect /> */}
      </div>

      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mb-6">
        {data && data?.[0] ? (
          data?.slice(startIndex, endIndex)?.map((item, index) => {
            return <PostCard key={index} detail={item} />;
          })
        ) : (
          <p className="textSm text-text3 font-normal">تستی ذخیره نکرده اید.</p>
        )}
      </div>
      {data && typeof data !== 'string' && data?.length && data?.length > MAXIMUM_POSTS_PER_PAGE ? (
        <CustomPagination
          activePage={activePage}
          activePageSet={setActivePage}
          itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
          totalItemsCount={data?.length}
        />
      ) : null}
    </div>
  );
};
// ------------

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let tabbarArray = [
    { title: 'تایپ شناسی ها', id: 3 },
    { title: 'مقالات', id: 1 },
    { title: 'محصولات', id: 2 },
    { title: 'تست ها', id: 4 },
    { title: 'آموزش ها', id: 22 },
  ];

  const tabChangeFunction = (clickedItem: { title: string; active: boolean }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = clickedItem?.title.trim();
    current.set('selected', value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const { data: saves, refetch } = useApiCall<any>({
    url: '/api/saves',
    params: {
      markType: tabbarArray?.find((item) => item?.title === searchParams.get('selected'))?.id ?? 3,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  const CoursePostsArray: any =
    saves && saves?.[0] && searchParams.get('selected') == tabbarArray?.[3]?.title
      ? saves?.map((item: any) => ({
          quiz: true,
          postIcon: iconList?.find((i) => i?.id === item?.imageId)?.icon,
          badgeList: [
            <p key={1} className="textXs text-text1 font-normal rounded-lg bg-[#fff] px-2 py-1">
              رایگان
            </p>,
          ],
          title: {
            value: item?.title,
            className: 'textMd text-text1 line-clamp-1 mb-2',
          },
          description: {
            value: item?.description ? stripHtmlTags(item?.description) : '',
            className: 'textSm text-text3 line-clamp-4 mb-8',
          },
          tags: [
            {
              icon: item?.isLiked ? ' fa-solid fa-heart' : 'heart',
              title: item?.likeCount ?? 0,
              like: true,
            },
            {
              icon: 'clock',
              title: `${item?.timeToAnswer} دقیقه`,
            },
            {
              icon: 'user',
              title: item?.fromAge + ' سال',
            },
          ],
          id: item?.id,
        }))
      : [];

  return (
    <div>
      <div className="bg-white lg:shadow-sidebar border lg:border-none border-gray-200 rounded-xl lg:rounded-3xl p-4 lg:p-8">
        <h3 className="textMd text-center lg:text-right lg:textXl text-text1 font-bold mb-4 lg:mb-8">
          ذخیره شده ها
        </h3>
        <Tabbar
          onClick={tabChangeFunction}
          activeItem={searchParams.get('selected') ?? tabbarArray?.[0]?.title}
          array={tabbarArray}
        />

        {(searchParams.get('selected') == tabbarArray?.[0]?.title ||
          !searchParams.get('selected')) && <TypologySection data={saves} />}
        {searchParams.get('selected') == tabbarArray?.[1]?.title && (
          <ArticleSection refetch={refetch} data={saves} />
        )}
        {searchParams.get('selected') == tabbarArray?.[2]?.title && (
          <ShopSection refetch={refetch} data={saves} />
        )}
        {searchParams.get('selected') == tabbarArray?.[3]?.title && (
          <TestSection data={CoursePostsArray} />
        )}
        {searchParams.get('selected') == tabbarArray?.[4]?.title && (
          <ShopSection refetch={refetch} data={saves} />
        )}
      </div>
    </div>
  );
};

export default Page;
