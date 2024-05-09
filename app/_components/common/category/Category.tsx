'use client';
import React, { useState } from 'react';
import CategoryItem from './CategoryItem';
import { motion } from 'framer-motion';
import developmentPys from '@/app/_assets/other/category/development-psychology.svg';
import MBTI from '@/app/_assets/other/category/MBTI.svg';
import bodyLanguage from '@/app/_assets/other/category/body-language.svg';
import counseling from '@/app/_assets/other/category/counseling.svg';
import brainNeuroscience from '@/app/_assets/other/category/brain-neuroscience.svg';
import character from '@/app/_assets/other/category/character.svg';
import enneagram from '@/app/_assets/other/category/enneagram.svg';
import psychologyLearning from '@/app/_assets/other/category/psychology-learning.svg';
import psychologySocial from '@/app/_assets/other/category/psychology-social.svg';
import psychotherapy from '@/app/_assets/other/category/psychotherapy.svg';
import all from '@/app/_assets/other/category/all.svg';
import { magazineCategoryArray } from '@/app/_interface';

export const iconList = [
  counseling,
  enneagram,
  developmentPys,
  psychologyLearning,
  psychologySocial,
  brainNeuroscience,
  psychotherapy,
  MBTI,
  bodyLanguage,
  character,
];

const Category = ({
  list,
  categoryActiveId,
  categoryActiveIdSet,
}: {
  list: magazineCategoryArray[];
  categoryActiveId: number | null;
  categoryActiveIdSet: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [activeBoxWidth, activeBoxWidthSet] = useState<string>('');
  const [activeBoxHeight, activeBoxHeightSet] = useState<string>('');
  const [activeOffsetTop, activeOffsetTopSet] = useState<string>('');
  const [activeOffsetLeft, activeOffsetLeftSet] = useState<string>('');

  const activeClassName = 'shadow-category-item rounded-3xl z-[10]';

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:lg:grid-cols-7 justify-center gap-6 lg:mt-[70px] mb-10 relative">
      <motion.div
        initial={{
          width: activeBoxWidth + 'px' ?? '0px',
          height: activeBoxHeight + 'px' ?? '0px',
          left: activeOffsetLeft + 'px' ?? '0px',
          top: Number(activeOffsetTop) - 10 + 'px' ?? '0px',
        }}
        animate={{
          width: activeBoxWidth + 'px' ?? '0px',
          height: activeBoxHeight + 'px' ?? '0px',
          left: activeOffsetLeft + 'px' ?? '0px',
          top: Number(activeOffsetTop) - 10 + 'px' ?? '0px',
        }}
        transition={{
          type: 'spring',
          duration: 0.6,
          bounce: 0.25,
          velocity: 0,
        }}
        className={`absolute z-[1] bg-PostCardBg ${activeClassName}`}
      >
        <div
          className={`absolute top-[calc(100%)] left-1/2 -translate-x-1/2 w-[1px] h-[10px] border-r-[10px] border-l-transparent border-l-[10px] border-r-transparent border-t-[10px] border-t-PostCardBg drop-shadow-sm transition-all`}
        />
      </motion.div>

      {/* category items */}
      {list.map((category: magazineCategoryArray) => (
        <CategoryItem
          key={category.id}
          name={category.name}
          icon={iconList[category?.iconId] ?? all}
          id={category.id}
          activeId={categoryActiveId}
          activeIdSet={categoryActiveIdSet}
          activeBoxWidthSet={activeBoxWidthSet}
          activeBoxHeightSet={activeBoxHeightSet}
          activeOffsetTopSet={activeOffsetTopSet}
          activeOffsetLeftSet={activeOffsetLeftSet}
        />
      ))}
    </section>
  );
};

export default Category;
