'use client';

import { useApiCall } from '@/app/_apiCall/apiCall';
import PostsFlex from '@/app/_components/common/PostsFlex';
import SectionTitle from '@/app/_components/common/SectionTitle';
import React, { useEffect, useState } from 'react';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import { iconList } from '../../(profile)/panel/azmoon/QuizPanel';
import { stripHtmlTags } from '@/app/_components/common/article/ArticlePost';

const MAXIMUM_POSTS_PER_PAGE = 12;

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activePage, setActivePage] = useState(1);
  const [categoriesList, categoriesListSet] = useState([]);

  const {
    data: categoryItems,
    isLoading,
    error,
    refetch,
  } = useApiCall<any>({
    url: `/api/pollOnCategoryId/${searchParams?.get('sortBy')}`,
    shouldCallApi: !!searchParams?.get('sortBy'),
  });

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  useEffect(() => {
    if (searchParams?.get('sortBy')) {
      if (categoryItems?.polls?.[0]) {
        categoriesListSet(
          categoryItems?.polls?.map((item: any) => ({
            quiz: true,
            isLiked: item?.isLiked,
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
                title: item?.LikeCount ?? 0,
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
          })),
        );
      }
    }
  }, [categoryItems?.polls, searchParams]);

  if (isLoading || error) return null;

  return (
    <div className="navigation-padding custom-container">
      <div className="flex items-center justify-between w-full">
        <SectionTitle
          titleClassName="!text-[28px]"
          title={`آزمون های "${categoryItems?.poll_category_ALL?.name ?? ''}"`}
        />
      </div>
      <PostsFlex
        array={categoriesList?.slice(startIndex, endIndex)}
        title="آزمونی"
        className="mb-[70px]"
        onClick={refetch}
      />
      {categoriesList &&
        categoriesList?.length &&
        categoriesList?.length > MAXIMUM_POSTS_PER_PAGE && (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={categoriesList?.length}
          />
        )}
    </div>
  );
};

export default Page;
