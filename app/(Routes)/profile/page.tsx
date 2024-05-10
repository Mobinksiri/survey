"use client";

import CustomInput from "@/app/_components/common/custom/CustomInput";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/app/_components/common/custom/CustomSelect";
import CustomButton from "@/app/_components/common/custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserData } from "@/app/store/user";
import apiCall, { useApiCall } from "@/app/_apiCall/apiCall";
import toast from "react-hot-toast";
import moment from "moment-jalaali";
import { setToLocalStorage } from "@/app/_utils/localStorage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// const ProfileContent = ({
//   userDetail,
//   mbtiList,
//   aniagramList,
//   provinces,
//   cities,
//   userDetailRefetch,
// }: {
//   userDetail: any;
//   mbtiList: any;
//   aniagramList: any;
//   cities: any;
//   provinces: any;
//   userDetailRefetch: any;
// }) => {
//   const dispatch = useDispatch();
//   const { userData } = useSelector(getUser);

//   // States for CustomInputs
//   const [username, setUsername] = useState<any>(null);
//   const [email, setEmail] = useState<any>(null);
//   const [name, setName] = useState<any>(null);
//   const [familyName, setFamilyName] = useState<any>(null);
//   const [nationalCode, setNationalCode] = useState<any>(null);
//   const [birthday, setBirthday] = useState<any>(null);
//   const [province, setProvince] = useState<any>('');
//   const [city, setCity] = useState<any>('');
//   const [bio, setBio] = useState<any>(null);

//   // States for CustomSelects
//   const [gender, setGender] = useState<any>('');
//   const [occupation, setOccupation] = useState('');
//   const [mbti, setMbti] = useState<any>('');
//   const [enneagram, setEnneagram] = useState<any>('');

//   useEffect(() => {
//     const findedCity = cities?.find((item: any) => item?.id === userDetail?.city);
//     const findedState = provinces?.find((item: any) => item?.id === userDetail?.state);
//     const findedMbti = mbtiList?.find((item: any) => item?.id === userDetail?.mbti);
//     const findedAniagram = aniagramList?.find((item: any) => item?.id === userDetail?.aniagram);

//     // set states depend on userDetail
//     setUsername(userDetail?.username);
//     setEmail(userDetail?.email);
//     setName(userDetail?.name);
//     setOccupation(userDetail?.job);
//     setFamilyName(userDetail?.familyname);
//     setNationalCode(userDetail?.naturalcode);
//     setBirthday(
//       userDetail?.birthDate
//         ? moment(userDetail?.birthDate, 'jYYYY-jMM-jDD').add(1, 'days').format('jYYYY/jMM/jDD')
//         : null,
//     );
//     setBio(userDetail?.bio);
//     setCity({
//       label: findedCity?.name,
//       value: findedCity?.id,
//     });
//     setProvince({
//       label: findedState?.name,
//       value: findedState?.id,
//     });
//     setMbti({
//       label: findedMbti?.name,
//       value: findedMbti?.id,
//     });
//     setEnneagram({
//       label: findedAniagram?.name,
//       value: findedAniagram?.id,
//     });
//     setGender({
//       label: userDetail?.gender == 1 ? 'مرد' : 'زن',
//       value: userDetail?.gender,
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userDetail]);

//   const editProfileDetail = () => {
//     apiCall({
//       url: `/api/users/${userData?.userId}`,
//       method: 'put',
//       data: {
//         name: name ?? '',
//         email: email ?? '',
//         familyname: familyName ?? '',
//         username: username ?? '',
//         naturalcode: nationalCode ?? '',
//         birthDate: birthday ?? null,
//         gender: gender?.value ?? 0,
//         job: occupation,
//         state: province?.value ?? 0,
//         city: city?.value ?? 0,
//         mbti: mbti?.value ?? 0,
//         aniagram: enneagram?.value ?? 0,
//         bio,
//       },
//       callback: (res, er) => {
//         if (res) {
//           toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
//         }
//         if (res && res?.userId) {
//           toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
//           setToLocalStorage('user', {
//             ...userData,
//             ...res,
//           });
//           dispatch(updateUserData(res));
//           userDetailRefetch();
//         }
//       },
//     });
//   };

