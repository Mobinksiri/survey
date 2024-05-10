import React, { ChangeEvent, SetStateAction, useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "../modal/Modal";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import moment from "moment-jalaali";

interface customInputInterface {
   state: any;
   setState?: React.Dispatch<SetStateAction<any>>;
   props?: any;
   type?: string;
   label?: string;
   placeholder?: string;
   parentClassName?: string;
   paragraphClassName?: string;
   inputClassName?: string;
   icon?: any;
   children?: React.ReactNode;
   pattern?: string;
   onChangeFunction?: any;
   onlyYearPicker?: boolean;
}

const CustomInput = ({
   state,
   setState,
   props,
   type,
   label,
   placeholder,
   parentClassName,
   paragraphClassName,
   inputClassName,
   icon,
   children,
   pattern,
   onChangeFunction,
   onlyYearPicker,
}: customInputInterface) => {
   const [dateModal, dateModalSet] = useState(false);
   const today = moment().format("jYYYY/jMM/jDD");

   const [convertedDate, convertedDateSet] = useState(today.split("/")[2]);

   const inputChangeFunction = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e?.target?.value;

      if (type == "textarea") {
         e.target.style.height = "80px";

         if (e.target.clientHeight > 80) {
            e.target.style.height = e.target.scrollHeight + "px";
         }
      }

      if (setState) {
         setState(value);
      }
      onChangeFunction && onChangeFunction(value);
   };

   if (type === "file") {
      const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];

            if (setState !== null) {
               setState && setState(selectedImage);
            }
         }
      };

      return (
         <div className={`w-fit h-fit ${parentClassName}`}>
            {label && (
               <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
                  {label}
               </p>
            )}
            <div className="relative flex items-center z-[1] bg-gray-200 rounded-md px-3 py-2">
               <i className="fa fa-regular fa-file-import text-text1 ml-1" />
               <p className="textSmm font-normal text-text1">انتخاب فایل</p>
               <input
                  accept=".png, .jpg"
                  className={`textSmm z-[10] cursor-pointer text-text3 absolute top-0 left-0 opacity-0 bottom-0 right-0 rounded-md border border-[#D6D6D6] outline-none w-full h-full ${inputClassName}`}
                  onChange={imageChangeFunction}
                  type={type}
                  placeholder={placeholder ?? "متن ورودی "}
                  {...props}
               />
            </div>
         </div>
      );
   }

   if (type == "textarea") {
      return (
         <div className={`w-full h-fit ${parentClassName}`}>
            {label && (
               <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
                  {label}
               </p>
            )}
            <textarea
               className={`textSmm text-text3 rounded-md border border-[#D6D6D6] outline-none focus:border-[#959595] px-4 py-2 w-full placeholder:text-[13px] placeholder:opacity-80 transition-all min-h-[40px] h-20 max-h-36 resize-none ${inputClassName}`}
               value={state ?? ""}
               onChange={inputChangeFunction}
               type={type}
               placeholder={placeholder ?? "متن ورودی "}
               {...props}
            />
         </div>
      );
   }
   if (type == "custom") {
      return (
         <div className={`w-full h-fit ${parentClassName}`}>
            {label && (
               <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
                  {label}
               </p>
            )}
            <input
               className={`textSmm text-text3 rounded-md border border-[#D6D6D6] outline-none focus:border-[#959595] px-4 py-2 w-full placeholder:text-[13px] placeholder:opacity-80 transition-all min-h-[40px] h-20 max-h-36 resize-none ${inputClassName}`}
               value={state ?? null}
               onChange={inputChangeFunction}
               type={type}
               placeholder={placeholder ?? "متن ورودی "}
               {...props}
               pattern="[0-9]"
            />
         </div>
      );
   }

   if (type == "date") {
      const convert = (e: any) => {
         if (onlyYearPicker) {
            convertedDateSet(`${e?.year}`);
         } else {
            convertedDateSet(`${e?.year}/${e?.month?.number}/${e?.day}`);
         }
      };

      const cancelDatePicker = () => {
         dateModalSet(false);
      };

      const submitDatePicker = () => {
         setState && setState(convertedDate);
         dateModalSet(false);
      };

      return (
         <>
            <Modal isOpen={dateModal} onClick={() => dateModalSet(false)}>
               <Calendar
                  className="rmdp-mobile"
                  locale={persian_fa}
                  calendar={persian}
                  value={state}
                  onChange={convert}
                  multiple={false}
                  onlyYearPicker={onlyYearPicker}
               >
                  <div className="flex pb-4 pl-4 pr-4 pt-2">
                     <CustomButton
                        variant="primary"
                        onClick={submitDatePicker}
                        className="w-full mr-4"
                     >
                        تایید
                     </CustomButton>
                     <CustomButton onClick={cancelDatePicker} className="w-full" variant="outline">
                        لغو
                     </CustomButton>
                  </div>
               </Calendar>
            </Modal>
            <div className={`w-full ${parentClassName}`}>
               {label && (
                  <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
                     {label}
                  </p>
               )}
               <div className="relative">
                  <input
                     className={`textSmm text-text3 rounded-md border border-[#D6D6D6] outline-none focus:border-[#959595] h-10 px-4 py-2 transition-all w-full placeholder:text-[13px] placeholder:opacity-80 ${inputClassName}`}
                     value={state ?? ""}
                     onClick={() => dateModalSet(true)}
                     type={"text"}
                     placeholder={placeholder ?? "متن ورودی "}
                     {...props}
                  />
                  {children}
                  {icon}
               </div>
            </div>
         </>
      );
   }

   if (type == "number") {
      return (
         <div className={`w-full ${parentClassName}`}>
            {label && (
               <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
                  {label}
               </p>
            )}
            <div className="relative">
               <input
                  pattern={pattern}
                  className={`textSmm text-text3 rounded-md border border-[#D6D6D6] outline-none focus:border-[#959595] h-10 px-4 py-2 transition-all w-full placeholder:text-[13px] placeholder:opacity-80 ${inputClassName}`}
                  value={state ?? null}
                  onChange={inputChangeFunction}
                  type={type}
                  placeholder={placeholder ?? "عدد ورودی "}
                  {...props}
               />
               {children}
               {icon}
            </div>
         </div>
      );
   }

   return (
      <div className={`w-full ${parentClassName}`}>
         {label && (
            <p className={`textSmm font-normal text-text3 mb-2 w-full ${paragraphClassName}`}>
               {label}
            </p>
         )}
         <div className="relative">
            <input
               pattern={pattern}
               className={`textSmm text-text3 rounded-md border border-[#D6D6D6] outline-none focus:border-[#959595] h-10 px-4 py-2 transition-all w-full placeholder:text-[13px] placeholder:opacity-80 ${inputClassName}`}
               value={state ?? ""}
               onChange={inputChangeFunction}
               type={type ?? "text"}
               placeholder={placeholder ?? "متن ورودی "}
               {...props}
            />
            {children}
            {icon}
         </div>
      </div>
   );
};

export default CustomInput;
