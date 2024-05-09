/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomPagination from '@/app/_components/common/custom/CustomPagination';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MAXIMUM_POSTS_PER_PAGE = 6;

const access_options = [
  {
    label: 'کاربر',
    value: 0,
  },
  {
    label: 'ادمین',
    value: 1,
  },
  {
    label: 'سوپر ادمین',
    value: 2,
  },
];

const UserComponent = ({ item, refetch }: { item: any; refetch: any }) => {
  const [userAccess, userAccessSet] = useState<any>(null);

  useEffect(() => {
    if (item?.isAdmin) {
      userAccessSet(access_options?.find((i) => item?.adminType === i?.value));
    } else {
      userAccessSet(access_options?.[0]);
    }
  }, [item]);

  const handleUpdateUser = () => {
    return apiCall({
      url: `/api/users/updateUser/${item?.id}`,
      method: 'post',
      data: {
        ...item,
        adminType: userAccess?.value,
        isAdmin: !!userAccess?.value,
      },
      callback: (res, er) => {
        if (res) {
          refetch();
          toast?.success('دسترسی کاربر با موفقیت ویرایش شد.');
        }
      },
    });
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md mb-2 last:mb-0 lg:flex lg:items-center lg:justify-between">
      <div className="flex flex-col w-full mb-4">
        <div className="flex items-center mb-4">
          <p className="textSm text-text1 font-extrabold ml-2">نام کاربر:</p>
          <p className="textSm text-text3 font-normal">{item?.name}</p>
        </div>
        <div className="flex items-center">
          <p className="textSm text-text1 font-extrabold ml-2">ایمیل کاربر:</p>
          <p className="textSm text-text3 font-normal">{item?.email}</p>
        </div>
      </div>
      <div className="">
        <CustomSelect
          className="mb-4"
          options={access_options}
          value={userAccess}
          onChange={userAccessSet}
        />
        <CustomButton
          disable={userAccess?.value === item?.adminType}
          className="lg:!w-[160px]"
          variant="primary"
          onClick={handleUpdateUser}
        >
          ویرایش
        </CustomButton>
      </div>
    </div>
  );
};

const Page = () => {
  const { data: users, refetch: usersRefetch } = useApiCall<any>({ url: '/api/users' });
  const [searchedValue, searchedValueSet] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [searchedUsers, searchedUsersSet] = useState([]);

  const startIndex = (activePage - 1) * MAXIMUM_POSTS_PER_PAGE;
  const endIndex = activePage * MAXIMUM_POSTS_PER_PAGE;

  useEffect(() => {
    if (users) {
      searchedUsersSet(users);
    }
  }, [users]);

  useEffectSkipFirstRender(() => {
    const cloneUsers: any = [...users];
    searchedUsersSet(
      cloneUsers?.filter((user: any) => {
        const lowercasedSearch = searchedValue?.toLowerCase();
        return (
          user.name.toLowerCase().includes(lowercasedSearch) ||
          user.email.toLowerCase().includes(lowercasedSearch)
        );
      }),
    );
    setActivePage(1);
  }, [searchedValue]);

  return (
    <div>
      <div className="bg-white lg:shadow-sidebar rounded-3xl lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <h4 className="textXl text-text1 mb-4 lg:mb-0">دسترسی ادمین</h4>
          <div className="w-full lg:w-[300px]">
            <CustomInput
              parentClassName="relative"
              inputClassName="pr-10"
              placeholder="کاربر را جستجو کنید..."
              icon={
                <i className="absolute text-text3 top-1/2 right-4 -translate-y-1/2 fa fa-regular fa-search" />
              }
              state={searchedValue}
              setState={searchedValueSet}
            />
          </div>
        </div>
        <div className="">
          {searchedUsers && searchedUsers?.[0] ? (
            searchedUsers?.slice(startIndex, endIndex)?.map((item: any, index: number) => {
              return <UserComponent refetch={usersRefetch} item={item} key={index} />;
            })
          ) : (
            <p className="textSm text-rose-500 font-bold">یوزر پیدا نشد.</p>
          )}
        </div>
        {searchedUsers &&
        typeof searchedUsers !== 'string' &&
        searchedUsers?.length &&
        searchedUsers?.length > MAXIMUM_POSTS_PER_PAGE ? (
          <CustomPagination
            activePage={activePage}
            activePageSet={setActivePage}
            itemsCountPerPage={MAXIMUM_POSTS_PER_PAGE}
            totalItemsCount={searchedUsers?.length}
            className="mt-10"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