//   return (
//     <div className=" grid gap-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <CustomInput
//           label="نام کاربری"
//           state={username}
//           setState={setUsername}
//           placeholder="نام کاربری خود را وارد کنید"
//           parentClassName="mb-4 lg:mb-0"
//         />
//         <CustomInput
//           label="ایمیل"
//           state={email}
//           setState={setEmail}
//           placeholder="ایمیل خود را وارد کنید"
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <CustomInput
//           label="نام"
//           state={name}
//           setState={setName}
//           placeholder="نام خود را وارد کنید"
//           parentClassName="mb-4 lg:mb-0"
//         />
//         <CustomInput
//           label="نام خانوادگی"
//           state={familyName}
//           setState={setFamilyName}
//           placeholder="نام خانوادگی خود را وارد کنید"
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <CustomInput
//           label="کد ملی"
//           state={nationalCode}
//           setState={setNationalCode}
//           placeholder="کد ملی خود را وارد کنید"
//           parentClassName="mb-4 lg:mb-0"
//         />
//         <CustomInput
//           label="تاریخ تولد"
//           state={birthday}
//           setState={setBirthday}
//           placeholder="تاریخ تولد خود را وارد کنید"
//           type="date"
//           icon={
//             <div className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
//               <i className="fa fa-regular fa-calendar text-text3 text-[18px]" />
//             </div>
//           }
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>جنسیت</p>
//           <CustomSelect
//             label="جنسیت"
//             options={[
//               {
//                 label: 'مرد',
//                 value: 1,
//               },
//               {
//                 label: 'زن',
//                 value: 2,
//               },
//             ]}
//             value={gender}
//             onChange={setGender}
//           />
//         </div>
//         <div>
//           <CustomInput
//             label="شغل"
//             state={occupation}
//             setState={setOccupation}
//             placeholder="شغل خود را وارد کنید"
//             parentClassName="mb-4 lg:mb-0"
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>استان</p>
//           <CustomSelect
//             label="استان"
//             options={
//               provinces &&
//               provinces?.[0] &&
//               provinces?.map((item: any) => ({
//                 label: item?.name,
//                 value: item?.id,
//               }))
//             }
//             value={province}
//             placeholder="استان خود را وارد کنید"
//             onChange={(e: any) => setProvince(e)}
//           />
//         </div>
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>شهر</p>
//           <CustomSelect
//             label="شهر"
//             options={
//               cities &&
//               cities?.[0] &&
//               cities?.map((item: any) => ({
//                 label: item?.name,
//                 value: item?.id,
//               }))
//             }
//             value={city}
//             placeholder="شهر خود را وارد کنید"
//             onChange={(e: any) => setCity(e)}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>اخرین مقطع تحصیلی</p>
//           <CustomSelect
//             label="اخرین مقطع تحصیلی"
//             options={[]}
//             // value={province}
//             placeholder="اخرین مقطع تحصیلی خود را وارد کنید"
//             // onChange={(e: any) => setProvince(e)}
//           />
//         </div>
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>رشته تحصیلی</p>
//           <CustomSelect
//             label="رشته تحصیلی"
//             options={[]}
//             // value={city}
//             placeholder="رشته تحصیلی خود را وارد کنید"
//             // onChange={(e: any) => setCity(e)}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
//         <div className="mb-4 lg:mb-0">
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تایپ های شخصیتی mbti</p>
//           <CustomSelect
//             label="تایپ های شخصیتی mbti"
//             options={
//               mbtiList &&
//               mbtiList?.[0] &&
//               mbtiList?.map((item: any) => ({
//                 label: item?.name,
//                 value: item?.id,
//               }))
//             }
//             value={mbti}
//             onChange={setMbti}
//           />
//         </div>
//         <div>
//           <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تایپ های شخصیتی انیاگرام</p>
//           <CustomSelect
//             label="تایپ های شخصیتی انیاگرام"
//             options={
//               aniagramList &&
//               aniagramList?.[0] &&
//               aniagramList?.map((item: any) => ({
//                 label: item?.name,
//                 value: item?.id,
//               }))
//             }
//             value={enneagram}
//             onChange={setEnneagram}
//           />
//         </div>
//       </div>
//       <div>
//         <CustomInput
//           label="بیوگرافی"
//           state={bio}
//           setState={setBio}
//           placeholder="بیوگرافی خود را وارد کنید"
//           type="textarea"
//         />
//         <p className="textXs text-text3">تعداد حروف پیام 500 الی 5000 حرف باشد</p>
//       </div>
//       <div className="flex w-fit mr-auto">
//         <CustomButton
//           className="!w-fit px-4 ml-2"
//           variant="outline"
//           type="button"
//           // onClick={() => reportSet(false)}
//         >
//           انصراف
//         </CustomButton>
//         <CustomButton
//           className="!w-fit px-4"
//           variant="primary"
//           type="button"
//           onClick={editProfileDetail}
//         >
//           ذخیره
//         </CustomButton>
//       </div>
//     </div>
//   );
// };

