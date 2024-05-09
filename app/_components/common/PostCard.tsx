'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import moment from 'moment-jalaali';
import { useRouter } from 'next/navigation';
import apiCall from '@/app/_apiCall/apiCall';
import { stripHtmlTags } from './article/ArticlePost';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';
import { NEED_LOGIN } from '@/app/_toast_messages';
import QuizIconBack from '@/app/_assets/other/quiz/icons/quizIconBack.svg';
import useSaveFunction from '@/app/_utils/useSaveFunction';
import useLikeFunction from '@/app/_utils/useLikeFunction';
export interface postDetail {
  typology?: boolean;
  postImage?: StaticImageData;
  postIcon?: StaticImageData;
  badgeList?: React.ReactNode[];
  title?: {
    value: string;
    className?: string;
  };
  subject?: {
    value: string;
    className?: string;
  };
  description?: {
    value: string;
    className?: string;
  };
  tags?: {
    icon: string;
    title: string;
  }[];
  author?: {
    name?: string;
    time: string;
    profileImage: StaticImageData;
  };
  price?: {
    amount: number;
    discountPercent: number;
  };
  catId: number;
  id: number;
  userId: number;
  type?: string;
}

const animationOfCard = {
  hidden: { x: 10 },
  visible: { x: 0 },
};

