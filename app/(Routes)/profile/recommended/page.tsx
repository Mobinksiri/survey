'use client';
import Image from 'next/image';
import React from 'react';
import { useApiCall } from '@/app/_apiCall/apiCall';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PostCard from '@/app/_components/common/PostCard';
import { iconList } from '../../(profile)/panel/azmoon/QuizPanel';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';
import { SingelProduct } from '../../(shop)/SingelProduct';

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
            className={`px-2 lg:px-4 py-2 rounded-2xl cursor-pointer lg:text-[14px] transition-all ${
              activeItem === item?.title
                ? 'bg-[#A29BFE] hover:bg-[#a29bfebd] text-white'
                : 'hover:bg-[rgba(0,0,0,0.05)]'
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

const MagazineContent = ({ array, refetch }: { array: any[]; refetch: any }) => {
  return (
    <>
      {array && array?.length ? (
        array?.map((item, index) => <PostCard onClick={refetch} key={index} detail={item} />)
      ) : (
        <p className="textSm font-normal text-text3">گزینه ای پیدا نشد</p>
      )}
    </>
  );
};

const tabbarArray = [{ title: 'مجله' }, { title: 'آزمون' }, { title: 'فروشگاه' }];

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, refetch } = useApiCall<any>({ url: '/api/usersgetAllUserSeggestion' });

  const tabChangeFunction = (clickedItem: { title: string; active: boolean }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = clickedItem?.title.trim();
    current.set('selected', value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  const magazines =
    data?.magazineRecords?.[0] &&
    data?.magazineRecords?.map((mg: any) => {
      return {
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
          // {
          //   icon: 'clock',
          //   title: `${mg?.readingTime ?? 0} دقیقه`,
          // },
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
      };
    });

  const polls: any =
    data?.pollRecords?.[0] &&
    data?.pollRecords?.map((item: any) => ({
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
        value: stripHtmlTags(item?.description),
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
    }));

  return (
    <div>
      <div className="bg-white border lg:border-none border-gray-200 lg:shadow-sidebar rounded-3xl p-4 lg:p-8 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="textXl text-text1 font-bold mb-4 lg:mb-8">پیشنهادات</h3>
          <Tabbar
            onClick={tabChangeFunction}
            activeItem={searchParams.get('selected') ?? tabbarArray?.[0]?.title}
            array={tabbarArray}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(searchParams.get('selected') == tabbarArray?.[0]?.title ||
            !searchParams?.get('selected')) && (
            <MagazineContent refetch={refetch} array={magazines} />
          )}
          {searchParams.get('selected') == tabbarArray?.[1]?.title && (
            <MagazineContent refetch={refetch} array={polls} />
          )}
          {searchParams.get('selected') == tabbarArray?.[2]?.title && (
            <>
              {data?.productRecords && data?.productRecords?.[0] ? (
                data?.productRecords
                  ?.slice(0, 4)
                  ?.map((item: any, index: any) => (
                    <SingelProduct refetch={refetch} detail={item} key={index} />
                  ))
              ) : (
                <span>هیج محصولی وجود ندارد</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
