// "use client";
// import { useApiCall } from "@/app/_apiCall/apiCall";
// import { baseUrls } from "@/app/_apiCall/baseUrls";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const Page = () => {
//   const { test, singelQuiz } = useParams();

//   const { data: responseData } = useApiCall<any>({
//     url: `/answer/getPollResult`,
//     baseUrl: baseUrls?.poll,
//     method: "post",
//     data: {
//       id: +test,
//     },
//     shouldCallApi: !!test,
//   });

//   return (
//     <div className="border border-gray-200 lg:border-none bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl p-6 lg:p-10 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h4 className="textLg text-text1">
//           نتیجه آزمون {responseData?.poll?.title}
//         </h4>
//         <Link
//           href={`/quiz/${singelQuiz}`}
//           className="textSmm text-text1 mb-4 cursor-pointer"
//         >
//           بازگشت
//           <i className="fa fa-regular fa-chevron-left text-text1 mr-2" />
//         </Link>
//       </div>
//       <div className="rounded-md">
//         {responseData?.mostRepeatedValues &&
//         Object?.entries(responseData?.mostRepeatedValues)?.length
//           ? Object?.entries(responseData?.mostRepeatedValues)?.map(
//               ([key, value]: any, index: number) => {
//                 if (key === "mbtiRate" && value) {
//                   return (
//                     <div
//                       className="p-6 border w-full rounded-md mb-4 last:mb-0"
//                       key={index}
//                     >
//                       <p className="textMd text-text1">
//                         تایپ mbti شما {value?.name} است:
//                       </p>
//                       <p
//                         className="mt-4 textSmm text-text3"
//                         dangerouslySetInnerHTML={{ __html: value?.content }}
//                       />
//                     </div>
//                   );
//                 }
//                 if (key === "aniagramRate" && value) {
//                   return (
//                     <div
//                       className="p-6 border w-full rounded-md mb-4 last:mb-0"
//                       key={index}
//                     >
//                       <p className="textMd text-text1">
//                         تایپ انیاگرام شما {value?.name} است:
//                       </p>
//                       <p
//                         className="mt-4 textSmm text-text3"
//                         dangerouslySetInnerHTML={{ __html: value?.content }}
//                       />
//                     </div>
//                   );
//                 }
//                 if (key === "aniagraminstinctRate" && value) {
//                   return (
//                     <div
//                       className="p-6 border w-full rounded-md mb-4 last:mb-0"
//                       key={index}
//                     >
//                       <p className="textMd text-text1">
//                         تایپ غرایز انیاگرام شما {value?.name} است:
//                       </p>
//                       <p
//                         className="mt-4 textSmm text-text3"
//                         dangerouslySetInnerHTML={{ __html: value?.content }}
//                       />
//                     </div>
//                   );
//                 }
//                 if (key === "tempermentRate" && value) {
//                   return (
//                     <div
//                       className="p-6 border w-full rounded-md mb-4 last:mb-0"
//                       key={index}
//                     >
//                       <p className="textMd text-text1">
//                         تایپ مزاج شما {value?.name} است:
//                       </p>
//                       <p
//                         className="mt-4 textSmm text-text3"
//                         dangerouslySetInnerHTML={{ __html: value?.content }}
//                       />
//                     </div>
//                   );
//                 }
//               }
//             )
//           : null}
//       </div>
//     </div>
//   );
// };

// export default Page;

import React from "react";

const Result = () => {
  return <div>Result</div>;
};

export default Result;
