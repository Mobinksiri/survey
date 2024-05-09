"use client";
import { useApiCall } from "@/app/_apiCall/apiCall";
import { useParams } from "next/navigation";
import MainQuizContent from "../../(quiz)/MainContent";
import CourseDetail from "../../(quiz)/CourseDetail";
import Services from "../../(quiz)/Services";
import Comments from "../../(quiz)/Comments";
import Link from "next/link";

const Page = () => {
   const id = useParams();

   const { data: responseData, refetch } = useApiCall<any>({
      url: `/api/poll/${id.singelQuiz}`,
   });

   return (
      <div className="custom-container">
         <div className="flex items-center mb-8">
            <Link className="textSmm font-normal text-text1 ml-3" href="/">
               صفحه اصلی
            </Link>
            <i className="fa fa-solid fa-chevron-left text-[10px] font-extrabold text-text1 ml-3" />
            <Link className="textSmm font-normal text-text1 ml-3" href="/quiz">
               آزمون ها
            </Link>
            <i className="fa fa-solid fa-chevron-left text-[10px] font-extrabold text-text1 ml-3" />
            <span className="textSmm font-normal text-text1">{responseData?.poll?.title}</span>
         </div>
         <div className="grid grid-cols-8 gap-8">
            <div className="col-span-full">
               <MainQuizContent refetch={refetch} data={responseData} />
            </div>
            <div className="col-span-8">
               <Services data={responseData} />
            </div>
            <div className="col-span-full mb-[100px] ">
               <Comments data={responseData} />
            </div>
            {/* <div className="hidden lg:block md:col-span-2">
               <CourseDetail data={responseData} />
            </div> */}
         </div>
      </div>
   );
};

export default Page;
