import React, { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { setDropdownActiveId } from "@/app/store/navigation";
import useScrollY from "@/app/_hooks/useScrollY";
import { usePathname } from "next/navigation";
import useGetDropdown from "@/app/_constant_arrays/useGetDropdown";
import Link from "next/link";

interface liProps {
   title: string;
   dataSet: string;
}

const NavLink = ({ li, index }: { homeFixed?: boolean; index: number; li: liProps }) => {
   const dispatch = useDispatch();
   const pathname = usePathname();
   const dropdown = useGetDropdown();

   const findDropdownDetail = dropdown?.find((drop) => drop?.id === li?.dataSet) || null;

   const [dropdownShow, dropDownShowSet] = useState(false);

   const handleDropdownShow: MouseEventHandler<HTMLLIElement> = () => {
      dropDownShowSet(true);
   };
   const handleDropdownClose: MouseEventHandler<HTMLLIElement> = () => {
      dropDownShowSet(false);
   };

   useEffect(() => {
      dispatch(setDropdownActiveId(null));
   }, [dispatch, pathname]);

   return (
      <li
         onMouseOver={handleDropdownShow}
         onMouseLeave={handleDropdownClose}
         id={li?.dataSet}
         className={`relative flex items-center ml-6 last:ml-0 textSm cursor-pointer transition-all text-text1`}
      >
         {findDropdownDetail && findDropdownDetail?.items?.length > 0 ? (
            <Dropdown index={index} show={dropdownShow} detail={findDropdownDetail} />
         ) : null}
         {findDropdownDetail && findDropdownDetail?.items?.length > 0 ? (
            li?.title
         ) : (
            <Link href={"/" + findDropdownDetail?.href ?? ""}>{li?.title}</Link>
         )}

         {findDropdownDetail && findDropdownDetail?.items?.length > 0 ? (
            <i
               className={`transition-all fa-solid fa-angle-down text-[10px] leading-[8px] mr-3 pointer-events-none ${
                  dropdownShow ? "rotate-180" : ""
               }`}
            />
         ) : null}
      </li>
   );
};

export default NavLink;
