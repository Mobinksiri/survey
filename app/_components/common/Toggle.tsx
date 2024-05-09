import React from 'react';

const Toggle = ({ state, setState }: { state: boolean; setState: any }) => {
  const handleToggle = () => {
    setState((prev: boolean) => !prev);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="cursor-pointer">
        <div
          onClick={handleToggle}
          className={`cursor-pointer relative w-[50px] h-[28px] rounded-full p-1 border-2 transition-all box-border duration-300 ${
            state ? 'bg-[#A29BFE] border-transparent' : 'bg-transparent border-[#D6D6D6]'
          }`}
        >
          <div
            className={`absolute left-2 top-1 w-4 h-4 rounded-full transition-all transform duration-300 ${
              state ? 'translate-x-[calc(100%+4px)] bg-white' : '-translate-x-1 bg-[#D6D6D6]'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default Toggle;
