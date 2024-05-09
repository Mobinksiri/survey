import { filterSchemaInterface, filterShopSchemaInterface } from '@/app/_interface';
import { routeIdGenerator } from '@/app/_utils/routeIdGenerator';

export const shopFilter: filterSchemaInterface[][] = routeIdGenerator([
  [
    {
      type: 'title',
      search: false,
      accordion: true,
      items: [
        { title: 'جزوه', query: '1' },
        { title: 'جزوه', query: '1' },
        { title: 'جزوه', query: '1' },
      ],
      title: 'جزوات',
    },
  ],
]);
