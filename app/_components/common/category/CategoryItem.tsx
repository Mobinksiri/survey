'use client';

import React, { useEffect, useRef } from 'react';
import Ellipse from '@/app/_assets/other/category/category-icon-ellipse.svg';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface categoryItem {
  name: string;
  icon: StaticImport;
  id: number;
  activeId: number | null;
  activeIdSet: React.Dispatch<React.SetStateAction<number | null>>;
  activeBoxWidthSet: React.Dispatch<React.SetStateAction<string>>;
  activeBoxHeightSet: React.Dispatch<React.SetStateAction<string>>;
  activeOffsetTopSet: React.Dispatch<React.SetStateAction<string>>;
  activeOffsetLeftSet: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryItem = ({
  name,
  icon,
  id,
  activeId,
  activeIdSet,
  activeBoxWidthSet,
  activeBoxHeightSet,
  activeOffsetTopSet,
  activeOffsetLeftSet,
}: categoryItem) => {
  const categoryItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeId == Number(categoryItemRef?.current?.id)) {
      activeBoxWidthSet(`${categoryItemRef?.current?.offsetWidth}`);
      activeBoxHeightSet(`${categoryItemRef?.current?.offsetHeight}`);
      activeOffsetTopSet(`${categoryItemRef?.current?.offsetTop}`);
      activeOffsetLeftSet(`${categoryItemRef?.current?.offsetLeft}`);
    }
  }, [activeBoxHeightSet, activeBoxWidthSet, activeId, activeOffsetLeftSet, activeOffsetTopSet]);

  const categoryActiveIdChangeFunction = (id: number) => {
    activeIdSet(Number(id));
  };

  return (
    <div
      id={id.toString()}
      onClick={() => categoryActiveIdChangeFunction(id)}
      className={`relative w-full max-w-[250px] p-5 flex flex-col items-center justify-start border border-transparent transition-all cursor-pointer z-[2] ${
        activeId == id
          ? '-translate-y-2'
          : '-translate-y-0 hover:bg-[#FBFBFB] hover:scale-[1.075] rounded-3xl'
      }`}
      ref={categoryItemRef}
    >
      <div className="relative w-[88px] h-[88px] mb-4">
        <Image src={Ellipse} alt="icon background" />
        <Image
          src={icon}
          alt="icon"
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="textSm text-[#272727] max-w-[120px] text-center">{name}</div>
    </div>
  );
};

export default CategoryItem;
