import { dropdownInterface, dropdownItemInterface } from '@/app/_interface';
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

const variants = {
  hidden: {
    y: -7.5,
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
};

const DropdownItem = ({ _i, detail }: { _i: dropdownItemInterface; detail: dropdownInterface }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div>
      <div className="flex items-center w-fit ml-10 last:ml-0 mb-2">
        {_i?.icon ? (
          <i className={`fa fa-solid text-text1 ml-2 fa-${_i?.icon}`} />
        ) : (
          <div style={{ backgroundColor: detail?.color }} className="w-2 h-2 rounded-full ml-4" />
        )}
        {_i?.href ? (
          <Link
            href={'/' + _i?.href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ color: isHover ? detail?.color : '#272727' }}
            className="w-[calc(100%-26px)] whitespace-nowrap transition-all text-[16px] font-bold leading-[32px] text-text1"
          >
            {_i?.title}
          </Link>
        ) : (
          <h5 className="w-[calc(100%-26px)] whitespace-nowrap text-[16px] font-bold leading-[32px] text-text1">
            {_i?.title}
          </h5>
        )}
      </div>
      <div className="w-full pr-5">
        {_i?.hrefs?.map((href, i) => (
          <>
            {href?.href ? (
              <Link
                href={'/' + href?.href}
                key={i}
                className="w-full text-[15px] font-light leading-[32px] text-[#8E8E8E] mb-1 last:mb-0 cursor-pointer hover:text-text1 transition-all"
              >
                <p>{href?.title}</p>
              </Link>
            ) : (
              <p
                key={i}
                className="w-full text-[15px] font-light leading-[32px] text-[#8E8E8E] mb-1 last:mb-0 hover:text-text1 transition-all"
              >
                <p>{href?.title}</p>
              </p>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const Dropdown = ({
  detail,
  show,
  index,
}: {
  detail: dropdownInterface | null;
  index: number;
  show: boolean;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const opacity = useMotionValue(0);
  const pointerEvents = useTransform(opacity, (latest) => (latest < 0.5 ? 'none' : 'auto'));

  return (
    <AnimatePresence>
      <motion.div
        // animate={'visible'}
        animate={show ? 'visible' : 'hidden'}
        variants={variants}
        transition={{
          delay: 0.2,
        }}
        className={`min-w-[350px] w-fit h-fit absolute top-10 bg-white p-6 rounded-2xl shadow-category-item overflow-hidden cursor-auto`}
        style={{ opacity, pointerEvents, right: `-${32 * index}px` }}
        ref={dropdownRef}
      >
        <div className="flex mb-4">
          {detail?.items?.map((_i, index) => {
            return <DropdownItem _i={_i} detail={detail} key={index} />;
          })}
        </div>
        {detail?.href ? (
          <Link
            href={'/' + detail?.href}
            style={{ border: `2px solid ${detail?.color}`, color: detail?.color }}
            className="textSm font-bold flex w-fit text-white rounded-md px-3 py-2"
          >
            <span className="w-fit">مشاهده همه</span>
            <i className="fa fa-solid fa-chevron-left text-[10px] mr-2" />
          </Link>
        ) : (
          <p
            style={{ border: `2px solid ${detail?.color}`, color: detail?.color }}
            className="textSm font-bold flex w-fit text-white rounded-md px-3 py-2"
          >
            <span className="w-fit">مشاهده همه</span>
            <i className="fa fa-solid fa-chevron-left text-[10px] mr-2" />
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Dropdown;
