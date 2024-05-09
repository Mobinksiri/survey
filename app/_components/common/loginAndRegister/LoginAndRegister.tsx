import React, { useState } from 'react';
import Modal from '../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginIsOpen, setIsOpenLogin } from '@/app/store/login';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import loginImage from '@/app/_assets/other/login-register/login.svg';
import registerImage from '@/app/_assets/other/login-register/register.svg';
import Image from 'next/image';
import apiCall from '@/app/_apiCall/apiCall';
import toast from 'react-hot-toast';
import { setToLocalStorage } from '@/app/_utils/localStorage';
import { setUserData } from '@/app/store/user';

const Login = ({
  registerIsActiveSet,
}: {
  registerIsActiveSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  // login detail states
  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [passwordType, passwordTypeSet] = useState('password');
  const [error, errorSet] = useState<any>(null);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      errorSet('لطفا ایمیل یا پسورد را وارد کنید.');
    } else {
      return apiCall({
        url: '/api/users/login',
        method: 'post',
        data: {
          email,
          password,
        },
        callback: (res, er) => {
          if (res.error) {
            toast.error(res.error);
            errorSet(res.error);
          }
          if (res?.userId && res?.accessToken) {
            toast.success(res.msg);
            errorSet(null);
            dispatch(setUserData(res));
            setToLocalStorage('user', res);
            dispatch(setIsOpenLogin(false));
          }
        },
      });
    }
  };

  const submitEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e?.nativeEvent?.key == 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="w-full lg:ml-[70px] h-fit">
      <h5 className="textXl text-text1 mt-4 mb-6 lg:mb-12">ورود به ایما</h5>

      {error && <p className="text-rose-700 mb-6 text-[13px]">{error}</p>}

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
                if (passwordType == 'password') {
                  passwordTypeSet('test');
                } else {
                  passwordTypeSet('password');
                }
              }}
              className={`absolute left-3 top-2 text-text1 fa fa-regular transition-all fa-${
                passwordType == 'password' ? 'eye-slash' : 'eye'
              } cursor-pointer`}
            />
          }
        />
        <p className="text-[#A29BFE] mr-auto w-fit text-[12px] leading-[12px]">
          رمز عبور خود را فراموش کرده ام
        </p>
      </div>

      {/* button */}
      <CustomButton onClick={handleLogin} variant="primary" className="mb-6">
        ورود
      </CustomButton>

      {/* register */}
      <div>
        <p className="text-[12px] leading-[12px] text-text1 w-fit mx-auto">
          کاربر جدید هستید؟{' '}
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
  const [userName, userNameSet] = useState('');
  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [passwordType, passwordTypeSet] = useState('password');

  const handleRegisterClick = () => {
    return apiCall({
      url: '/api/users/register',
      method: 'post',
      data: {
        name: userName,
        email,
        password,
        confPassword: password,
      },
      callback: (res, er) => {
        if (res?.message) {
          toast.success(res?.message);
          registerIsActiveSet(false);
        } else {
          toast.error(res);
        }
      },
    });
  };

  return (
    <div className="w-full lg:ml-[70px] h-fit">
      <h5 className="textXl text-text1 mt-4 mb-6 lg:mb-12">ثبت نام در ایما</h5>

      {/* {error && <div>{error}</div>} */}

      {/* inputs */}
      <div className="mb-8">
        <CustomInput
          inputClassName="bg-transparent mb-4"
          label="نام"
          state={userName}
          setState={userNameSet}
          type="text"
          placeholder="نام خود را وارد کنید"
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
          inputClassName="bg-transparent mb-2"
          label="رمز عبور"
          state={password}
          setState={passwordSet}
          type={passwordType}
          placeholder="رمز عبور خود را وارد کنید"
          icon={
            <i
              onClick={() => {
                if (passwordType == 'password') {
                  passwordTypeSet('test');
                } else {
                  passwordTypeSet('password');
                }
              }}
              className={`absolute left-3 top-2 text-text1 fa fa-regular transition-all fa-${
                passwordType == 'password' ? 'eye-slash' : 'eye'
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
          قبلا ثبت نام کردید؟{' '}
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
    if ((e?.target as HTMLDivElement)?.id == 'modal-backdrop') {
      dispatch(setIsOpenLogin(false));
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClick={closeModal}>
        <div className="relative w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[950px] bg-white shadow-articlePost rounded-3xl flex items-center p-8 lg:py-10 lg:px-[50px]">
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

          {/* left side */}
          <div className="hidden lg:flex w-full h-fit  flex-col items-center justify-center">
            <div className="mb-6">
              <h1 className="textXl mb-2 text-[#A29BFE]">لورم ایپسوم متن</h1>
              <p className="text-[16px] leading-5 text-text3 font-light">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                گرافیک است چاپگر ها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
              </p>
            </div>
            {registerIsActive ? (
              <Image src={loginImage} alt="ورود به سایت" className="w-10/12 h-10/12" />
            ) : (
              <Image src={loginImage} alt="ورود به سایت" className="w-10/12 h-10/12" />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginAndRegister;
