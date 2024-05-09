import React from "react";

const SwiperButton: React.FC<{
   children: React.ReactNode;
   onClick: () => void;
   className: string;
}> = ({ children, onClick, className }) => {
   return (
      <div className={className} onClick={onClick}>
         {children}
      </div>
   );
};

export default SwiperButton;
