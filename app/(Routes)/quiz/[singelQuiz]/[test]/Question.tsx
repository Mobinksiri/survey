import CustomInput from "@/app/_components/common/custom/CustomInput";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import { getTest, setTest } from "@/app/store/test";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

const Question = ({
   data,
   increaseStep,
   choices,
}: {
   data: any;
   increaseStep: any;
   decreaseStep: any;
   choices: any;
}) => {
   const dispatch = useDispatch();

   const [text, textSet] = useState(null);
   const { answers: answersRedux } = useSelector(getTest);

   const title = data?.title;
   const require = data?.require;
   const description = data?.description;
   const type = data?.type;
   const scale = data?.scale;
   const rate = data?.rate;
   const id = data?.id;

   const foundedChoice = answersRedux?.find((i) => i?.questionId == id);
   const foundedAnswerByChoiceId = choices?.find((i: any) => i?.id === foundedChoice?.choiceId);

   return (
      <div className="mb-6">
         {title ? (
            <p className="textSm font-bold text-text1 mb-2">
               {require ? <span className="text-red"> * </span> : null}
               {data?.order}_ {title}
            </p>
         ) : null}
         {description ? <p className="textSmm font-normal text-text3 mb-4">{description}</p> : null}
         {type === 1 ? (
            <div className={`grid gap-2 grid-cols-1 transition-all`}>
               {choices?.map((item: any, index: number) => {
                  return (
                     <p
                        key={index}
                        className={`hover:border-[#2BBB9C] transition-all p-3 pl-2 shadow-articlePost border-[2px] rounded-md cursor-pointer textSmm font-normal text-text1 mb-2 ${
                           foundedChoice?.choiceId === item?.id ? "border-[#2BBB9C]" : ""
                        }`}
                        onClick={() => {
                           dispatch(
                              setTest({
                                 type: "ADD_QUESTION",
                                 id: data?.id,
                                 choiceId: item?.id,
                                 questionType: type,
                              })
                           );
                           increaseStep(true);
                        }}
                     >
                        <span className="inline-block w-5 h-5 rounded-md ml-2 text-center bg-text1 text-white">
                           {index + 1}
                        </span>
                        <span>{item?.choiceTitle}</span>
                     </p>
                  );
               })}
            </div>
         ) : null}
         {type === 2 ? (
            <div className={`grid gap-2 grid-cols-1 transition-all`}>
               {choices?.length && (
                  <CustomSelect
                     maxHeight="200px"
                     options={
                        choices?.some((item: any) => item?.choiceTitle)
                           ? choices?.map((item: any) => ({
                                label: item?.choiceTitle,
                                value: item?.id,
                             }))
                           : []
                     }
                     defaultValue={
                        foundedAnswerByChoiceId
                           ? {
                                value: foundedAnswerByChoiceId?.id,
                                label: foundedAnswerByChoiceId?.choiceTitle,
                             }
                           : null
                     }
                     onChange={(e: any) => {
                        dispatch(
                           setTest({
                              type: "ADD_QUESTION",
                              id: data?.id,
                              choiceId: e?.value,
                              questionType: type,
                           })
                        );
                        increaseStep(true);
                     }}
                     placeholder="پاسخ خود را انتخاب یا جستجو نمایید."
                  />
               )}
            </div>
         ) : null}
         {type === 3 ? (
            <div className="flex items-center gap-2">
               <div className="flex items-center w-[380px] h-[40px] rounded-xl overflow-hidden">
                  {Array.from(Array(scale).keys())?.map((item, index) => {
                     const displayedValue = item + 1;
                     return (
                        <div
                           key={index}
                           className={`flex items-center justify-center hover:bg-[#222] transition-all cursor-pointer w-full h-full text-white textSmm ${
                              foundedChoice &&
                              foundedChoice?.score &&
                              foundedChoice?.score == displayedValue
                                 ? "bg-[#222]"
                                 : "bg-[#333]"
                           }`}
                           onClick={() => {
                              dispatch(
                                 setTest({
                                    type: "ADD_QUESTION",
                                    id: data?.id,
                                    choiceId: displayedValue,
                                    questionType: type,
                                 })
                              );
                              increaseStep(true);
                           }}
                        >
                           {displayedValue}
                        </div>
                     );
                  })}
               </div>
            </div>
         ) : null}
         {type === 4 ? (
            <div className="flex items-center gap-2">
               <div className="flex items-center w-[380px] h-[40px] rounded-xl overflow-hidden">
                  <Rating
                     onClick={(e) => {
                        dispatch(
                           setTest({
                              type: "ADD_QUESTION",
                              id: data?.id,
                              choiceId: e,
                              questionType: type,
                           })
                        );
                        increaseStep(true);
                     }}
                     initialValue={foundedChoice && foundedChoice?.score ? foundedChoice?.score : 0}
                     SVGclassName="inline w-8 h-8"
                     transition
                     iconsCount={rate}
                  />
               </div>
            </div>
         ) : null}
         {type === 5 ? (
            <div className="">
               <p className="text-[12px] text-text3 font-normal mb-2">
                  می‌توانید با SHIFT+ENTER به خط بعد بروید.
               </p>
               <CustomInput
                  type="textarea"
                  state={text}
                  setState={textSet}
                  onChangeFunction={(e: string) => {
                     dispatch(
                        setTest({
                           type: "ADD_QUESTION",
                           id: data?.id,
                           choiceId: e,
                           questionType: type,
                        })
                     );
                  }}
                  paragraphClassName="!text-text1"
                  parentClassName="!w-[300px]"
                  inputClassName="!bg-transparent"
                  placeholder="محل درج پاسخ"
               />
            </div>
         ) : null}
      </div>
   );
};

export default Question;
