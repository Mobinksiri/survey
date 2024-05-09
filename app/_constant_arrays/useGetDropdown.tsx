'use client';

import React, { useEffect, useState } from 'react';
import { dropdownInterface } from '../_interface';
import { dropdown } from './dropdown';
import { useApiCall } from '../_apiCall/apiCall';

const useGetDropdown = () => {
  const [dropdownArray, dropdownArraySet] = useState<dropdownInterface[]>(dropdown);

  const { data: magazineCategoryList } = useApiCall<any>({
    url: '/api/get-magCategory',
    loading: false,
  });

  const { data: pollCategoryList } = useApiCall<any>({
    url: '/api/get-pollCategory',
  });
  const { data: pollList } = useApiCall<any>({
    url: '/api/poll',
    loading: false,
  });
  const { data: forumCategoryList } = useApiCall<any>({
    url: '/api/get-forumCategory',
    loading: false,
  });
  const { data: forumList } = useApiCall<any>({
    url: '/api/forum',
    loading: false,
  });

  useEffect(() => {
    if (magazineCategoryList && magazineCategoryList.length > 0) {
      let magazineItems = magazineCategoryList
        ?.filter((i: any) => !i?.parent)
        ?.slice(0, 4)
        ?.map((item: any) => ({
          title: item.name,
          href: `journal/${item.id}`,
          hrefs:
            item.magazineChild?.map((subItem: any) => ({
              title: subItem.name,
              href: `journal/${item.id}?subCategory=${subItem.id}`,
            })) ?? [],
        }));

      const foundedItemIndex = dropdown.findIndex((item) => item.id === 'journal');
      if (foundedItemIndex !== -1) {
        const foundedItem = dropdown[foundedItemIndex];
        dropdownArraySet((prev) => [
          ...prev.slice(0, foundedItemIndex),
          {
            ...foundedItem,
            items: [...magazineItems],
          },
          ...prev.slice(foundedItemIndex + 1),
        ]);
      }
    }
  }, [magazineCategoryList]);

  useEffect(() => {
    if (pollCategoryList && pollCategoryList.length > 0) {
      let magazineItems = pollCategoryList?.slice(0, 4)?.map((item: any) => ({
        title: item.name,
        href: `quiz/category?sortBy=${item.id}`,
        hrefs:
          (pollList?.polls?.length > 0
            ? pollList?.polls
                ?.filter((_poll: any) => _poll?.poll_category?.id === item?.id)
                ?.slice(0, 5)
                ?.map((subItem: any) => ({
                  title: subItem.title,
                  href: `quiz/${subItem.id}`,
                }))
            : []) ?? [],
      }));

      const foundedItemIndex = dropdown.findIndex((item) => item.id === 'quiz');
      if (foundedItemIndex !== -1) {
        const foundedItem = dropdown[foundedItemIndex];
        dropdownArraySet((prev) => [
          ...prev.slice(0, foundedItemIndex),
          {
            ...foundedItem,
            items: [...magazineItems],
          },
          ...prev.slice(foundedItemIndex + 1),
        ]);
      }
    }
  }, [pollCategoryList, pollList]);

  useEffect(() => {
    if (forumCategoryList && forumCategoryList.length > 0) {
      let magazineItems = forumCategoryList?.slice(0, 4)?.map((item: any) => ({
        title: item.name,
        href: `forum/categories/${item.id}`,
        hrefs:
          (forumList?.length > 0
            ? forumList
                ?.filter((_forum: any) => _forum?.catId === item?.id)
                ?.slice(0, 5)
                ?.map((subItem: any) => ({
                  title: subItem.title,
                  href: `forum/${item.id}/${subItem?.id}`,
                }))
            : []) ?? [],
      }));

      const foundedItemIndex = dropdown.findIndex((item) => item.id === 'Discussion forum');
      if (foundedItemIndex !== -1) {
        const foundedItem = dropdown[foundedItemIndex];
        dropdownArraySet((prev) => [
          ...prev.slice(0, foundedItemIndex),
          {
            ...foundedItem,
            items: [...magazineItems],
          },
          ...prev.slice(foundedItemIndex + 1),
        ]);
      }
    }
  }, [forumCategoryList, forumList]);

  return dropdownArray;
};

export default useGetDropdown;
