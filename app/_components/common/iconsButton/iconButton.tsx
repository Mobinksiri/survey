import React from 'react';

const IconButton = ({
  icon,
  iconClassName,
  parentClassName,
  onClick,
  children,
  isSaved = false,
}: {
  icon: string;
  isSaved?: boolean;
  parentClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
  children?: string | React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 rounded-lg bg-[#EFF8F7] flex items-center justify-center cursor-pointer ${parentClassName}`}
    >
      <i
        className={`fa ${
          isSaved && icon == 'bookmark' ? 'fa-bold' : 'fa-regular'
        }  fa-${icon} text-green1 ${iconClassName}`}
      />
      {children}
    </div>
  );
};

export default IconButton;
