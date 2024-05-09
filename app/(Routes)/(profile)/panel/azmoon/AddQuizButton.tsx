import React from 'react';

const AddQuizButton = ({ onClick }: { onClick: any }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-2 bg-gray-50 border border-gray-200 rounded-xl justify-center cursor-pointer hover:bg-gray-100 transition-all"
    >
      <div className="w-8 h-8 bg-[#3C368E] rounded-lg flex items-center justify-center">
        <i className="fa fa-solid fa-plus text-white" />
      </div>
      <p className="textSm text-[#3C368E] font-bold mr-4">پرسشنامه جدید</p>
    </div>
  );
};

export default AddQuizButton;
