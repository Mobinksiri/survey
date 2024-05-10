import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getLoginIsOpen, setIsOpenLogin } from "@/app/store/login";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";
import apiCall from "@/app/_apiCall/apiCall";
import toast from "react-hot-toast";
import { setToLocalStorage } from "@/app/_utils/localStorage";
import { setUserData } from "@/app/store/user";
import { baseUrls } from "@/app/_apiCall/baseUrls";

const Login = ({
   registerIsActiveSet,
}: {
   registerIsActiveSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const dispatch = useDispatch();

   const [email, emailSet] = useState("");
   const [password, passwordSet] = useState("");
   const [passwordType, passwordTypeSet] = useState("password");
   const [error, errorSet] = useState<any>(null);

   const handleLogin = () => {
      if (!email.trim() || !password.trim()) {
         errorSet("لطفا ایمیل یا پسورد را وارد کنید.");
      } else {
         return apiCall({
            baseUrl: baseUrls?.user,
            url: "/auth/login",
            method: "post",
            data: {
               email,
               password,
            },
            callback: (res, er) => {
               if (er) {
                  toast.error(er?.message);
                  errorSet(er?.message);
               }
               if (res && res?.data?.token) {
                  toast.success(res.message);
                  errorSet(null);
                  dispatch(setUserData(res));
                  setToLocalStorage("user", res?.data);
                  dispatch(setIsOpenLogin(false));
                  emailSet("");
                  passwordSet("");
               }
            },
         });
      }
   };

   const submitEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e?.nativeEvent?.key == "Enter") {
         e.preventDefault();
         handleLogin();
      }
   };

   return (
      <div className="w-full h-fit">
         <h5 className="textLg text-text1 mb-8">ورود به سامانه</h5>

         {error && <p className="text-red mb-6 textXs font-medium">{error}</p>}

         {/* inputs */}
         <div className="mb-12">
            <CustomInput
               inputClassName="bg-transparent mb-4"
               label="ایمیل"
               state={email}
               setState={emailSet}
               type="email"
               placeholder="ایمیل خود را وارد کنید"
            />
            <CustomInput
               inputClassName="bg-transparent mb-2"
               label="رمز عبور"
               state={password}
               setState={passwordSet}
               type={passwordType}
               placeholder="رمز عبور خود را وارد کنید"
               props={{ onKeyUp: submitEnter }}
               icon={
                  <i
                     onClick={() => {
                        if (passwordType == "password") {
                           passwordTypeSet("test");
                        } else {
                           passwordTypeSet("password");
                        }
                     }}
                     className={`absolute left-3 top-2 text-text1 fa fa-regular transition-all fa-${
                        passwordType == "password" ? "eye-slash" : "eye"
                     } cursor-pointer`}
                  />
               }
            />
            {/* <p className="text-[#A29BFE] mr-auto w-fit text-[12px] leading-[12px]">
               رمز عبور خود را فراموش کرده ام
            </p> */}
         </div>

         {/* button */}
         <CustomButton onClick={handleLogin} variant="primary" className="mb-6">
            ورود
         </CustomButton>

         {/* register */}
         <div>
            <p className="text-[12px] leading-[12px] text-text1 w-fit mx-auto">
               کاربر جدید هستید؟{" "}
               <span
                  onClick={() => {
                     registerIsActiveSet(true);
                  }}
                  className="text-[#A29BFE] cursor-pointer"
               >
                  ثبت نام
               </span>
            </p>
         </div>
      </div>
   );
};

