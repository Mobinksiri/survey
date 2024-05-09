'use client';
import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import { useEffectSkipFirstRender } from '@/app/_hooks/useEffectSkipFirstRender';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Page = () => {
  const [headline, setHeadline] = useState('');
  const [headList, setHeadList] = useState<{ id: number; title: string }[]>([]);
  const { data } = useApiCall<any>({ url: '/api/products/list', params: { type: 'course' } });
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [item, setItem] = useState<{ id: number; title: string }>();
  const [video, setVideo] = useState<File | null>();
  // const { headList } = useApiCall<any>({ url: '/api/HeadLine/list/:id'});

  const [options, setOptions] = useState<{ label: string; value: number }>();

  const getHeadLine = () => {
    return apiCall({
      url: `/api/HeadLine/list/${options?.value}`,
      callback(res, er) {
        if (res) {
          setHeadList(res);
        } else {
        }
      },
    });
  };
  useEffectSkipFirstRender(() => {
    getHeadLine();
  }, [options]);

  //function
  const handelAddHeadline = () => {
    return apiCall({
      url: '/api/createHeadLine',
      params: {},
      method: 'post',
      data: {
        productId: options?.value,
        title: headline,
      },
      callback(res, er) {
        if (res) {
          setHeadline(''),
            //  setOptions({ label: '', value: -1 });
            getHeadLine();
        } else {
        }
      },
    });
  };
  const videoChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setVideo(selectedImage);
    }
  };
  const hadelOpenModal = (item: { id: number; title: string }) => {
    setModalOpen(true);
    setItem(item);
  };
  const formData = new FormData();
  formData.append('title', title);
  formData.append('duration', duration);
  if (item) {
    formData.append('coursesheadlineId', item?.id.toString());
  }
  //@ts-ignore
  formData.append('file', video);
  const createSession = () => {
    return apiCall({
      url: '/api/createSession',
      data: formData,
      method: 'post',
      formDataIsNeeded: true,
      callback(res, er) {
        if (res) {
          toast.success('درخواست با موفقیت انجام شد');
          setModalOpen(false);
          setVideo(null);
          setTitle('');
          setDuration('');
        } else {
          toast.error('درخواست با خطا مواجه شد');
        }
      },
    });
  };

  return (
    <>
      <StepBar array={[{ title: 'فروشگاه' }, { title: 'سرفصل دوره ها' }]} />
      <Modal isOpen={modalOpen} onClick={() => {}}>
        <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
          <div className="w-full flex items-end justify-end">
            <i
              onClick={() => {
                setModalOpen(false);
                setDuration('');
                setVideo(null);
                setTitle('');
              }}
              className="cursor-pointer fa-solid fa-xmark  flex w-fit  mb-4"
            />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div>
              <CustomInput setState={setTitle} state={title} type="text" label="عنوان" />
            </div>
            <div>
              <CustomInput
                setState={setDuration}
                state={duration}
                type="number"
                label="زمان ویدیو به دقیقه"
              />
            </div>
            {/* <i className="fa-light fa-file-video text-[20px]" /> */}
            {/* <CustomInput type="file" setState={setVideo} state={video} label="انتخاب ویدئو" />
             */}
            {/* <div className=" flex flex-col items-center">
              <p className={`textSmm font-normal text-text3 w-full mb-2 `}>انتخاب ویدیو</p>
              <div className="border rounded-2xl px-4 py-2 cursor-pointer">
                <input
                  className="  w-full h-full "
                  type="file"
                  accept="video/*"
                  name="file"
                  onChange={videoChangeFunction}
                />
              </div>
            </div> */}
            <div className={`w-fit h-fit   `}>
              <p className={`textSmm font-normal text-text3 mb-2 w-full `}>انتخاب ویدیو</p>
              <div className="relative flex items-center z-[1] bg-gray-200 rounded-lg px-3 py-2 ">
                <i className="fa fa-regular fa-file-import text-text1 ml-1" />
                <p className="textSmm font-normal text-text1">انتخاب فایل</p>
                {modalOpen && (
                  <input
                    accept="video/*"
                    className={`textSmm z-[10] cursor-pointer text-text3 absolute top-0 left-0 opacity-0 bottom-0 right-0 rounded-2xl border border-[#D6D6D6] outline-none w-full h-full `}
                    onChange={videoChangeFunction}
                    type="file"
                    name="file"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-center items-end">
              {video?.name ? <p>{`فایل ${video?.name} آپلود شد`}</p> : <p>فایلی انتخاب نشده</p>}
            </div>
            <div className="col-span-full">
              <CustomButton variant="primary" onClick={createSession}>
                افزودن
              </CustomButton>
            </div>
          </div>
        </div>
      </Modal>
      <div className="border lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6">
        <div className=" grid grid-cols-2 gap-4 mb-10  items-end">
          <div>
            <p className={`textSmm font-normal text-text3 mb-2 w-full `}>انتخاب دوره</p>
            <CustomSelect
              value={options}
              onChange={(e: { label: string; value: number }) => {
                setOptions(e);
              }}
              placeholder={'انتخاب کنید'}
              options={data?.map((e: any) => {
                return {
                  label: e?.name,
                  value: e?.id,
                };
              })}
            />
          </div>
          <div>
            <CustomInput setState={setHeadline} state={headline} label="عنوان سرفصل" />
          </div>
        </div>
        <div>
          <CustomButton
            onClick={handelAddHeadline}
            disable={!headline || !options}
            variant="primary"
          >
            افزودن
          </CustomButton>
        </div>
      </div>
      <p className="mb-4 text-[18px] font-bold">انتخاب سرفصل </p>
      <div className="grid gap-4 grid-cols-3">
        {headList && headList.length > 0 ? (
          headList.map((eleman, index) => (
            <div
              onClick={() => hadelOpenModal(eleman)}
              key={eleman?.id}
              className="border cursor-pointer flex items-center lg:border-none border-gray-200 p-4 lg:bg-white lg:shadow-sidebar rounded-lg lg:rounded-3xl mb-5 lg:p-6"
            >
              <span className="items-center justify-center flex w-full">{` ${index + 1} . ${
                eleman?.title
              } `}</span>
            </div>
          ))
        ) : (
          <span className="col-span-full">
            هنوز دوره ای انتخاب نشده یا در این دوره سرفصلی وجود ندارد
          </span>
        )}
      </div>
    </>
  );
};

export default Page;

// const CustomModal = () => {};