// const PasswordChangeContent = () => {
//   const { userData } = useSelector(getUser);

//   const [prePassword, setPrePassword] = useState('');
//   const [prePasswordError, setPrePasswordError] = useState('');
//   const [prePasswordShow, setPrePasswordShow] = useState(false);
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRePassword, setShowRePassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [rePasswordError, setRePasswordError] = useState('');

//   const togglePasswordVisibility = (type: 'password' | 'rePassword' | 'prePassword') => {
//     if (type === 'password') {
//       setShowPassword(!showPassword);
//     } else if (type === 'rePassword') {
//       setShowRePassword(!showRePassword);
//     } else if (type === 'prePassword') {
//       setPrePasswordShow(!prePasswordShow);
//     }
//   };

//   const handlePasswordChange = () => {
//     if (password.length < 8) {
//       setPasswordError('رمز عبور باید حداقل 8 حرف باشد.');
//       return;
//     } else {
//       setPasswordError('');
//     }

//     if (password !== rePassword) {
//       setRePasswordError('تکرار رمز عبور همخوانی ندارد.');
//       return;
//     } else {
//       setRePasswordError('');
//     }
//     apiCall({
//       url: `/api/updatePassword/${userData?.userId}`,
//       method: 'put',
//       data: {
//         exPassword: prePassword,
//         password: password,
//         confPassword: rePassword,
//       },
//       callback: (res, er) => {
//         if (er && er?.data?.msg) {
//           toast?.error(er?.data?.msg);
//           setPrePasswordError(er?.data?.msg);
//         }
//         if (res && res?.userId) {
//           // toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
//         }
//       },
//     });
//   };

