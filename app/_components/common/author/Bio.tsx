import { authorBio } from '@/app/_interface';
import Image from 'next/image';
import React from 'react';

const Bio = ({ name, bio, className, image }: authorBio) => {
  return (
    <div className={`flex items-start justify-between mb-[66px] ${className ?? ''}`}>
      {image ? (
        <div className="w-20 h-20 relative">
          <Image src={image} className="rounded-full" alt="profile" fill />
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center ml-6 rounded-full bg-gray-100">
          <i className="text-[15px] fa fa-regular fa-user" />
        </div>
      )}
      <div className="w-[calc(100%-104px)]">
        <h4 className="textXl text-text1 mb-4">{name}</h4>
        <p className="textSm text-text3">{bio}</p>
      </div>
    </div>
  );
};

export default Bio;
