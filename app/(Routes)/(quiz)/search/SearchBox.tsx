import CustomInput from '@/app/_components/common/custom/CustomInput';
import React from 'react';

const SearchBox = ({
  searchedValue,
  searchedValueSet,
}: {
  searchedValue: any;
  searchedValueSet: any;
}) => {
  return (
    <CustomInput
      parentClassName="relative"
      inputClassName="pr-10"
      placeholder="جستجو کنید..."
      icon={
        <i className="absolute text-text3 top-1/2 right-4 -translate-y-1/2 fa fa-regular fa-search" />
      }
      state={searchedValue}
      setState={searchedValueSet}
    />
  );
};

export default SearchBox;
