import React from 'react';
import PostCard, { postDetail } from './PostCard';

interface postsFlex {
  children?: React.ReactNode;
  array: postDetail[];
  className?: string;
  column?: string;
  onClick?: any;
  shop?: boolean;
  typologySection?: boolean;
  title?: string;
  showNotFoundTitle?: boolean;
}

const PostsFlex = ({
  onClick,
  shop,
  children,
  array,
  className,
  typologySection = false,
  title,
  showNotFoundTitle = true,
  column,
}: postsFlex) => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
        gap: Number(column) == 4 ? '32px' : '16px',
      }}
      className={`  ${
        array?.length > 0
          ? `grid ${
              typologySection ? 'sm:grid-cols-1 md:grid-cols-2 ' : 'md:grid-cols-2 lg:grid-cols-4'
            }  gap-4  lg:gap-6 `
          : 'flex '
      } min-h-[316px] ${className ?? ''}`}
    >
      {array &&
        array?.[0] &&
        array?.map((post, index) => {
          if (shop) {
            let location =
              post?.type === 'course' ? `/shop/course/${post?.id}` : `/shop/book/${post?.id}`;
            return (
              <>
                <a href={`${location}`}>
                  <PostCard onClick={onClick} key={index} detail={post} />
                </a>
              </>
            );
          } else return <PostCard onClick={onClick} key={index} detail={post} />;
        })}
      {showNotFoundTitle && array?.length == 0 && (
        <div className="w-full text-center lg:w-fit">
          <p className="textSm font-normal text- text-red">{title} برای نمایش وجود ندارد.</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default PostsFlex;
