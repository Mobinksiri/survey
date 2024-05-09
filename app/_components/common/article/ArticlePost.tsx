import React from 'react';
import Image from 'next/image';
import moment from 'moment-jalaali';

import { parse } from 'parse5';
import { useRouter } from 'next/navigation';
import useSaveFunction from '@/app/_utils/useSaveFunction';
import useLikeFunction from '@/app/_utils/useLikeFunction';

function getTextContent(node: any): string {
  if (node.childNodes) {
    return node.childNodes.map(getTextContent).join('');
  } else if (node.value) {
    return node.value;
  } else {
    return '';
  }
}

export const stripHtmlTags = (html: any) => {
  const documentFragment = parse(html);
  const textContent = getTextContent(documentFragment);
  return textContent;
};

const ArticlePost = ({ data, refetch }: any) => {
  const router = useRouter();

  const { createdAt, desc, id, title, url, isSaved, readingTime, isLiked, numViews } = data;

  const saveFunction = useSaveFunction(refetch);
  const likeFunction = useLikeFunction(refetch);

  const goToArticle = () => {
    router.push(`/journal/${data?.catId}/${data?.id}`);
  };

  const goToWriterProfile = () => {
    if (data?.magWriterId) {
      router.push(`/user/${data?.magWriterId}`);
    }
  };

  return (
    <div className="w-full h-full p-6 flex flex-col shadow-articlePost rounded-2xl mb-8 last:mb-8">
      <div className="w-full h-[225px] relative mb-4">
        <Image src={url} alt="post" className="rounded-2xl lg:max-h-[100%] object-cover" fill />
      </div>

      <div className="w-full h-[calc(100%-241px)] flex flex-col justify-between">
        <div>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* detail */}
            <div className="flex flex-wrap lg:flex-nowrap items-center">
              <div className="w-full lg:w-fit flex justify-between items-center mb-4 lg:mb-0">
                <div onClick={goToWriterProfile} className="flex items-center mb-4 cursor-pointer">
                  {data?.image ? (
                    <div className="w-12 h-12 relative ml-3">
                      <Image
                        src={data?.image}
                        className="rounded-full object-cover"
                        alt="profile"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center ml-3 rounded-full bg-gray-100">
                      <i className="text-[17px] fa fa-regular fa-user" />
                    </div>
                  )}
                  <div>
                    <h5 className="textSmm text-text3 mb-1">{data?.magWriter}</h5>
                    <p className="textSmm !leading-[16px] pt-0.5 text-text3">
                      {moment(createdAt).format('jYYYY/jMM/jDD - HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h4
              onClick={goToArticle}
              className="textXl mb-2 text-text1 line-clamp-2 hover:text-green1 transition-all cursor-pointer"
            >
              {title}
            </h4>
            <p className="textSm leading-[32px] text-text3 line-clamp-3 lg:mb-0">
              {stripHtmlTags(desc)}
            </p>
          </div>
        </div>

        <div className="flex w-full lg:w-fit justify-end items-center">
          <div className="h-[38px] w-fit px-3 flex items-center justify-center rounded-lg text-text3 bg-gray2 ml-2">
            <div className="flex bg-gray2">
              <i className="fa-regular fa-clock text-[18px] leading-[18px] text-text3 ml-2" />
              <p className="textSmm !leading-[18px] text-text3">{readingTime ?? 0} دقیقه</p>
            </div>
          </div>
          <div className="h-[38px] w-fit px-3 flex items-center justify-center rounded-lg text-text3 bg-gray2 ml-2">
            <div className="flex bg-gray2">
              <i className="fa-regular fa-eye text-[18px] leading-[18px] text-text3 ml-2" />
              <p className="textSmm !leading-[18px] text-text3">{numViews}</p>
            </div>
          </div>
          <div className="h-[38px] w-[38px] flex items-center justify-center rounded-lg cursor-pointer text-text3 bg-gray2 ml-2">
            <i
              onClick={() => saveFunction({ id, markType: 1, isSaved })}
              className={`fa ${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark text-[18px]`}
            />
          </div>
          <div className="h-[38px] w-[38px] flex items-center justify-center rounded-lg cursor-pointer text-text3 bg-gray2 ml-2">
            <i
              onClick={() => likeFunction({ id, markType: 1, isLiked })}
              className={`fa ${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-[18px]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePost;
