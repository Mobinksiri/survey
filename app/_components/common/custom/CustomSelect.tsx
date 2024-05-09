import React from 'react';
import Select from 'react-select';

const CustomSelect = (props: any) => {
  return (
    <div className={props.className}>
      <Select
        styles={{
          control: (styles) => ({
            ...styles,
            borderRadius: '16px',
            backgroundColor: 'transparent',
            minWidth: '160px',
          }),
          indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none',
          }),
          placeholder: (styles) => ({
            ...styles,
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '400',
            color: '#c6c6c6',
          }),
          menu: (styles) => ({
            ...styles,
            borderRadius: '16px',
            overflow: 'hidden',
            zIndex: '10',
          }),
          singleValue: (styles) => ({
            ...styles,
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '400',
            color: '#272727',
          }),
          menuList: (styles) => ({
            ...styles,
            paddingTop: '0',
            paddingBottom: '0',
            maxHeight: props?.maxHeight ?? '250px',
          }),
          option: (styles) => ({
            ...styles,
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '400',
            color: '#272727',
          }),
          input: (styles) => ({
            ...styles,
            backgroundColor: 'transparent',
          }),
        }}
        noOptionsMessage={() => {
          return <p className="textXs font-medium text-text3">گزینه ای وجود ندارد.</p>;
        }}
        placeholder={props?.placeholder ?? 'انتخاب کنید.'}
        {...props}
      />
    </div>
  );
};

export default CustomSelect;
