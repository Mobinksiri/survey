'use client';

import CustomInput from '@/app/_components/common/custom/CustomInput';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserData } from '@/app/store/user';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import toast from 'react-hot-toast';
import moment from 'moment-jalaali';
import { setToLocalStorage } from '@/app/_utils/localStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ImageEditor from '@/app/_components/editors/ImageEditor';
import { aniagram_types, mbti_types } from '@/app/_utils/types';

const RenderAvatarSection = ({
  avatars,
  activeId,
  setActiveId,
}: {
  avatars: { id: number; url: string }[];
  activeId: any;
  setActiveId: any;
}) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-7 gap-4 lg:grid-cols-8">
      {avatars &&
        avatars?.[0] &&
        avatars?.map((avatar) => {
          return (
            <div
              key={avatar.id}
              className={`flex items-center justify-center cursor-pointer`}
              onClick={() => {
                setActiveId(avatar.id);
              }}
            >
              <Image
                src={avatar.url}
                alt={`avatar-${avatar.id}`}
                width={87}
                height={87}
                className={`lg:w-[87px] lg:h-[87px] rounded-full transition-all hover:scale-95 ${
                  activeId === avatar.id ? 'border-[3px] border-[#A29BFE] rounded-full' : ''
                }`}
              />
            </div>
          );
        })}
    </div>
  );
};

