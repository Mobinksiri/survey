import React from 'react';
import Pagination from 'react-js-pagination';

interface customPaginationProps {
  activePage: number;
  activePageSet: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed?: number;
  activeClass?: string;
}

const CustomPagination = ({
  activePage,
  activePageSet,
  className,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  activeClass,
}: customPaginationProps) => {
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed ?? 4}
      onChange={(e) => activePageSet(e)}
      innerClass={`flex justify-center ${className}`}
      itemClass="w-8 h-8 ml-4 last:ml-0 flex items-center justify-center rounded-lg text-text1 transition-all cursor-pointer"
      nextPageText={<i className="fa fa-regular fa-chevron-left" />}
      prevPageText={<i className="fa fa-regular fa-chevron-right" />}
      lastPageText={<i className="fa fa-regular fa-chevrons-left" />}
      firstPageText={<i className="fa fa-regular fa-chevrons-right" />}
      activeClass={`bg-green1 text-white ${activeClass}`}
      disabledClass="pointer-events-none opacity-30"
    />
  );
};

export default CustomPagination;
