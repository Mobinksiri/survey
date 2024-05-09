import { filterSchemaInterface } from '@/app/_interface';
import { routeIdGenerator } from '@/app/_utils/routeIdGenerator';

export const filterProduct: filterSchemaInterface[][] = routeIdGenerator([
  [
    {
      title: 'دسته بندی محصولات',
      search: false,
      accordion: false,
      items: [],
      type: 'title',
    },
    {
      type: 'checkbox',
      accordion: true,
      title: 'کتاب ها',
      search: false,
      items: [
        {
          title: 'همه',
          query: 'ALL',
        },
      ],
    },
    {
      type: 'checkbox',
      accordion: true,
      title: 'جزوات',
      search: false,
      items: [
        {
          title: 'همه',
          query: 'ALL',
        },
      ],
    },
    {
      type: 'checkbox',
      accordion: true,
      title: 'دوره ها',
      search: false,
      items: [
        {
          query: 'ALL',
          title: 'همه',
        },
      ],
    },
    {
      type: 'checkbox',
      accordion: true,
      title: 'تست ها',
      search: false,
      items: [
        {
          query: 'ALL',
          title: 'همه',
        },
      ],
    },
    {
      type: 'checkbox',
      accordion: true,
      title: 'محصولات',
      search: false,
      items: [
        {
          query: 'ALL',
          title: 'همه',
        },
      ],
    },
  ],
]);
