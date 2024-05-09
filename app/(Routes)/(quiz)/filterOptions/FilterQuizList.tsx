import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const options = [
  {
    label: 'جدیدترین',
    value: 'newest',
  },
  {
    label: 'محبوب ترین',
    value: 'Most-Popular',
  },
  {
    label: 'پرفروش ترین',
    value: 'Bestselling',
  },
  {
    label: 'ارزان ترین',
    value: 'cheapest',
  },
  {
    label: 'گران ترین',
    value: 'most-expensive',
  },
];

const FilterQuizList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tabChangeFunction = (
    clickedItem: { label: string; value: string },
    e?: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    e?.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = clickedItem?.value.toString();
    current.set('sortBy', value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="flex w-full lg:w-fit">
      <div className="hidden lg:flex">
        {options.map((item, i) => {
          return (
            <p
              onClick={(e) => {
                tabChangeFunction(item, e);
              }}
              className={`p-2 mx-4 transition-all cursor-pointer ${
                searchParams.get('sortBy') === item.value ? 'bg-[#EFEFEF]' : ''
              }  text-[12px] rounded-lg`}
              key={i}
            >
              {item.label}
            </p>
          );
        })}
      </div>
      <div className="lg:hidden w-full">
        <CustomSelect
          options={options}
          onChange={(e: { label: string; value: string }) => tabChangeFunction(e)}
        />
      </div>
    </div>
  );
};

export default FilterQuizList;
