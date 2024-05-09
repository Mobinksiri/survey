import { filterSchemaInterface } from "@/app/_interface";

let counter = 1;
export const routeIdGenerator = (array: filterSchemaInterface[][]) => {
   return array.map((group) => {
      return group.map((item) => {
         return { ...item, id: counter++ };
      });
   });
};

let aId = 0;

export const idGenerator = (array: any) => {
   return array.map((group: any) => {
      return { ...group, id: aId++ };
   });
};