const Register = ({
   registerIsActiveSet,
}: {
   registerIsActiveSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const [userName, userNameSet] = useState("");
   const [email, emailSet] = useState("");
   const [password, passwordSet] = useState("");
   const [passwordType, passwordTypeSet] = useState("password");
   const [confirmPasswordType, confirmPasswordTypeSet] = useState("password");
   const [confirmPassword, confirmPasswordSet] = useState("");

   const handleRegisterClick = () => {
      if (password !== confirmPassword) {
         toast.error("رمز عبور و تأیید رمز عبور باید یکسان باشند");
         return;
      }

      return apiCall({
         baseUrl: baseUrls?.user,
         url: "/auth/Register",
         method: "post",
         data: {
            username: userName,
            email,
            password,
            passwordConfirm: password,
         },
         callback: (res, er) => {
            if (res?.message) {
               toast.success(res?.message);
               registerIsActiveSet(false);
               userNameSet("");
               emailSet("");
               passwordSet("");
               confirmPasswordSet("");
            } else {
               toast.error(res);
            }
         },
      });
   };

   return (
      <div className="w-full h-fit">
         <h5 className="textLg text-text1 mb-8">ثبت نام در سامانه</h5>

         {/* inputs */}
         <div className="mb-8">
            <CustomInput
               inputClassName="bg-transparent mb-4"
               label="نام کاربری"
               state={userName}
               setState={userNameSet}
               type="text"
               placeholder="نام کاربری خود را وارد کنید"
            />
            <CustomInput
               inputClassName="bg-transparent mb-4"
               label="ایمیل"
               state={email}
               setState={emailSet}
               type="text"
               placeholder="ایمیل خود را وارد کنید"
            />
            <CustomInput
               inputClassName="bg-transparent mb-4"
               label="رمز عبور"
               state={password}
               setState={passwordSet}
               type={passwordType}
               placeholder="رمز عبور خود را وارد کنید"
               icon={
                  <i
                     onClick={() => {
                        if (passwordType == "password") {
                           passwordTypeSet("test");
                        } else {
                           passwordTypeSet("password");
                        }
                     }}
                     className={`absolute left-3 top-2 text-text1 fa fa-regular transition-all fa-${
                        passwordType == "password" ? "eye-slash" : "eye"
                     } cursor-pointer`}
                  />
               }
            />
            <CustomInput
               inputClassName="bg-transparent mb-4"
               label="تأیید رمز عبور"
               state={confirmPassword}
               setState={confirmPasswordSet}
               type={confirmPasswordType}
               placeholder="رمز عبور خود را دوباره وارد کنید"
               icon={
                  <i
                     onClick={() => {
                        if (confirmPasswordType == "password") {
                           confirmPasswordTypeSet("test");
                        } else {
                           confirmPasswordTypeSet("password");
                        }
                     }}
                     className={`absolute left-3 top-2 text-text1 fa fa-regular transition-all fa-${
                        confirmPasswordType == "password" ? "eye-slash" : "eye"
                     } cursor-pointer`}
                  />
               }
            />
         </div>

         {/* button */}
         <CustomButton onClick={handleRegisterClick} variant="primary" className="mb-6">
            ثبت نام
         </CustomButton>

         {/* register */}
         <div>
            <p className="text-[12px] leading-[12px] text-text1 w-fit mx-auto">
               قبلا ثبت نام کردید؟{" "}
               <span
                  onClick={() => {
                     registerIsActiveSet(false);
                  }}
                  className="text-[#A29BFE] cursor-pointer"
               >
                  ورود
               </span>
            </p>
         </div>
      </div>
   );
};

const LoginAndRegister = () => {
   const dispatch = useDispatch();

   const [registerIsActive, registerIsActiveSet] = useState(false);

   // get login modal isOpen property
   const { isOpen } = useSelector(getLoginIsOpen);

   const closeModal = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if ((e?.target as HTMLDivElement)?.id == "modal-backdrop") {
         dispatch(setIsOpenLogin(false));
      }
   };

   return (
      <>
         <Modal isOpen={isOpen} onClick={closeModal}>
            <div className="relative w-[500px] p-8 bg-white shadow-articlePost rounded-lg flex items-center">
               {/* close arrow */}
               <i
                  onClick={() => dispatch(setIsOpenLogin(false))}
                  className="fa fa-solid text-primary p-5 cursor-pointer fa-xmark text-[20px] absolute left-2 top-1"
               />

               {/* right side */}
               {registerIsActive ? (
                  <Register registerIsActiveSet={registerIsActiveSet} />
               ) : (
                  <Login registerIsActiveSet={registerIsActiveSet} />
               )}
            </div>
         </Modal>
      </>
   );
};

export default LoginAndRegister;