const PostCard = ({
  detail,
  onClick = () => {},
}: {
  detail: any;
  width?: number;
  onClick?: any;
}) => {
  const router = useRouter();

  const {
    journal,
    postImage,
    description,
    writerId,
    tags,
    offprice,
    author,
    title,
    postIcon,
    badgeList,
    typology,
    subject,
    price,
    catId,
    id,
    isSaved,
    quiz,
    userName,
    userId,
    shop,
    name,
    publisher,
    isLiked,
    writer,
  } = detail;

  const { userData } = useSelector(getUser);

  const saveFunction = useSaveFunction(onClick);
  const likeFunction = useLikeFunction(onClick);

  const goToPost = () => {
    if (catId && id && journal) {
      router.push('/journal/' + catId + '/' + id + '?' + title?.value);
    }
    if (id && typology) {
      router.push(`/typology/famous_peoples/${id}?${title?.value}`);
    }
    if (id && quiz) {
      router.push(`/quiz/${id}?${title?.value}`);
    }
    if (id && shop) {
      router.push(`/shop/${id}`);
    }
    if (id && writer) {
      router.push(`/user/${id}`);
    }
  };

  const goToWriterProfile = () => {
    if (writerId) {
      router.push(`/user/${writerId}`);
    }
  };

  if (typology) {
    return (
      <motion.div
        className={`relative bg-PostCardBg w-full h-fit shadow-category-item rounded-2xl p-4 flex flex-col lg:justify-between lg:flex-row`}
        key={id}
        variants={animationOfCard}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        whileHover={{
          scale: 0.99,
          boxShadow: '0px 3px 8px 0px #00000014',
          transition: {
            type: 'spring',
          },
        }}
      >
        {/* badgeList */}
        {badgeList && badgeList?.[0] && (
          <div className="absolute top-6 left-6 flex gap-2 z-[2]">
            {badgeList?.map((badge: any) => {
              return badge;
            })}
          </div>
        )}

        {/* post image */}
        {postImage && (
          <div className="relative w-full h-[168px] lg:w-[168px] mb-3 lg:mb-0">
            <Image src={postImage} alt="post" className="rounded-2xl object-cover" fill />
          </div>
        )}
        <div className="h-fit lg:w-[calc(100%-182px)]">
          {/* title */}
          {title && (
            <p
              onClick={goToPost}
              className={`${title?.className} cursor-pointer hover:text-text3 transition-all`}
            >
              {title?.value}
            </p>
          )}

          {/* subject */}
          {subject && <p className={`${subject?.className} `}>{subject?.value}</p>}

          {/* description */}
          {description && (
            <p className={`leading-2 ${description?.className} !text-justify`}>
              {description.value}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  if (shop) {
    return (
      <motion.div
        key={id}
        variants={animationOfCard}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        className={`relative bg-PostCardBg w-full shadow-category-item rounded-2xl p-4 z-[1]`}
        whileHover={{
          scale: 0.99,
          boxShadow: '0px 3px 8px 0px #00000014',
          transition: {
            type: 'spring',
          },
        }}
      >
        {/* badgeList */}
        {badgeList && badgeList?.[0] && (
          <div className="absolute top-4 left-4 flex gap-2">
            {badgeList?.map((badge: any) => {
              return badge;
            })}
          </div>
        )}

        {/* post icon */}
        {postIcon && <Image src={postIcon} alt="icon" className="mb-[28px]" />}

        {/* post image */}
        {postImage && (
          <div className="h-[170px] w-full relative mb-4">
            <Image
              src={'https://onlinejpgtools.com/images/examples-onlinejpgtools/mountain-scene.jpg'}
              alt="post"
              className="rounded-2xl w-full h-full object-cover"
              fill
            />
          </div>
        )}

        {/* profile */}
        {publisher && (
          <div className="flex items-center mb-4">
            {/* {publisher?.profileImage ? (
              <Image
                src={author?.profileImage}
                className="rounded-full w-9 h-9 object-cover ml-2"
                alt="profile"
              />
            ) : ( */}
            <i className="w-9 h-9 flex items-center justify-center ml-2 rounded-full text-[15px] fa fa-regular fa-user bg-gray-100" />

            <div>
              <span className="textXs text-text1 block">{publisher ?? ''}</span>
              <span className="textXs text-text3 block">
                {moment(author?.time).format('jYYYY/jMM/jDD - HH:mm')}
              </span>
            </div>
          </div>
        )}

        {/* title */}
        {name && (
          <p onClick={goToPost} className={' cursor-pointer'}>
            {name}
          </p>
        )}

        {/* description */}
        {/* {description && <p className={`!text-justify`}>{stripHtmlTags(description)}</p>} */}
        {description && <p className={`!text-justify`}>{description}</p>}

        {price && (
          <>
            {offprice && (
              <div className="flex items-center justify-end">
                <p className="text-[14px] font-bold leading-[20px] text-text3 line-through ">
                  {price?.toLocaleString()}
                </p>
                <p className="text-[14px] font-normal px-2 py-1 text-white bg-[#FF9DC4] rounded-lg mr-2 ">
                  {offprice?.discountPercent}%
                </p>
              </div>
            )}
            <div className="flex items-center justify-end mt-2">
              <span className="textXl text-text1">
                {(price - (price * offprice) / 100).toLocaleString().split('.')[0]}
              </span>
              <span className="textSm font-light text-text1 mr-2">تومان</span>
            </div>
          </>
        )}

        {/* tags */}
        {tags && tags[0] && (
          <div className="flex items-center justify-start">
            {tags?.map((tag: any, index: any) => {
              return (
                <span
                  key={index}
                  // onClick={() => {
                  //   if (tag?.save) {
                  //     saveFunction()
                  //   }
                  //   if (tag?.like) {
                  //     likeFunction()
                  //   }
                  // }}
                  className="cursor-pointer bg-gray2 hover:bg-gray-200 transition-all border border-transparent hover:border-gray-300 py-1 px-2 rounded-lg textXs font-normal inline-flex items-center text-text3 ml-2 last:ml-0"
                >
                  <i className={`fa-regular fa-${tag?.icon} ml-1`} />
                  {tag?.title}
                </span>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  }

  if (quiz) {
    return (
      <motion.div
        key={id}
        variants={animationOfCard}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        className={`relative bg-[#FBFBFB] w-full shadow-category-item h-[332px] rounded-2xl p-4 z-[1]`}
        whileHover={{
          scale: 0.99,
          boxShadow: '0px 3px 8px 0px #00000014',
          transition: {
            type: 'spring',
          },
        }}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* badgeList */}
            {badgeList && badgeList?.[0] && (
              <div className="absolute top-4 left-4 flex gap-2">
                {badgeList?.map((badge: any) => {
                  return badge;
                })}
              </div>
            )}

            {/* post icon */}
            {postIcon && (
              <div className="relative w-[88px] h-[88px] mb-8">
                <Image src={postIcon} alt="icon" />
                <Image src={QuizIconBack} alt="icon" className="absolute top-0 z-[-10]" />
              </div>
            )}

            {/* post image */}
            {postImage && (
              <div className="h-[170px] ">
                <Image
                  src={postImage}
                  alt="post"
                  className="rounded-2xl w-full max-h-[160px] object-cover mb-4"
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
            )}

            {/* profile */}
            {author && (
              <div className="flex items-center mb-4">
                {author?.profileImage ? (
                  <div className="w-9 h-9 ml-2 relative">
                    <Image
                      src={author?.profileImage}
                      className="rounded-full object-cover"
                      alt="profile"
                      fill
                    />
                  </div>
                ) : (
                  <i className="w-9 h-9 flex items-center justify-center ml-2 rounded-full text-[15px] fa fa-regular fa-user bg-gray-100" />
                )}
                <div>
                  <span className="textXs text-text1 block">{userName ?? ''}</span>
                  <span className="textXs text-text3 block">
                    {moment(author?.time).format('jYYYY/jMM/jDD - HH:mm')}
                  </span>
                </div>
              </div>
            )}

            {/* title */}
            {title && (
              <p
                onClick={goToPost}
                className={title?.className + ' cursor-pointer hover:text-[#65A9D5] transition-all'}
              >
                {title?.value}
              </p>
            )}

            {/* description */}
            {description && (
              <p className={`!text-justify ${description?.className}`}>
                {description?.value ? stripHtmlTags(description?.value) : null}
              </p>
            )}
          </div>
          <div>
            {price && (
              <>
                {price?.discountPercent && (
                  <div className="flex items-center justify-end">
                    <p className="text-[14px] font-bold leading-[20px] text-text3">
                      {price?.amount?.toLocaleString()}
                    </p>
                    <p className="text-[14px] font-normal px-2 py-1 text-white bg-[#FF9DC4] rounded-lg mr-2">
                      {price?.discountPercent}%
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-end mt-2">
                  <span className="textXl text-text1">
                    {
                      (price?.amount - (price?.amount * price?.discountPercent) / 100)
                        .toLocaleString()
                        .split('.')[0]
                    }
                  </span>
                  <span className="textSm font-light text-text1 mr-2">تومان</span>
                </div>
              </>
            )}

            {/* tags */}
            {tags && tags[0] && (
              <div className="flex items-center justify-start">
                {tags?.map((tag: any, index: any) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        if (tag?.save) {
                          saveFunction({ id, markType: 4, isSaved });
                        }
                        if (tag?.like) {
                          likeFunction({ id, markType: 4, isLiked });
                        }
                      }}
                      className="cursor-pointer bg-gray2 hover:bg-gray-200 transition-all border border-transparent hover:border-gray-300 py-1 px-2 rounded-lg textXs font-normal inline-flex items-center text-text3 ml-2 last:ml-0"
                    >
                      <i className={`fa-regular fa-${tag?.icon} ml-1`} />
                      {tag?.title}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={id}
      variants={animationOfCard}
      initial={'hidden'}
      animate={'visible'}
      exit={'exit'}
      className={`relative bg-PostCardBg w-full shadow-category-item rounded-2xl p-4 z-[1]`}
      whileHover={{
        scale: 0.99,
        boxShadow: '0px 3px 8px 0px #00000014',
        transition: {
          type: 'spring',
        },
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* badgeList */}
          {badgeList && badgeList?.[0] && (
            <div className="absolute top-6 left-6 flex gap-2 z-[2]">
              {badgeList?.map((badge: any) => {
                return badge;
              })}
            </div>
          )}

          {/* post icon */}
          {postIcon && <Image src={postIcon} alt="icon" className="mb-[28px]" />}

          {/* post image */}
          {postImage && (
            <div className="w-full h-[170px] relative mb-4 rounded-2xl overflow-hidden">
              <Image src={postImage} alt="post" className="object-cover mb-4" fill />
            </div>
          )}

          {/* profile */}
          {author && (
            <div className="flex items-center mb-4 cursor-pointer" onClick={goToWriterProfile}>
              {author?.profileImage ? (
                <div className="w-9 h-9 ml-2 relative">
                  <Image
                    src={author?.profileImage}
                    className="rounded-full object-cover"
                    alt="profile"
                    fill
                  />
                </div>
              ) : (
                <i className="w-9 h-9 flex items-center justify-center ml-2 rounded-full text-[15px] fa fa-regular fa-user bg-gray-100" />
              )}
              <div>
                <span className="textXs text-text1 block">{userName ?? ''}</span>
                <span className="textXs text-text3 block">
                  {moment(author?.time).format('jYYYY/jMM/jDD - HH:mm')}
                </span>
              </div>
            </div>
          )}

          {/* title */}
          {title && (
            <p
              onClick={goToPost}
              className={title?.className + ' cursor-pointer hover:text-green1 transition-all'}
            >
              {title?.value}
            </p>
          )}

          {/* description */}
          {description && (
            <p className={`!text-justify ${description?.className}`}>
              {description?.value ? stripHtmlTags(description?.value) : null}
            </p>
          )}
        </div>
        <div>
          {price && (
            <>
              {price?.discountPercent && (
                <div className="flex items-center justify-end">
                  <p className="text-[14px] font-bold leading-[20px] text-text3">
                    {price?.amount?.toLocaleString()}
                  </p>
                  <p className="text-[14px] font-normal px-2 py-1 text-white bg-[#FF9DC4] rounded-lg mr-2">
                    {price?.discountPercent}%
                  </p>
                </div>
              )}
              <div className="flex items-center justify-end mt-2">
                <span className="textXl text-text1">
                  {
                    (price?.amount - (price?.amount * price?.discountPercent) / 100)
                      .toLocaleString()
                      .split('.')[0]
                  }
                </span>
                <span className="textSm font-light text-text1 mr-2">تومان</span>
              </div>
            </>
          )}

          {/* tags */}
          {tags && tags[0] && (
            <div className="flex items-center justify-start">
              {tags?.map((tag: any, index: any) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      if (tag?.save) {
                        saveFunction({ id, markType: 1, isSaved });
                      }
                      if (tag?.like) {
                        likeFunction({ id, markType: 1, isLiked });
                      }
                    }}
                    className="cursor-pointer bg-gray2 hover:bg-gray-200 transition-all border border-transparent hover:border-gray-300 py-1 px-2 rounded-lg textXs font-normal inline-flex items-center text-text3 ml-2 last:ml-0"
                  >
                    <i className={`fa-regular fa-${tag?.icon} ml-1`} />
                    {tag?.title}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
