"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { iconList } from "./QuizPanel";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import toast from "react-hot-toast";

const Item = ({ item, removePoll }: { item: any; removePoll: any }) => {
  const foundedIcon = iconList?.find((i) => i?.id == item?.imageId);

  const copyLinkFunction = () => {
    if (window && navigator) {
      const url = window?.location?.origin + "/quiz/" + item?.id;
      navigator.clipboard.writeText(url);
      toast.success("لینک کپی شد.");
    }
  };

  return (
    <div className="col-span-1 flex items-center justify-between px-4 py-3 last:mb-0 border border-[#D4D4D4] rounded-md">
      <div className="flex items-center">
        <Image
          width={35}
          height={35}
          src={foundedIcon?.icon}
          className="ml-4"
          alt=""
        />
        <Link href={`/profile/panel/azmoon/${item?.id}`}>
          <p className="cursor-pointer textSmm text-text1">{item?.title}</p>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <CustomButton
          onClick={copyLinkFunction}
          variant="outline"
          className="!w-fit"
        >
          کپی لینک
        </CustomButton>
        <Link href={`/profile/panel/azmoon/${item?.id}`}>
          <CustomButton variant="outline" className="!w-fit">
            سوالات
          </CustomButton>
        </Link>
        <i
          className="fa fa-solid textSmm fa-trash text-red p-1 cursor-pointer"
          onClick={() => removePoll(item?.id)}
        />
      </div>
    </div>
  );
};

const CreatedQuiz = ({
  array,
  removePoll,
}: {
  array: any[];
  removePoll: any;
}) => {
  return (
    <>
      <p className="textMd text-text1 mb-6 font-extrabold">
        آزمون های اضافه شده
      </p>
      <div className="grid grid-cols-2 gap-4">
        {array && array?.length
          ? array?.map((item, index) => {
              return <Item removePoll={removePoll} item={item} key={index} />;
            })
          : null}
      </div>
      {array?.length ? null : (
        <p className="textSm font-bold text-text1">آزمونی ثبت نشده است</p>
      )}
    </>
  );
};

export default CreatedQuiz;
