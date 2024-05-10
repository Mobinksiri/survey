import React from "react";
import SingelService from "./subComponents/SingelService";

const Services = ({ data }: any) => {
   const poll = data?.data;

   const fromAge = poll?.fromAge;
   const toAge = poll?.toAge;

   let ageCategory;
   let averageAge;

   if (fromAge !== undefined && toAge !== undefined) {
      averageAge = (fromAge + toAge) / 2;
   } else if (fromAge !== undefined) {
      averageAge = fromAge;
   } else if (toAge !== undefined) {
      averageAge = toAge;
   } else {
      // Handle the case when both fromAge and toAge are undefined
      ageCategory = "نامشخص";
   }

   if (averageAge >= 0 && averageAge <= 12) {
      ageCategory = "کودکان";
   } else if (averageAge > 12 && averageAge <= 18) {
      ageCategory = "نوجوانان - کودکان";
   } else if (averageAge > 18 && averageAge <= 25) {
      ageCategory = "نوجوانان - بزرگسالان";
   } else if (averageAge > 25) {
      ageCategory = "بزرگسالان";
   } else {
      // Handle other cases if needed
      ageCategory = "نامشخص";
   }

   const SERVICE_LIST = [
      {
         icon: "rectangle-list",
         title: "شرکت کنندگان",
         subtitle: data?.userCount,
      },
      {
         icon: "square-question",
         title: "تعداد سوالات",
         subtitle: data?.questionCount,
      },
      {
         icon: "stopwatch",
         title: "زمان تقریبی",
         subtitle: `${poll?.timeToAnswer} دقیقه`,
      },
      {
         icon: "square-info",
         title: "رده سنی",
         subtitle: ageCategory,
      },
      {
         icon: "chart-user",
         title: "اعتبار و کارآیی",
         subtitle: data?.commentCount,
      },
      {
         icon: "medal",
         title: "امتیاز",
         subtitle: `5 / ${data?.avgStars?.toFixed(1) ?? 0}`,
      },
   ];

   return (
      <div className="grid grid-cols-2 gap-3 lg:gap-5 lg:grid-cols-6 place-items-center lg:flex justify-between">
         {SERVICE_LIST.map((e, i) => {
            return <SingelService key={i} data={e} />;
         })}
      </div>
   );
};

export default Services;
