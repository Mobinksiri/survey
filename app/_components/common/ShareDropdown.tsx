import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import telegram from '@/app/_assets/other/social-media/telegram.svg';
import eta from '@/app/_assets/other/social-media/eta.svg';
import nody from '@/app/_assets/other/social-media/nody.svg';
import bale from '@/app/_assets/other/social-media/bale.svg';
import link from '@/app/_assets/other/social-media/link.svg';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { COPY_URL } from '@/app/_toast_messages';

const ShareDropdown = ({
  isOpen,
  setIsOpen,
  className,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  className?: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownClassName = `absolute bg-white z-[10] overflow-hidden w-40 rounded-2xl bg-white shadow-dropdown translate-y-full left-1/2 -translate-x-1/2 transition-all ${
    !isOpen
      ? '-bottom-[calc(50%-8px)] opacity-0 pointer-events-none'
      : '-bottom-[calc(50%)] opacity-100 pointer-events-auto'
  } ${className}`;
  const myRoute = useRouter();
  const route = usePathname();

  const baseLink = 'http://eemapsychology.ir';
  const coreLink = baseLink + route;

  const copyLink = () => {
    const tempInput = document.createElement('input');

    tempInput.value = window.location.href;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success(COPY_URL);
  };

  const handleMappedDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const handelShareLink = ({ id }: { id: any }) => {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} className={dropdownClassName}>
      {[
        { image: eta, title: 'ایتا' },
        { image: bale, title: 'بله' },
        { image: telegram, title: 'تلگرام' },
        { image: nody, title: 'روبیکا' },
        { image: link, title: 'کپی لینک' },
      ]?.map((img, index) => {
        return (
          <div
            key={index}
            className="flex items-center hover:bg-[rgba(0,0,0,0.05)] transition-all p-3"
            onClick={(e) => {
              e.stopPropagation();
              switch (index) {
                case 0:
                  myRoute.push(`https://www.eitaa.com/share/url?url=${coreLink}`);
                  break;
                case 1:
                  myRoute.push(`https://ble.ir/share/url?url=${coreLink}`);

                  break;
                case 2:
                  myRoute.push(`https://t.me/share/url?url=${coreLink}`);
                  break;
                case 3:
                  myRoute.push(`https://rubika.ir/share/url?url=${coreLink}`);
                  break;
                case 4:
                  copyLink();
                  setIsOpen(false);
                  break;
                default:
                  break;
              }
            }} // Handle click on mapped div elements
          >
            <Image src={img.image} alt={img?.title} className="ml-4" />
            <p className="textSmm text-text3">{img?.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShareDropdown;
