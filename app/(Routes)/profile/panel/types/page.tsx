/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import apiCall, { useApiCall } from '@/app/_apiCall/apiCall';
import CustomButton from '@/app/_components/common/custom/CustomButton';
import CustomInput from '@/app/_components/common/custom/CustomInput';
import CustomSelect from '@/app/_components/common/custom/CustomSelect';
import Modal from '@/app/_components/common/modal/Modal';
import StepBar from '@/app/_components/common/panel/StepBar';
import { generateID } from '@/app/_utils/idGenerator';

import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/app/_components/editors/RichTextEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const JournalAddArthurSlide = () => {
  const [mbtiList, mbtiListSet] = useState<any>([]);
  const [selectedMbti, selectedMbtiSet] = useState<any>(null);
  const [mbtiContent, mbtiContentSet] = useState<any>(null);

  const { data: mbti, refetch: mbtiRefetch } = useApiCall<any>({
    url: '/api/mbti',
  });

  useEffect(() => {
    if (mbti) {
      mbtiListSet(mbti);
    }
  }, [mbti]);

  useEffect(() => {
    if (selectedMbti && mbtiList?.length) {
      const foundContent = mbtiList?.find((item: any) => item?.id == selectedMbti?.value)?.content;
      mbtiContentSet(foundContent);
    }
  }, [mbtiList, selectedMbti]);

  const handleMbtiEditPost = async () => {
    if (selectedMbti?.value) {
      apiCall({
        url: `/api/updateMbtiType/${selectedMbti?.value}`,
        method: 'put',
        data: {
          name: selectedMbti?.label,
          content: mbtiContent,
        },
        callback: (res, er) => {
          if (res) {
            toast?.success(res);
            mbtiRefetch();
          }
        },
      });
    } else {
      toast?.error('تایپ مورد نظر پیدا نشد.');
    }
  };

  // aniagram --------------------------------------------------------
  const [aniagramList, aniagramListSet] = useState<any>([]);
  const [selectedAniagram, selectedAniagramSet] = useState<any>(null);
  const [aniagramContent, aniagramContentSet] = useState<any>(null);

  const { data: aniagram, refetch: aniagramRefetch } = useApiCall<any>({
    url: '/api/aniagram',
  });

  useEffect(() => {
    if (aniagram) {
      aniagramListSet(aniagram);
    }
  }, [aniagram]);

  useEffect(() => {
    if (selectedAniagram && aniagramList?.length) {
      const foundContent = aniagramList?.find(
        (item: any) => item?.id == selectedAniagram?.value,
      )?.content;
      aniagramContentSet(foundContent);
    }
  }, [aniagramList, selectedAniagram]);

  const handleAniagramEditPost = async () => {
    if (selectedAniagram?.value) {
      apiCall({
        url: `/api/updateAniagramType/${selectedAniagram?.value}`,
        method: 'put',
        data: {
          name: selectedAniagram?.label,
          content: aniagramContent,
        },
        callback: (res, er) => {
          if (res) {
            toast?.success(res);
            aniagramRefetch();
          }
        },
      });
    } else {
      toast?.error('تایپ مورد نظر پیدا نشد.');
    }
  };

  // aniagramInstinct --------------------------------------------------------
  const [aniagramInstinctList, aniagramInstinctListSet] = useState<any>([]);
  const [selectedAniagramInstinct, selectedAniagramInstinctSet] = useState<any>(null);
  const [aniagramInstinctContent, aniagramInstinctContentSet] = useState<any>(null);

  const { data: aniagramInstinct, refetch: aniagramInstinctRefetch } = useApiCall<any>({
    url: '/api/aniagramInstinct',
  });

  useEffect(() => {
    if (aniagramInstinct) {
      aniagramInstinctListSet(aniagramInstinct);
    }
  }, [aniagramInstinct]);

  useEffect(() => {
    if (selectedAniagramInstinct && aniagramInstinctList?.length) {
      const foundContent = aniagramInstinctList?.find(
        (item: any) => item?.id == selectedAniagramInstinct?.value,
      )?.content;
      aniagramInstinctContentSet(foundContent);
    }
  }, [aniagramInstinctList, selectedAniagramInstinct]);

  const handleAniagramInstinctListEditPost = async () => {
    if (selectedAniagramInstinct?.value) {
      apiCall({
        url: `/api/updateAniagramInstinctType/${selectedAniagramInstinct?.value}`,
        method: 'put',
        data: {
          name: selectedAniagramInstinct?.label,
          content: aniagramInstinctContent,
        },
        callback: (res, er) => {
          if (res) {
            toast?.success(res);
            aniagramInstinctRefetch();
          }
        },
      });
    } else {
      toast?.error('تایپ مورد نظر پیدا نشد.');
    }
  };

  // aniagramInstinct --------------------------------------------------------
  const [tempermentList, tempermentListSet] = useState<any>([]);
  const [selectedTemperment, selectedTempermentSet] = useState<any>(null);
  const [tempermentContent, tempermentContentSet] = useState<any>(null);

  const { data: temperment, refetch: tempermentRefetch } = useApiCall<any>({
    url: '/api/temperment',
  });

  useEffect(() => {
    if (temperment) {
      tempermentListSet(temperment);
    }
  }, [temperment]);

  useEffect(() => {
    if (selectedTemperment && tempermentList?.length) {
      const foundContent = tempermentList?.find(
        (item: any) => item?.id == selectedTemperment?.value,
      )?.content;
      tempermentContentSet(foundContent);
    }
  }, [tempermentList, selectedTemperment]);

  const handleTempermentContentSetEditPost = async () => {
    if (selectedTemperment?.value) {
      apiCall({
        url: `/api/updateTempermentType/${selectedTemperment?.value}`,
        method: 'put',
        data: {
          name: selectedTemperment?.label,
          content: tempermentContent,
        },
        callback: (res, er) => {
          if (res) {
            toast?.success(res);
            tempermentRefetch();
          }
        },
      });
    } else {
      toast?.error('تایپ مورد نظر پیدا نشد.');
    }
  };

  return (
    <div className="my-6">
      <StepBar array={[{ title: 'پنل تایپ' }, { title: 'mbti' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6 mb-6">
        <div className="w-full mb-4">
          <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
            برای ویرایش، تایپ مورد نظر را انتخاب نمایید.
          </p>
          <CustomSelect
            options={
              mbtiList?.length &&
              mbtiList?.map((m: any) => ({
                value: m.id,
                label: m.name,
              }))
            }
            placeholder="جستجو کنید..."
            value={selectedMbti}
            onChange={selectedMbtiSet}
          />
        </div>

        {selectedMbti ? (
          <div>
            <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
              توضیحات تایپ {selectedMbti?.label}.
            </p>
            <RichTextEditor setState={mbtiContentSet} defaultValue={mbtiContent} />
          </div>
        ) : null}

        <CustomButton
          variant="primary"
          type="button"
          onClick={handleMbtiEditPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>

      <StepBar array={[{ title: 'پنل تایپ' }, { title: 'انیاگرام' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6 mb-6">
        <div className="w-full mb-4">
          <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
            برای ویرایش، تایپ مورد نظر را انتخاب نمایید.
          </p>
          <CustomSelect
            options={
              aniagramList?.length &&
              aniagramList?.map((m: any) => ({
                value: m.id,
                label: m.name,
              }))
            }
            placeholder="جستجو کنید..."
            value={selectedAniagram}
            onChange={selectedAniagramSet}
          />
        </div>

        {selectedAniagram ? (
          <div>
            <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
              توضیحات تایپ {selectedAniagram?.label}.
            </p>
            <RichTextEditor setState={aniagramContentSet} defaultValue={aniagramContent} />
          </div>
        ) : null}

        <CustomButton
          variant="primary"
          type="button"
          onClick={handleAniagramEditPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>

      <StepBar array={[{ title: 'پنل تایپ' }, { title: 'غرایز انیاگرام' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6 mb-6">
        <div className="w-full mb-4">
          <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
            برای ویرایش، تایپ مورد نظر را انتخاب نمایید.
          </p>
          <CustomSelect
            options={
              aniagramInstinctList?.length &&
              aniagramInstinctList?.map((m: any) => ({
                value: m.id,
                label: m.name,
              }))
            }
            placeholder="جستجو کنید..."
            value={selectedAniagramInstinct}
            onChange={selectedAniagramInstinctSet}
          />
        </div>

        {selectedAniagramInstinct ? (
          <div>
            <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
              توضیحات تایپ {selectedAniagramInstinct?.label}.
            </p>
            <RichTextEditor
              setState={aniagramInstinctContentSet}
              defaultValue={aniagramInstinctContent}
            />
          </div>
        ) : null}

        <CustomButton
          variant="primary"
          type="button"
          onClick={handleAniagramInstinctListEditPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>

      <StepBar array={[{ title: 'پنل تایپ' }, { title: 'مزاج' }]} />
      <div className="lg:bg-white lg:shadow-sidebar lg:rounded-3xl lg:p-6 mb-6">
        <div className="w-full mb-4">
          <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
            برای ویرایش، تایپ مورد نظر را انتخاب نمایید.
          </p>
          <CustomSelect
            options={
              tempermentList?.length &&
              tempermentList?.map((m: any) => ({
                value: m.id,
                label: m.name,
              }))
            }
            placeholder="جستجو کنید..."
            value={selectedTemperment}
            onChange={selectedTempermentSet}
          />
        </div>

        {selectedTemperment ? (
          <div>
            <p className={`textSmm font-normal text-text3 mb-4 w-full`}>
              توضیحات تایپ {selectedTemperment?.label}.
            </p>
            <RichTextEditor setState={tempermentContentSet} defaultValue={tempermentContent} />
          </div>
        ) : null}

        <CustomButton
          variant="primary"
          type="button"
          onClick={handleTempermentContentSetEditPost}
          className="w-full lg:!w-fit px-4 mt-4 mr-auto"
        >
          ذخیره
        </CustomButton>
      </div>
    </div>
  );
};

export default JournalAddArthurSlide;
