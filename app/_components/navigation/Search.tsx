"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSearchRedux, setSearchActivate } from "@/app/store/searchOpen";
import { useRouter } from "next/navigation";

const Search = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const searchParams = useSearchParams();

   const { searchActive } = useSelector(getSearchRedux);

   const inputRef = useRef<HTMLInputElement | null>(null);

   const [searchedValue, searchedValueSet] = useState<null | string>(null);

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         const targetElement = e.target as HTMLElement;
         if (!inputRef?.current?.contains(targetElement) && targetElement.id !== "search-icon") {
            dispatch(setSearchActivate(false));
         }
      };

      window.addEventListener("click", handleClickOutside);

      return () => {
         window.removeEventListener("click", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const motionVariants = {
      open: {
         width: "200px",
         border: "2px solid #272727",
      },
      close: {
         width: "32px",
         border: "2px solid transparent",
      },
   };

   useEffect(() => {
      if (searchActive && inputRef?.current) {
         inputRef.current.focus();
      }
   }, [searchActive]);

   const toggleSearchBar = () => {
      dispatch(setSearchActivate(!searchActive));
   };

   const inputClasses = `absolute top-0 left-0 w-full h-full border-none bg-transparent outline-none pr-12 placeholder:text-[13px] placeholder:font-light text-sm text-text1 ${
      searchActive ? "block" : "hidden"
   }`;

   const searchSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e?.nativeEvent?.key == "Enter" && searchedValue?.trim()) {
         e.preventDefault();
         const current = new URLSearchParams(Array.from(searchParams.entries()));
         const value = searchedValue;
         current.set("search", value as string);
         const search = current.toString();
         const query = search ? `?${search}` : "";
         router.push(`/search${query}`, { scroll: false });
      }
   };

   const onChangeSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e?.target?.value;
      searchedValueSet(value);
   };

   return (
      <motion.div
         id="search-box"
         variants={motionVariants}
         transition={{
            type: "spring",
            bounce: 0.3,
         }}
         animate={searchActive ? "open" : "close"}
         className={`ml-8 relative px-4 py-2 rounded-md h-[40px] overflow-hidden`}
      >
         <input
            ref={inputRef}
            id="search-input"
            type="text"
            className={inputClasses}
            placeholder="جستجو..."
            onKeyUp={searchSubmit}
            onChange={onChangeSearch}
         />
         <i
            id="search-icon"
            onClick={toggleSearchBar}
            className={`fa-regular fa-magnifying-glass text-[16px] cursor-pointer transition-all leading-[22.5px] z-2 text-text1`}
         />
      </motion.div>
   );
};

export default Search;
