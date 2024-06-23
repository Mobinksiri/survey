"use client";

import { useApiCall } from "@/app/_apiCall/apiCall";
import { baseUrls } from "@/app/_apiCall/baseUrls";
import { setIsOpenUserRevoke } from "@/app/store/userRevoke";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const profilePaths = [
  {
    title: "حساب کاربری",
    href: "/profile",
  },
  {
    title: "پنل مدیریتی",
    href: "/profile/panel",
  },
  {
    title: "نتایج نظرسنجی",
    href: "/profile/panel/results",
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const revokeFunction = () => {
    dispatch(setIsOpenUserRevoke(true));
  };

  const { data } = useApiCall<any>({
    baseUrl: baseUrls?.rule,
    method: "post",
    url: "/permission/isServicePermitedBoolean",
    data: {
      userId: "",
      isroot: "",
      type: "1",
      access: "createPoll",
      records: {},
    },
  });

  return (
    <>
      {/* avatar */}
      <div className="col-span-4 overflow-hidden lg:w-auto rounded-md h-fit justify-around shadow-default flex mx-auto lg:mx-0 flex-row lg:flex-col">
        <Link
          href={"/profile"}
          className={`w-full cursor-pointer px-6 py-4 transition-all ${
            pathname == "/profile" ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          حساب کاربری
        </Link>
        {data?.hasAccess ? (
          <Link
            href={"/profile/panel"}
            className={`w-full cursor-pointer px-6 py-4 transition-all ${
              pathname == "/profile/panel" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            پنل مدیریتی
          </Link>
        ) : null}
        <Link
          href={"/profile/panel/results"}
          className={`w-full cursor-pointer px-6 py-4 transition-all ${
            pathname == "/profile/panel/results"
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }`}
        >
          نتایج نظرسنجی
        </Link>

        <div
          onClick={revokeFunction}
          className={`w-full cursor-pointer px-6 py-4 hover:bg-gray-50 transition-all`}
        >
          خروج از حساب کاربری
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
