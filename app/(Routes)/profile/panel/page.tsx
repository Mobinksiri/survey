'use client';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import Modal from '@/app/_components/common/modal/Modal';
import { getUser } from '@/app/store/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

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
      {onClick ? (
        <div
          onClick={onClick}
          className="border border-gray1 rounded-lg p-2 lg:p-5 hover:bg-gray-100 transition-all cursor-pointer"
        >
          <div className="flex items-center">
            <i className={`fa fa-regular fa-${icon} ml-3`} />
            <p className="textSm font-bold text-text1">{title}</p>
          </div>
        </div>
      ) : (
        <Link href={href ?? '/'}>
          <div className="border border-gray1 rounded-lg p-2 lg:p-5 hover:bg-gray-100 transition-all">
            <div className="flex items-center">
              <i className={`fa fa-regular fa-${icon} ml-3`} />
              <p className="textSm font-bold text-text1">{title}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default function Home() {
  const [modalOpen, modalOpenSet] = useState(false);
  const [item, setItem] = useState<any>(null);
  const { userData } = useSelector(getUser);
  const router = useRouter();

  const listProductItem = [
    {
      id: 0,
      title: 'کتب',
      href: '/profile/panel/shop',
    },
    {
      id: 1,
      title: 'جزوات',
      href: '/profile/panel/shop/note',
    },

    {
      id: 2,
      title: 'دوره ها ',
      href: '/profile/panel/shop/course',
    },
    {
      id: 3,
      title: 'سرفصل دوره ها',
      href: '/profile/panel/shop/courseDetail',
    },
    {
      id: 4,
      title: 'سایر محصولات',
      href: '/profile/panel/shop/other',
    },
  ];

  return (
    <div className=" ">
      <Modal isOpen={modalOpen} onClick={() => {}} className="">
        <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[760px] rounded-2xl relative ">
          <i
            className="fa-regular fa-xmark left-6 top-4 absolute text-[20px] cursor-pointer"
            onClick={() => {
              modalOpenSet(false);
              setItem(null);
            }}
          />
          {listProductItem.map((e: any, i) => {
            return (
              <div
                key={i}
                className="flex items-center py-2 cursor-pointer  "
                onClick={() => setItem(e)}
              >
                <div
                  className={`w-4 h-4  rounded-full ml-2 ${
                    item?.id == i ? 'bg-purple border border-purple ' : 'border border-gray-500'
                  } `}
                />
                <span>{e.title}</span>
              </div>
            );
          })}
          <CustomButton
            disable={!item}
            onClick={() => {
              if (userData?.writer?.type !== '3' && (item.id === 2 || item.id === 3)) {
                return toast.error('تنها مدرس به این بخش دسترسی دارد');
              }
              router.push(`${item?.href}`);
              setItem(null);
              modalOpenSet(false);
            }}
            variant="primary"
            className="!w-fit px-4 flex justify-end !absolute left-6 bottom-4"
          >
            انتخاب
          </CustomButton>
        </div>
      </Modal>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل صفحه اصلی </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Item href="/profile/panel/ads" title="پیشنهادات ویژه" icon="images" />
          {userData?.adminType === 2 && (
            <Item href="/profile/panel/writers" title="نویسندگان" icon="user" />
          )}
          <Item href="/profile/panel/joinUs" title="باکس خبرنامه" icon="square-rss" />
          <Item href="/profile/panel/footer" title="فوتر (footer)" icon="image-landscape" />
          <Item href="/profile/panel/home/header" title="هدر (header)" icon="image-landscape" />
        </div>
      </div>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">دیگر صفحات</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Item href="/profile/panel/aboutUs" title="درباره ما" icon="circle-info" />
          <Item href="/profile/panel/contactUs" title="ارتباط با ما" icon="address-book" />
          <Item href="/profile/panel/teammate" title="همکاران ما" icon="tasks" />
          <Item href="/profile/panel/guide" title="راهنما" icon="circle-info" />
          <Item href="/profile/panel/types" title="تایپ ها" icon="tasks" />
        </div>
      </div>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل پروفایل کاربری </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Item href="/profile/panel/dash" title="باکس داشبورد" icon="chart-line" />
        </div>
      </div>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل مجله</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Item href="/profile/panel/journal/category" title="دسته بندی" icon="list" />
          <Item href="/profile/panel/journal/add_post" title="ایجاد مجله" icon="circle-plus" />
          <Item href="/profile/panel/journal/edit_post" title="ویرایش مجله" icon="pen-to-square" />
          <Item href="/profile/panel/journal/gallery" title="گالری مجله" icon="images" />
          <Item
            href="/profile/panel/journal/author_slider"
            title="اسلاید (نویسنده)"
            icon="images"
          />
          <Item href="/profile/panel/journal/story_slider" title="اسلاید (داستان)" icon="images" />
          <Item
            href="/profile/panel/journal/journal_comments"
            title="مدیریت کامنت ها"
            icon="message"
          />
        </div>
      </div>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل تالار گفت و گو</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Item href="/profile/panel/forum/category" title="دسته بندی" icon="list" />
          <Item href="/profile/panel/forum/add_post" title="ایجاد تاپیک" icon="circle-plus" />
          <Item href="/profile/panel/forum/edit_post" title="ویرایش تاپیک" icon="pen-to-square" />
        </div>
      </div>

      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل تایپ شناسی</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Item
            href="/profile/panel/typology/famous_people/add_post"
            title="ایجاد فرد مشهور"
            icon="circle-plus"
          />
          <Item
            href="/profile/panel/typology/famous_people/edit_post"
            title="ویرایش فرد مشهور"
            icon="pen-to-square"
          />
          <Item
            href="/profile/panel/typology/fictional_character/add_post"
            title="ایجاد شخصیت تخیلی"
            icon="circle-plus"
          />
          <Item
            href="/profile/panel/typology/fictional_character/edit_post"
            title="ویرایش شخصیت تخیلی"
            icon="pen-to-square"
          />
          <Item
            href="/profile/panel/typology/fun/add_post"
            title="ایجاد سرگرمی"
            icon="circle-plus"
          />
          <Item
            href="/profile/panel/typology/fun/edit_post"
            title="ویرایش سرگرمی"
            icon="pen-to-square"
          />
        </div>
      </div>
      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل آزمون</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Item href="/profile/panel/azmoon" title="ایجاد آزمون" icon="circle-plus" />
          <Item href="/profile/panel/azmoon/category" title="دسته بندی" icon="list" />
          <Item href="/profile/panel/azmoon/poll_comments" title="مدیریت کامنت ها" icon="message" />
        </div>
      </div>
      <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
        <h3 className="textXl text-text1 font-bold mb-8">پنل فروشگاه</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Item
            href="/profile/panel/shop"
            title="ایجاد محصول"
            icon="circle-plus"
            onClick={() => modalOpenSet(true)}
          />
          {/* <Item href="/profile/panel/shop/course" title="ایجاد دوره" icon="circle-plus" /> */}

          {/* <Item
            href="/profile/panel/shop/courseDetail"
            title="ایجاد سرفصل دوره"
            icon="circle-plus"
          /> */}
          <Item href="/profile/panel/shop/gallery" title="گالری فروشگاه" icon="images" />
          <Item href="/profile/panel/shop/category" title="دسته بندی" icon="list" />
          <Item href="/profile/panel/shop/delete" title="حذف محصولات" icon="trash" />
        </div>
      </div>

      {/* <CatItem title="مدیریت مجله" icon="memo-circle-check" href="journal" />
        <CatItem title="مدیریت تالار گفت‌‌و‌گو" icon="book-open-reader" href="forum" />
        <CatItem title="مدیریت تایپ شناسی" icon="message-text" href="typology" /> */}
    </div>
  );
}
