import React, { useState } from 'react';

interface Props {
  title: string;
  detail?: Item[];
}

interface Item {
  _count?: Record<string, number>;
  [key: string]: number | string | Record<string, number> | undefined;
  name: string;
}

const sumObjectValues = (obj: { [key: string]: number }): number => {
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
};

const calculateTotalCount = (data: Item[]): number => {
  return data.reduce((total, item) => {
    if (item._count && typeof item._count === 'object') {
      const countValues = Object.values(item._count);
      total += countValues.reduce((sum, value) => sum + value, 0);
    }
    return total;
  }, 0);
};

const calculatePercentage = (count: number, maxCount: number): string => {
  const percentage = Math.min((count / maxCount) * 100, 100);
  return percentage + '%';
};

const TypeRateBox = ({ title, detail = [] }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const totalNumber = calculateTotalCount(detail);

  return (
    <div className="relative w-full h-10 bg-white">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="select-none cursor-pointer px-4 py-[10px] w-full h-full rounded-2xl border border-[#D6D6D6] flex items-center justify-between"
      >
        <p className="textSmm text-text1 font-normal">
          {title} ({totalNumber})
        </p>
        <i className="fa fa-regular fa-chevron-down text-[12px] text-text1" />
      </div>
      <div
        className={`z-[2] shadow-category-item transition-all max-h-[180px] lg:max-h-[300px] overflow-y-auto px-4 py-[10px] w-full h-fit absolute mt-2 left-0 rounded-2xl bg-white border border-[#D6D6D6] ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
        }`}
      >
        {detail.length ? (
          detail.map((item, index) => {
            const count = sumObjectValues(item?._count || {});
            const maxCount = count < 100 ? 100 : count * 5;

            return (
              <div key={index} className="w-full mb-4 last:mb-0">
                <p className="textSmm text-text1 font-normal mb-2">
                  {item?.name} ({count})
                </p>
                <div
                  className="w-full h-2 bg-[#A964AD] rounded-[5px]"
                  style={{ width: calculatePercentage(count, maxCount) }}
                />
              </div>
            );
          })
        ) : (
          <p className="textSmm text-text3">دیتایی برای نمایش وجود ندارد</p>
        )}
      </div>
    </div>
  );
};

export default TypeRateBox;
