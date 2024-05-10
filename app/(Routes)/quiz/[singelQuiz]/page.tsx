"use client";
import { useApiCall } from "@/app/_apiCall/apiCall";
import { useParams } from "next/navigation";
import MainQuizContent from "../../(quiz)/MainContent";
import Services from "../../(quiz)/Services";
import Comments from "../../(quiz)/Comments";
import Link from "next/link";
import { baseUrls } from "@/app/_apiCall/baseUrls";

const Page = () => {
   const { singelQuiz } = useParams();

   const { data: responseData, refetch } = useApiCall<any>({
      url: `/question/getAllQuestions`,
      baseUrl: baseUrls?.poll,
      data: { id: singelQuiz },
      method: "post",
      shouldCallApi: !!singelQuiz,
   });

   let pollDetail = responseData?.data?.pollDetail;

   return (
      <div className="custom-container">
         <div className="flex items-center mb-8">
            <Link className="textSmm font-normal text-text1 ml-3" href="/">
               صفحه اصلی
            </Link>
            <i className="fa fa-solid fa-chevron-left text-[10px] font-extrabold text-text1 ml-3" />
            <span className="textSmm font-normal text-text1">{pollDetail?.title}</span>
         </div>
         <div className="grid grid-cols-8 gap-8">
            <div className="col-span-full">
               <MainQuizContent refetch={refetch} data={responseData?.data} />
            </div>
            <div className="col-span-8">
               <Services data={responseData?.data} />
            </div>
            <div className="col-span-full mb-[100px] ">
               <Comments data={responseData?.data} />
            </div>
         </div>
      </div>
   );
};

export default Page;
