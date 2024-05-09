'use client';
import { useApiCall } from '@/app/_apiCall/apiCall';
import { useParams } from 'next/navigation';
import MainQuizContent from '../../(quiz)/MainContent';
import CourseDetail from '../../(quiz)/CourseDetail';
import Services from '../../(quiz)/Services';
import Comments from '../../(quiz)/Comments';
import Link from 'next/link';

const Page = () => {
  const id = useParams();

  const { data: responseData, refetch } = useApiCall<any>({
    url: `/api/poll/${id.singelQuiz}`,
  });

  return (
    <div className="navigation-padding custom-container">
      <div className="flex items-center mb-6">
        <Link className="text-[12px] text-text1 ml-2" href="/">
          صفحه اصلی
        </Link>
        <i className="fa fa-solid fa-chevron-left text-[8px] text-text1 ml-2" />
        <Link className="text-[12px] text-text1 ml-2" href="/quiz">
          آزمون ها
        </Link>
        <i className="fa fa-solid fa-chevron-left text-[8px] text-text1 ml-2" />
        <span className="text-[12px] text-text1">{responseData?.poll?.title}</span>
      </div>
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-full lg:col-span-6">
          <MainQuizContent refetch={refetch} data={responseData} />
        </div>
        <div className="md:col-span-2">
          <CourseDetail height data={responseData} />
        </div>
        <div className="col-span-8">
          <Services data={responseData} />
        </div>
        <div className="col-span-full lg:col-span-6 mb-[100px] ">
          <Comments data={responseData} />
        </div>
        <div className="hidden lg:block md:col-span-2">
          <CourseDetail data={responseData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