//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-1 w-full lg:w-1/2 gap-x-6">
//         <div className="mb-5">
//           <div className="mb-4">
//             <CustomInput
//               label="رمز عبور فعلی"
//               state={prePassword}
//               setState={setPrePassword}
//               type={prePasswordShow ? 'text' : 'password'}
//               icon={
//                 <div
//                   className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
//                   onClick={() => togglePasswordVisibility('prePassword')}
//                 >
//                   <i
//                     className={`fa fa-regular ${
//                       prePasswordShow ? 'fa-eye-slash' : 'fa-eye'
//                     } text-text3 text-[18px]`}
//                   />
//                 </div>
//               }
//             />
//             {prePasswordError && (
//               <p className="text-rose-500 text-[12px] leading-8">{prePasswordError}</p>
//             )}
//           </div>
//           <CustomInput
//             label="رمز عبور"
//             state={password}
//             setState={setPassword}
//             inputClassName={`${passwordError ? 'border border-rose-500' : ''}`}
//             type={showPassword ? 'text' : 'password'}
//             icon={
//               <div
//                 className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
//                 onClick={() => togglePasswordVisibility('password')}
//               >
//                 <i
//                   className={`fa fa-regular ${
//                     showPassword ? 'fa-eye-slash' : 'fa-eye'
//                   } text-text3 text-[18px]`}
//                 />
//                 {passwordError && (
//                   <i className={`fa fa-solid fa-circle-info text-rose-500 mr-2 text-[18px]`} />
//                 )}
//               </div>
//             }
//           />
//           {passwordError && (
//             <p className="text-rose-500 font-normal text-[12px] leading-8">{passwordError}</p>
//           )}
//         </div>
//         <div className="mb-8">
//           <CustomInput
//             label="تکرار رمز عبور"
//             state={rePassword}
//             setState={setRePassword}
//             inputClassName={`${rePasswordError ? 'border border-rose-500' : ''}`}
//             type={showRePassword ? 'text' : 'password'}
//             icon={
//               <div
//                 className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
//                 onClick={() => togglePasswordVisibility('rePassword')}
//               >
//                 <i
//                   className={`fa fa-regular ${
//                     showRePassword ? 'fa-eye-slash' : 'fa-eye'
//                   } text-text3 text-[18px]`}
//                 />
//                 {rePasswordError && (
//                   <i className={`fa fa-solid fa-circle-info text-rose-500 mr-2 text-[18px]`} />
//                 )}
//               </div>
//             }
//           />
//           {rePasswordError && (
//             <p className="text-rose-500 font-normal text-[12px] leading-8">{rePasswordError}</p>
//           )}
//         </div>
//         <CustomButton variant="primary" type="button" onClick={handlePasswordChange}>
//           تغییر رمز عبور
//         </CustomButton>
//       </div>
//     </div>
//   );
// };

const Tabbar = ({
   array,
   onClick,
   activeItem,
}: {
   array: { title: string }[];
   onClick: any;
   activeItem: string;
}) => {
   return (
      <div className="grid  lg:flex rounded-md p-4 lg:p-2 bg-[#F2F1FB] lg:w-fit mb-10">
         {array?.map((item, index) => {
            return (
               <p
                  onClick={() => onClick(item)}
                  className={`px-2 lg:px-4 py-2 rounded-md cursor-pointer lg:text-[14px] transition-all ${
                     activeItem === item?.title
                        ? "bg-[#A29BFE] hover:bg-[#a29bfebd] text-white"
                        : "hover:bg-[rgba(0,0,0,0.05)]"
                  }`}
                  key={index}
               >
                  {item?.title}
               </p>
            );
         })}
      </div>
   );
};

const Page = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { userData } = useSelector(getUser);

   const [tabbarArray, tabbarArraySet] = useState([
      { title: "اطلاعات کاربری" },
      { title: "تغییر رمز عبور" },
   ]);

   const tabChangeFunction = (clickedItem: { title: string; active: boolean }) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const value = clickedItem?.title.trim();
      current.set("selected", value);
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
   };

   return (
      <div className="p-4 rounded-md shadow-default">
         <div className="bg-white lg:shadow-sidebar rounded-3xl p-2">
            <h4 className="textXl text-text1">پروفایل کاربری</h4>
            {/* <Tabbar
               onClick={tabChangeFunction}
               activeItem={searchParams.get("selected") ?? tabbarArray?.[0]?.title}
               array={tabbarArray}
            /> */}
            {searchParams.get("selected") == tabbarArray?.[0]?.title &&
               // <ProfileContent
               //   userDetail={userDetail}
               //   mbtiList={mbtiList}
               //   cities={cities}
               //   provinces={provinces}
               //   aniagramList={aniagramList}
               //   userDetailRefetch={userDetailRefetch}
               // />
               tabbarArray?.[0]?.title}
            {searchParams.get("selected") == tabbarArray?.[2]?.title &&
               // <PasswordChangeContent />
               tabbarArray?.[2]?.title}
         </div>
      </div>
   );
};

export default Page;
