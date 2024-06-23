"use client";

import { useApiCall } from "@/app/_apiCall/apiCall";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import Link from "next/link";
import React from "react";

const Item = ({
  title,
  icon,
  href,
  onClick,
}: {
  title: string;
  icon: string;
  href: string;
  onClick?: any;
}) => {
  return (
    <>
      <Link href={href ?? "/"}>
        <div className="border border-gray1 rounded-lg p-2 lg:p-4 hover:bg-gray-50 transition-all">
          <div className="flex items-center">
            <i className={`fa fa-regular fa-${icon} ml-3`} />
            <p className="textSm font-bold text-text1">{title}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default function Home() {
  const {} = useApiCall<any>({
    baseUrl: baseUrls?.rule,
    method: "post",
    url: "/permission/permissionService",
    data: {
      userId: "",
      isroot: "",
      type: "1",
      access: "createPoll",
      records: {},
    },
  });

  return (
    <div className=" ">
      <div className="p-6 rounded-md shadow-default">
        <h3 className="textLg text-text1 font-bold mb-6">پنل آزمون</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Item
            href="/profile/panel/azmoon"
            title="ایجاد آزمون"
            icon="circle-plus"
          />
          <Item
            href="/profile/panel/azmoon/category"
            title="دسته بندی"
            icon="list"
          />
        </div>
      </div>
    </div>
  );
}