const ProfileImage = ({ avatars, userDetail }: { avatars: any; userDetail: any }) => {
  const { userData } = useSelector(getUser);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    if (userDetail && userDetail?.avatar && userDetail?.avatar?.id) {
      setActiveId(userDetail?.avatar?.id);
    }
  }, [userDetail]);

  const editProfileDetail = async () => {
    if (activeId) {
      return apiCall({
        url: `/api/userAvatar/${userData?.userId}`,
        method: 'put',
        formDataIsNeeded: true,
        data: {
          avatar: activeId,
        },
        callback: (res, er) => {
          if (res) {
            toast.success('آواتار با موفقیت آپدیت شد');
            setToLocalStorage('user', {
              ...userData,
              ...res,
              avatar: res?.avatar,
            });
            dispatch(updateUserData({ ...res, avatar: res?.avatar }));
          }
        },
      });
    } else {
      toast.error('لطفا آواتار مورد نظر خود را انتخاب کنید.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="textMd text-text1 mb-6">آواتارهای پیش فرض</p>
        <RenderAvatarSection
          activeId={activeId}
          setActiveId={setActiveId}
          avatars={avatars?.slice(0, 4)}
        />
      </div>
      <div className="mb-8">
        <p className="textMd text-text1 mb-6">آواتار های پیشنهادی</p>
        <div className="lg:flex lg:items-center  lg:justify-end mb-6">
          <div className="flex lg:flex-row flex-col items-center  justify-end mb-6">
            <CustomSelect
              placeholder="تایپ انیاگرام"
              options={aniagram_types}
              className="w-full mb-2 lg:mb-0 lg:ml-4"
            />
            <CustomSelect
              placeholder="تایپ mbti"
              options={mbti_types}
              className="w-full mb-2 lg:mb-0 lg:ml-4"
            />
            <CustomSelect
              options={[
                {
                  label: 'مرد',
                  value: 1,
                },
                {
                  label: 'زن',
                  value: 2,
                },
              ]}
              placeholder="جنسیت"
              className="w-full mb-2 lg:mb-0 lg:ml-4"
            />
          </div>
        </div>
        <RenderAvatarSection
          activeId={activeId}
          setActiveId={setActiveId}
          avatars={avatars?.slice(4, 10)}
        />
      </div>
      <CustomButton
        className="!w-fit px-4 mr-auto "
        variant="primary"
        type="button"
        onClick={editProfileDetail}
      >
        ذخیره
      </CustomButton>
    </div>
  );
};

const ProfileContent = ({
  userDetail,
  mbtiList,
  aniagramList,
  provinces,
  cities,
  userDetailRefetch,
}: {
  userDetail: any;
  mbtiList: any;
  aniagramList: any;
  cities: any;
  provinces: any;
  userDetailRefetch: any;
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUser);

  // States for CustomInputs
  const [username, setUsername] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [familyName, setFamilyName] = useState<any>(null);
  const [nationalCode, setNationalCode] = useState<any>(null);
  const [birthday, setBirthday] = useState<any>(null);
  const [province, setProvince] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [bio, setBio] = useState<any>(null);

  // States for CustomSelects
  const [gender, setGender] = useState<any>('');
  const [occupation, setOccupation] = useState('');
  const [mbti, setMbti] = useState<any>('');
  const [enneagram, setEnneagram] = useState<any>('');

  useEffect(() => {
    const findedCity = cities?.find((item: any) => item?.id === userDetail?.city);
    const findedState = provinces?.find((item: any) => item?.id === userDetail?.state);
    const findedMbti = mbtiList?.find((item: any) => item?.id === userDetail?.mbti);
    const findedAniagram = aniagramList?.find((item: any) => item?.id === userDetail?.aniagram);

    // set states depend on userDetail
    setUsername(userDetail?.username);
    setEmail(userDetail?.email);
    setName(userDetail?.name);
    setOccupation(userDetail?.job);
    setFamilyName(userDetail?.familyname);
    setNationalCode(userDetail?.naturalcode);
    setBirthday(
      userDetail?.birthDate
        ? moment(userDetail?.birthDate, 'jYYYY-jMM-jDD').add(1, 'days').format('jYYYY/jMM/jDD')
        : null,
    );
    setBio(userDetail?.bio);
    setCity({
      label: findedCity?.name,
      value: findedCity?.id,
    });
    setProvince({
      label: findedState?.name,
      value: findedState?.id,
    });
    setMbti({
      label: findedMbti?.name,
      value: findedMbti?.id,
    });
    setEnneagram({
      label: findedAniagram?.name,
      value: findedAniagram?.id,
    });
    setGender({
      label: userDetail?.gender == 1 ? 'مرد' : 'زن',
      value: userDetail?.gender,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  const editProfileDetail = () => {
    apiCall({
      url: `/api/users/${userData?.userId}`,
      method: 'put',
      data: {
        name: name ?? '',
        email: email ?? '',
        familyname: familyName ?? '',
        username: username ?? '',
        naturalcode: nationalCode ?? '',
        birthDate: birthday ?? null,
        gender: gender?.value ?? 0,
        job: occupation,
        state: province?.value ?? 0,
        city: city?.value ?? 0,
        mbti: mbti?.value ?? 0,
        aniagram: enneagram?.value ?? 0,
        bio,
      },
      callback: (res, er) => {
        if (res) {
          toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
        }
        if (res && res?.userId) {
          toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
          setToLocalStorage('user', {
            ...userData,
            ...res,
          });
          dispatch(updateUserData(res));
          userDetailRefetch();
        }
      },
    });
  };

  return (
    <div className=" grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <CustomInput
          label="نام کاربری"
          state={username}
          setState={setUsername}
          placeholder="نام کاربری خود را وارد کنید"
          parentClassName="mb-4 lg:mb-0"
        />
        <CustomInput
          label="ایمیل"
          state={email}
          setState={setEmail}
          placeholder="ایمیل خود را وارد کنید"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <CustomInput
          label="نام"
          state={name}
          setState={setName}
          placeholder="نام خود را وارد کنید"
          parentClassName="mb-4 lg:mb-0"
        />
        <CustomInput
          label="نام خانوادگی"
          state={familyName}
          setState={setFamilyName}
          placeholder="نام خانوادگی خود را وارد کنید"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <CustomInput
          label="کد ملی"
          state={nationalCode}
          setState={setNationalCode}
          placeholder="کد ملی خود را وارد کنید"
          parentClassName="mb-4 lg:mb-0"
        />
        <CustomInput
          label="تاریخ تولد"
          state={birthday}
          setState={setBirthday}
          placeholder="تاریخ تولد خود را وارد کنید"
          type="date"
          icon={
            <div className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <i className="fa fa-regular fa-calendar text-text3 text-[18px]" />
            </div>
          }
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>جنسیت</p>
          <CustomSelect
            label="جنسیت"
            options={[
              {
                label: 'مرد',
                value: 1,
              },
              {
                label: 'زن',
                value: 2,
              },
            ]}
            value={gender}
            onChange={setGender}
          />
        </div>
        <div>
          <CustomInput
            label="شغل"
            state={occupation}
            setState={setOccupation}
            placeholder="شغل خود را وارد کنید"
            parentClassName="mb-4 lg:mb-0"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>استان</p>
          <CustomSelect
            label="استان"
            options={
              provinces &&
              provinces?.[0] &&
              provinces?.map((item: any) => ({
                label: item?.name,
                value: item?.id,
              }))
            }
            value={province}
            placeholder="استان خود را وارد کنید"
            onChange={(e: any) => setProvince(e)}
          />
        </div>
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>شهر</p>
          <CustomSelect
            label="شهر"
            options={
              cities &&
              cities?.[0] &&
              cities?.map((item: any) => ({
                label: item?.name,
                value: item?.id,
              }))
            }
            value={city}
            placeholder="شهر خود را وارد کنید"
            onChange={(e: any) => setCity(e)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>اخرین مقطع تحصیلی</p>
          <CustomSelect
            label="اخرین مقطع تحصیلی"
            options={[]}
            // value={province}
            placeholder="اخرین مقطع تحصیلی خود را وارد کنید"
            // onChange={(e: any) => setProvince(e)}
          />
        </div>
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>رشته تحصیلی</p>
          <CustomSelect
            label="رشته تحصیلی"
            options={[]}
            // value={city}
            placeholder="رشته تحصیلی خود را وارد کنید"
            // onChange={(e: any) => setCity(e)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="mb-4 lg:mb-0">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تایپ های شخصیتی mbti</p>
          <CustomSelect
            label="تایپ های شخصیتی mbti"
            options={
              mbtiList &&
              mbtiList?.[0] &&
              mbtiList?.map((item: any) => ({
                label: item?.name,
                value: item?.id,
              }))
            }
            value={mbti}
            onChange={setMbti}
          />
        </div>
        <div>
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تایپ های شخصیتی انیاگرام</p>
          <CustomSelect
            label="تایپ های شخصیتی انیاگرام"
            options={
              aniagramList &&
              aniagramList?.[0] &&
              aniagramList?.map((item: any) => ({
                label: item?.name,
                value: item?.id,
              }))
            }
            value={enneagram}
            onChange={setEnneagram}
          />
        </div>
      </div>
      <div>
        <CustomInput
          label="بیوگرافی"
          state={bio}
          setState={setBio}
          placeholder="بیوگرافی خود را وارد کنید"
          type="textarea"
        />
        <p className="textXs text-text3">تعداد حروف پیام 500 الی 5000 حرف باشد</p>
      </div>
      <div className="flex w-fit mr-auto">
        <CustomButton
          className="!w-fit px-4 ml-2"
          variant="outline"
          type="button"
          // onClick={() => reportSet(false)}
        >
          انصراف
        </CustomButton>
        <CustomButton
          className="!w-fit px-4"
          variant="primary"
          type="button"
          onClick={editProfileDetail}
        >
          ذخیره
        </CustomButton>
      </div>
    </div>
  );
};

const PasswordChangeContent = () => {
  const { userData } = useSelector(getUser);

  const [prePassword, setPrePassword] = useState('');
  const [prePasswordError, setPrePasswordError] = useState('');
  const [prePasswordShow, setPrePasswordShow] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  const togglePasswordVisibility = (type: 'password' | 'rePassword' | 'prePassword') => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'rePassword') {
      setShowRePassword(!showRePassword);
    } else if (type === 'prePassword') {
      setPrePasswordShow(!prePasswordShow);
    }
  };

  const handlePasswordChange = () => {
    if (password.length < 8) {
      setPasswordError('رمز عبور باید حداقل 8 حرف باشد.');
      return;
    } else {
      setPasswordError('');
    }

    if (password !== rePassword) {
      setRePasswordError('تکرار رمز عبور همخوانی ندارد.');
      return;
    } else {
      setRePasswordError('');
    }
    apiCall({
      url: `/api/updatePassword/${userData?.userId}`,
      method: 'put',
      data: {
        exPassword: prePassword,
        password: password,
        confPassword: rePassword,
      },
      callback: (res, er) => {
        if (er && er?.data?.msg) {
          toast?.error(er?.data?.msg);
          setPrePasswordError(er?.data?.msg);
        }
        if (res && res?.userId) {
          // toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
        }
      },
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 w-full lg:w-1/2 gap-x-6">
        <div className="mb-5">
          <div className="mb-4">
            <CustomInput
              label="رمز عبور فعلی"
              state={prePassword}
              setState={setPrePassword}
              type={prePasswordShow ? 'text' : 'password'}
              icon={
                <div
                  className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                  onClick={() => togglePasswordVisibility('prePassword')}
                >
                  <i
                    className={`fa fa-regular ${
                      prePasswordShow ? 'fa-eye-slash' : 'fa-eye'
                    } text-text3 text-[18px]`}
                  />
                </div>
              }
            />
            {prePasswordError && (
              <p className="text-rose-500 text-[12px] leading-8">{prePasswordError}</p>
            )}
          </div>
          <CustomInput
            label="رمز عبور"
            state={password}
            setState={setPassword}
            inputClassName={`${passwordError ? 'border border-rose-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            icon={
              <div
                className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                onClick={() => togglePasswordVisibility('password')}
              >
                <i
                  className={`fa fa-regular ${
                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                  } text-text3 text-[18px]`}
                />
                {passwordError && (
                  <i className={`fa fa-solid fa-circle-info text-rose-500 mr-2 text-[18px]`} />
                )}
              </div>
            }
          />
          {passwordError && (
            <p className="text-rose-500 font-normal text-[12px] leading-8">{passwordError}</p>
          )}
        </div>
        <div className="mb-8">
          <CustomInput
            label="تکرار رمز عبور"
            state={rePassword}
            setState={setRePassword}
            inputClassName={`${rePasswordError ? 'border border-rose-500' : ''}`}
            type={showRePassword ? 'text' : 'password'}
            icon={
              <div
                className="rounded-xl absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                onClick={() => togglePasswordVisibility('rePassword')}
              >
                <i
                  className={`fa fa-regular ${
                    showRePassword ? 'fa-eye-slash' : 'fa-eye'
                  } text-text3 text-[18px]`}
                />
                {rePasswordError && (
                  <i className={`fa fa-solid fa-circle-info text-rose-500 mr-2 text-[18px]`} />
                )}
              </div>
            }
          />
          {rePasswordError && (
            <p className="text-rose-500 font-normal text-[12px] leading-8">{rePasswordError}</p>
          )}
        </div>
        <CustomButton variant="primary" type="button" onClick={handlePasswordChange}>
          تغییر رمز عبور
        </CustomButton>
      </div>
    </div>
  );
};

const TeacherInformation = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUser);
  const [jobDescription, setJobDescription] = useState('');
  const [job, setJob] = useState('');
  const [resume, setResume] = useState<File | null>();
  const formData = new FormData();
  if (resume) {
    formData.append('resume', resume);
  }
  formData.append('jobDescription', jobDescription);
  formData.append('job', job);
  const handelPdfFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setResume(selectedImage);
    }
  };

  const editProfileDetail = ({ userDetailRefetch }: { userDetailRefetch: any }) => {
    apiCall({
      url: `/api/users/${userData?.userId}`,
      method: 'put',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res && res?.userId) {
          toast.success('اطلاعات کاربر با موفقیت آپدیت شد');
          setToLocalStorage('user', {
            ...userData,
            ...res,
          });
          dispatch(updateUserData(res));
          userDetailRefetch();
        }
      },
    });
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 w-full lg:w-1/2 gap-x-6">
        <div className="mb-5">
          <CustomInput
            label="عنوان شغلی"
            state={jobDescription}
            setState={setJobDescription}
            placeholder="مدرس جاوا"
          />
        </div>
        <div className="mb-5">
          <CustomInput
            type="textarea"
            label="درباره مدرس"
            state={job}
            setState={setJob}
            placeholder=" مدرس جاوا با بیش از 40 سال سابقه"
          />
        </div>
        <div className="mb-5">
          {/* <CustomInput
            type="textarea"
            label="درباره مدرس"
            state={job}
            setState={setJob}
            placeholder=" مدرس جاوا با بیش از 40 سال سابقه"
          /> */}
          <p className={`textSmm font-normal text-text3 mb-2 w-full `}>آپلود رزومه</p>
          <input type="file" name="file" onChange={handelPdfFile} accept="application/pdf" />
        </div>
        <div>
          <CustomButton variant="primary" disable={!job || !resume} onClick={editProfileDetail}>
            افزودن
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const DeleteAccountContent = () => {
  const [phoneNumber, phoneNumberSet] = useState('');
  const [code, codeSet] = useState('');

  const handleDeleteAccount = () => {
    toast('در حال پیاده سازی');
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 w-full lg:w-1/2 gap-x-6">
        <p className="textSmm text-text3 mb-6">برای حذف حساب کاربری ابتدا کد تایید دریافت کنید</p>
        <div className="mb-5">
          <CustomInput
            label="شماره موبایل"
            state={phoneNumber}
            setState={phoneNumberSet}
            placeholder="شماره خود را وارد کنید"
          />
        </div>
        <div className="mb-8">
          <CustomInput
            label="کد تایید"
            state={code}
            setState={codeSet}
            placeholder="کد تایید را وارد کنید"
          />
        </div>
        <CustomButton variant="primary" type="button" onClick={handleDeleteAccount}>
          دریافت کد
        </CustomButton>
      </div>
    </div>
  );
};

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
    <div className="grid  lg:flex rounded-2xl p-4 lg:p-2 bg-[#F2F1FB] lg:w-fit mb-10">
      {array?.map((item, index) => {
        return (
          <p
            onClick={() => onClick(item)}
            className={`px-2 lg:px-4 py-2 rounded-2xl cursor-pointer lg:text-[14px] transition-all ${
              activeItem === item?.title
                ? 'bg-[#A29BFE] hover:bg-[#a29bfebd] text-white'
                : 'hover:bg-[rgba(0,0,0,0.05)]'
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

const WriterInformation = ({
  mbtiList,
  aniagramList,
  writerInformation,
}: {
  mbtiList: any;
  aniagramList: any;
  writerInformation: any;
}) => {
  const [name, nameSet] = useState<any>(null);
  const [bio, bioSet] = useState<any>(null);
  const [intro, introSet] = useState<any>(null);
  const [resume, resumeSet] = useState<any>(null);
  const [personalTypes, personalTypesSet] = useState<any>(null);
  const [selectedImage, selectedImageSet] = useState<any>(null);

  const [image, setImage] = useState<File | null | string>(null);
  const [result, resultSet] = useState('');

  const imageChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      setImage(selectedImage);
    }
  };

  useEffect(() => {
    if (writerInformation) {
      nameSet(writerInformation?.name);
      bioSet(writerInformation?.bio);
      introSet(writerInformation?.introduction);
      resumeSet(writerInformation?.resume);
      if (writerInformation?.personalTypes) {
        personalTypesSet(JSON.parse(writerInformation?.personalTypes));
      }
      selectedImageSet(writerInformation?.image);
    }
  }, [writerInformation]);

  const handleEditPost = async () => {
    if (!name || !bio || !intro || !resume || !personalTypes?.[0]) {
      toast.error('لطفا همه موارد را پر کنید.');
      return;
    }

    const formData = new FormData();

    if (!selectedImage && !result) {
      toast.error('لطفا عکس مجله را انتخاب کنید.');
      return;
    }
    if (!selectedImage && result) {
      formData.append('file', result);
    }

    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('type', writerInformation?.type);
    formData.append('introduction', intro);
    formData.append('resume', resume);
    formData.append('userId', writerInformation?.userId);
    formData.append('personalTypes', JSON.stringify(personalTypes));
    formData.append('level', writerInformation?.level);

    apiCall({
      url: `/api/writers/${writerInformation?.id}`,
      method: 'put',
      data: formData,
      formDataIsNeeded: true,
      callback: (res, er) => {
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res) {
          toast.success('اطلاعات نویسنده با موفقیت آپدیت شد.');
        }
      },
    });
  };

  let personalTypesList = mbtiList?.[0] &&
    aniagramList?.[0] && [
      ...mbtiList?.map((item: any) => ({
        label: item?.name,
        value: item?.id,
      })),
      ...aniagramList?.map((item: any) => ({
        label: item?.name,
        value: item?.id,
      })),
    ];

  return (
    <div className="mt-6">
      <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
        <CustomInput
          parentClassName="mb-4 lg:mb-0"
          state={name}
          setState={nameSet}
          label="اسم نویسنده"
        />
        <div className="w-full">
          <p className={`textSmm font-normal text-text3 mb-2 w-full`}>تیپ های شخصیتی</p>
          <CustomSelect
            isMulti
            options={personalTypesList}
            placeholder="جستجو کنید..."
            value={personalTypes}
            onChange={personalTypesSet}
          />
        </div>
      </div>
      <div className="lg:flex flex-col lg:flex-row gap-6 mb-4">
        <CustomInput
          parentClassName="mb-4 lg:mb-0"
          state={resume}
          setState={resumeSet}
          type="textarea"
          label="رزومه نویسنده"
        />

        <CustomInput
          parentClassName="mb-4 lg:mb-0"
          state={bio}
          setState={bioSet}
          type="textarea"
          label="بیو کوتاه نویسنده"
        />
      </div>
      <div className="lg:flex flex-col lg:flex-row gap-6 mb-6">
        <CustomInput
          parentClassName="mb-4 lg:mb-0"
          state={intro}
          setState={introSet}
          label="معرفی نویسنده"
          type="textarea"
        />
      </div>
      {!result && (
        <ImageEditor
          className={`${image ? '!h-[550px] pb-8' : '!h-0 pb-0'}`}
          image={image}
          imageSet={setImage}
          resultSet={resultSet}
        />
      )}
      {!selectedImage && !image && (typeof result === 'string' || !result) ? (
        <div className="flex gap-6 mb-6 pb-6 border-b border-b-gray1">
          <div className="w-full">
            <p className="textSmm font-normal text-text3 mb-2 w-full">عکس نویسنده</p>
            <input onChange={imageChangeFunction} type="file" accept=".png, .jpg, .jpeg" />
          </div>
        </div>
      ) : (
        <></>
      )}

      {selectedImage && (
        <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-3">
          <i
            onClick={() => {
              resultSet('');
              setImage('');
              selectedImageSet(null);
            }}
            className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
          />
          <Image width={100} height={100} src={selectedImage} alt="" />
        </div>
      )}

      {typeof result !== 'string' && (
        <div className="relative w-fit h-fit ml-auto p-6 bg-gray-100 rounded-lg mb-3">
          <i
            onClick={() => {
              resultSet('');
              setImage('');
            }}
            className="absolute left-0 top-0 fa fa-regular fa-remove text-text3 text-[15px] px-3 cursor-pointer py-2"
          />
          <Image width={100} height={100} src={URL.createObjectURL(result)} alt="" />
        </div>
      )}

      <CustomButton
        variant="primary"
        type="button"
        onClick={handleEditPost}
        className="w-full lg:!w-fit px-4 mt-4 mr-auto"
      >
        ذخیره
      </CustomButton>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { userData } = useSelector(getUser);

  const [tabbarArray, tabbarArraySet] = useState([
    { title: 'عکس پروفایل' },
    { title: 'اطلاعات کاربری' },
    { title: 'تغییر رمز عبور' },
    { title: 'حذف حساب کاربری' },
  ]);

  useEffect(() => {
    if (userData?.writer) {
      let title: string;
      if (Number(userData?.writer?.type) === 1) {
        title = 'نویسنده';
      }
      if (Number(userData?.writer?.type) === 2) {
        title = 'مترجم';
      }
      if (Number(userData?.writer?.type) === 3) {
        title = 'مدرس';
      }
      tabbarArraySet((prev) => [...prev, { title: `اطلاعات ${title}` }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabChangeFunction = (clickedItem: { title: string; active: boolean }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = clickedItem?.title.trim();
    current.set('selected', value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  const { data: avatars } = useApiCall<any>({
    url: `/api/getAllAvatar`,
  });
  const { data: cities } = useApiCall<any>({
    url: `/api/getAllCities`,
  });
  const { data: provinces } = useApiCall<any>({
    url: `/api/getAllProvinces`,
  });

  const { data: userDetail, refetch: userDetailRefetch } = useApiCall<any>({
    url: `/api/users/${userData?.userId}`,
    shouldCallApi: !!userData?.userId,
  });
  const { data: mbtiList } = useApiCall<any>({
    url: '/api/mbti',
  });
  const { data: aniagramList } = useApiCall<any>({
    url: '/api/aniagram',
  });

  return (
    <div>
      <div className="bg-white lg:shadow-sidebar rounded-3xl p-2 lg:p-8 mb-6">
        <h4 className="textXl text-text1 mb-8">پروفایل کاربری</h4>
        <Tabbar
          onClick={tabChangeFunction}
          activeItem={searchParams.get('selected') ?? tabbarArray?.[0]?.title}
          array={tabbarArray}
        />

        {(searchParams.get('selected') == tabbarArray?.[0]?.title ||
          !searchParams.get('selected')) && (
          <ProfileImage userDetail={userDetail} avatars={avatars} />
        )}
        {searchParams.get('selected') == tabbarArray?.[1]?.title && (
          <ProfileContent
            userDetail={userDetail}
            mbtiList={mbtiList}
            cities={cities}
            provinces={provinces}
            aniagramList={aniagramList}
            userDetailRefetch={userDetailRefetch}
          />
        )}
        {searchParams.get('selected') == tabbarArray?.[2]?.title && <PasswordChangeContent />}
        {searchParams.get('selected') == tabbarArray?.[3]?.title && <DeleteAccountContent />}
        {searchParams.get('selected') == tabbarArray?.[4]?.title &&
          userData?.writer &&
          userData?.adminType == 1 && (
            <WriterInformation
              mbtiList={mbtiList}
              aniagramList={aniagramList}
              writerInformation={userDetail?.writer ?? {}}
            />
          )}
      </div>
    </div>
  );
};

export default Page;
