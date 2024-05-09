import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const topNavBarLinks = [
  {
    title: 'مجله',
    dataSet: '/journal',
    icon: 'book',
  },
  {
    title: 'آزمون های روان شناختی',
    dataSet: '/quiz',
  },
  {
    title: 'تایپ شناسی',
    dataSet: '/typology',
  },
  {
    title: 'فروشگاه',
    dataSet: '/shop',
  },
  {
    title: 'تالار گفت وگو',
    dataSet: '/forum',
    icon: 'message-lines',
  },
  {
    title: 'درباره ما',
    dataSet: '/aboutus',
  },
  {
    title: 'تماس با ما',
    dataSet: '/contactUs',
  },
  {
    title: 'راهنما',
    dataSet: '/guide',
  },
  {
    title: 'همکاران ما',
    dataSet: '/teammate',
  },
  {
    title: 'قوانین',
    dataSet: '/rules',
  },
];

export const MobileNavLink = ({ setMenuOpen }: { setMenuOpen: any }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handelNavLinkMobile = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div>
      <div>
        {topNavBarLinks.map((e, i) => {
          return (
            <div
              className={`cursor-pointer py-3 px-4 border-b border-b-gray-border-t-gray-200 hover:bg-gray-100 transition-all ${
                pathname?.includes(e?.dataSet) ? 'bg-gray-100' : ''
              } ${i == 0 ? 'border-t border-t-gray-200' : ''}`}
              key={i}
            >
              <div
                onClick={() => {
                  handelNavLinkMobile(e.dataSet);
                  setMenuOpen(false);
                }}
              >
                <div className="w-full textSmm text-text1 font-normal">{e?.title}</div>
                {/* <i className={`fa fa-regular fa-${e?.icon}`} /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
