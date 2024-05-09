import { dropdownInterface } from '../_interface';

export const dropdown: dropdownInterface[] = [
  {
    id: 'journal',
    color: '#00B894',
    href: 'journal',
    items: [],
  },
  {
    id: 'quiz',
    color: '#74B9FF',
    href: 'quiz',
    items: [],
  },
  {
    id: 'typology',
    color: '#a29bfe',
    href: 'typology',
    items: [
      {
        title: 'افراد مشهور',
        href: 'typology/famous_peoples',
        hrefs: [
          {
            title: 'بازیگر',
          },
          {
            title: 'تلوزیون',
          },
          {
            title: 'ورزشکار',
          },
          {
            title: 'سیاست مدار',
          },
          {
            title: 'شاعر',
          },
        ],
      },
      {
        title: 'شخصیت های تخیلی',
        href: 'typology/fictional_character',
        hrefs: [
          {
            title: 'ابر قهرمانان',
          },
          {
            title: 'سریال',
          },
          {
            title: 'سینمایی',
          },
          {
            title: 'کارتون',
          },
          {
            title: 'کمیک',
          },
        ],
      },
      {
        title: 'سرگرمی',
        href: 'typology/fun',
        hrefs: [
          {
            title: 'حیوانات',
          },
          {
            title: 'گیاهان',
          },
          {
            title: 'اشیا',
          },
          {
            title: 'کشور',
          },
          {
            title: 'موسیقی',
          },
        ],
      },
      // {
      //   title: 'MBTI',
      //   hrefs: [
      //     {
      //       title: 'Estj',
      //     },
      //     {
      //       title: 'Istj',
      //     },
      //     {
      //       title: 'Esfj',
      //     },
      //     {
      //       title: 'Isfj',
      //     },
      //     {
      //       title: 'Entj',
      //     },
      //   ],
      // },
      // {
      //   title: 'انیاگرام',
      //   hrefs: [
      //     {
      //       title: '1w2',
      //     },
      //     {
      //       title: '1w9',
      //     },
      //     {
      //       title: '2w1',
      //     },
      //     {
      //       title: '2w3',
      //     },
      //     {
      //       title: '3w2',
      //     },
      //   ],
      // },
    ],
  },
  {
    id: 'shop',
    color: '#FF9DC4',
    href: 'shop',
    items: [],
  },
  {
    id: 'Discussion forum',
    color: '#fdcb6e',
    href: 'forum',
    items: [],
  },
];
