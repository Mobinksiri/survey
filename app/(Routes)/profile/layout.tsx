'use client';

import CustomInput from '@/app/_components/common/custom/CustomInput';
import ProfileSidebar from '../(profile)/profileSidebar/ProfileSidebar';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';
import { redirect, useParams, useRouter } from 'next/navigation';
import { profileSearchItems } from '@/app/_utils/profileSearchItems';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import Link from 'next/link';
import Image from 'next/image';
import userLayout from '@/app/_assets/other/profile/userbox.svg';

interface searchedItemProp {
  title: string;
  href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchedValue, searchedValueSet] = useState(null);
  const { singleTest } = useParams();

  const [searchedItems, searchedItemsSet] = useState<searchedItemProp[]>([]);

  const { userData } = useSelector(getUser);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!userData) {
      redirect('/');
    }
  }, [userData]);

  useEffectSkipFirstRender(() => {
    if (searchedValue && profileSearchItems) {
      const trimmedSearchedValue = searchedValue as string;
      if (trimmedSearchedValue?.trim()) {
        const foundedItems = profileSearchItems?.filter((item) =>
          item?.title?.trim().includes(trimmedSearchedValue?.trim()),
        );
        searchedItemsSet(foundedItems);
      }
    } else {
      searchedItemsSet([]);
    }
  }, [searchedValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchedItems.length > 0) {
        const selectedItem = searchedItems[0];
        redirect(selectedItem.href);
      }
    }
  };

  return (
    <div>
      <title>حساب کاربری</title>
      <div className="custom-container navigation-padding pb-[90px] lg:pb-0">
        <div className="lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))] lg:gap-8 gap-4">
          {/* left side category */}
          {!singleTest && (
            <div className="z-[8] fixed bottom-0 left-0 lg:block lg:col-span-4 lg:sticky lg:top-[105px] w-full lg:h-[calc(100vh-182px)]">
              {/* avatar */}

              <div
                onClick={() => router?.push('/profile/userDetail')}
                className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 border-[10px] border-[#F8F9FA] rounded-full cursor-pointer z-[9]"
              >
                <div className="relative bg-gray-100 rounded-full w-[110px] h-[110px] flex items-center justify-center cursor-pointer mx-auto">
                  {userData?.avatar?.id && userData?.avatar?.url ? (
                    <Image fill src={userData?.avatar?.url} alt="user" />
                  ) : (
                    <i className="fa fa-regular fa-user text-[30px]" />
                  )}
                </div>
              </div>

              {/* sidebar */}
              <div className="bg-white lg:overflow-hidden shadow-[0px_-4px_10px_-6px_#a7a7a7] lg:pt-[102px] lg:mt-[50px] lg:shadow-sidebar lg:rounded-3xl h-full">
                <div className="relative profile-sidebar-scrollBar lg:overflow-y-auto lg:pb-6 h-full lg:flex flex-col justify-between">
                  <ProfileSidebar />
                </div>
              </div>
            </div>
          )}

          {/* body */}
          <div
            className={`lg:w-full ${singleTest ? 'lg:col-[span_14_/_span_14]' : 'lg:col-span-10'}`}
          >
            {!singleTest && (
              <div className="mb-8 flex flex-col lg:flex-row items-center justify-between">
                <p className="hidden lg:block text-[#A29BFE] textSm font-bold">پنل کاربری ایما</p>
                <div className="w-full lg:w-[300px]">
                  <CustomInput
                    parentClassName="relative"
                    inputClassName="pr-10 !bg-transparent"
                    props={{
                      onKeyDown: handleKeyDown,
                    }}
                    placeholder="در پنل کاربری جستجو کنید..."
                    icon={
                      <i className="absolute text-text3 top-1/2 right-4 -translate-y-1/2 fa fa-regular fa-search" />
                    }
                    state={searchedValue}
                    setState={searchedValueSet}
                  >
                    {searchedValue && (
                      <>
                        <div className="z-[5] absolute bottom-0 translate-y-[calc(100%+4px)] overflow-hidden bg-white border border-gray-300 rounded-2xl left-0 w-full h-fit">
                          {searchedItems && searchedItems?.[0] ? (
                            searchedItems?.map((item: searchedItemProp, index: number) => {
                              return (
                                <Link
                                  href={item?.href}
                                  onClick={() => {
                                    searchedItemsSet([]);
                                    searchedValueSet(null);
                                  }}
                                  className="block cursor-pointer hover:bg-gray-50 transition-all p-2 border-b last:border-none border-b-gray-200"
                                  key={index}
                                >
                                  <p className="textSmm text-text1 font-normal">{item?.title}</p>
                                </Link>
                              );
                            })
                          ) : (
                            <div className="block cursor-pointer hover:bg-gray-50 transition-all p-2 border-b last:border-none border-b-gray-200">
                              <p className="textSmm text-text1 font-normal">نتیجه ای یافت نشد.</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CustomInput>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
