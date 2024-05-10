import React from "react";

const AddQuizButton = ({ onClick }: { onClick: any }) => {
   return (
      <div
         onClick={onClick}
         className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl justify-center cursor-pointer hover:bg-gray-100 transition-all"
      >
         <div className="w-6 h-6 bg-[#3C368E] rounded-md flex items-center justify-center">
            <i className="fa fa-solid fa-plus text-white" />
         </div>
         <p className="textSmm text-[#3C368E] font-bold mr-2">پرسشنامه جدید</p>
      </div>
   );
};

export default AddQuizButton;
