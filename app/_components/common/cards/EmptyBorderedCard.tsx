import React from 'react';

interface emptyBorderedCardInterface {
  className?: string;
  children: string | React.ReactNode;
}

const EmptyBorderedCard = ({ className, children }: emptyBorderedCardInterface) => {
  return (
    <div className={`w-full rounded-2xl border border-purple p-6 mb-6 last:mb-0 ${className}`}>
      {children}
    </div>
  );
};

export default EmptyBorderedCard;
