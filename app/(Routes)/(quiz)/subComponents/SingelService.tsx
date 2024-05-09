import React from 'react';

const SingelService = ({ data }: { data: any }) => {
  return (
    <div className="w-full shadow-articlePost rounded-2xl p-2 lg:p-4 bg-white">
      <div className="flex flex-col justify-evenly h-full items-center">
        <i className={`fa fa-light text-[50px] text-[#6BAAEB] mb-4 fa-${data?.icon}`} />
        <p className="text-[16px] lg:text-[20px] font-bold leading-[28px] text-text1 mb-2">
          {data?.title}
        </p>
        <p className="text-[13px] lg:text-[16px] leading-[22px] font-normal text-[#858687]">
          {data?.subtitle}
        </p>
      </div>
    </div>
  );
};

export default SingelService;
