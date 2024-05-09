import React, { useState } from 'react';
import Modal from './Modal';
import CustomButton from '../custom/CustomButton';
import apiCall from '@/app/_apiCall/apiCall';
import toast from 'react-hot-toast';
import { DEFAULT_ERROR, NEED_LOGIN } from '@/app/_toast_messages';
import CustomInput from '../custom/CustomInput';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/store/user';

const ReportModal = ({
  postId,
  markType,
  typology,
}: {
  postId: number;
  markType: number;
  typology?: boolean;
}) => {
  const reportCheckbox = [
    'تکراری',
    'دسته بندی اشتباه',
    'تحلیل غلط',
    'غلط املایی',
    'اسپویل',
    'هرزنامه',
    'غیراخلاقی',
    'سایر',
  ];

  const [report, reportSet] = useState(false);
  const [reportActive, reportActiveSet] = useState<any>(reportCheckbox?.[0]);
  const [reportText, reportTextSet] = useState(null);

  const clearReport = () => {
    reportSet(false);
    reportActiveSet(reportCheckbox?.[0]);
  };

  const { userData } = useSelector(getUser);

  const submitReport = () => {
    if (userData) {
      if (reportActive == 'سایر' && !reportText) {
        toast?.error('لطفا متن گزارش خود را وارد کنید.');
        return;
      }

      let errorCode;
      if (reportActive == 'سایر') {
        errorCode = reportText;
      } else {
        errorCode = reportActive;
      }

      return apiCall({
        url: '/api/report',
        method: 'post',
        data: {
          postId,
          markType,
          errorCode,
        },
        callback: (res, er) => {
          if (res && res?.message) {
            toast?.success('گزارش با موفقیت ثبت شد.');
            clearReport();
          }
          if (er) {
            toast?.error(DEFAULT_ERROR);
          }
        },
      });
    } else {
      toast?.error(NEED_LOGIN);
    }
  };

  return (
    <div>
      {/* report modal */}
      <Modal enableScrollProp isOpen={report} onClick={clearReport}>
        <div className="p-6 bg-white w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[460px] rounded-2xl">
          <h4 className="textMd text-text1 mb-6 pb-6 border-b border-b-gray2">گزارش</h4>

          <div>
            {reportCheckbox?.map((item, index) => {
              return (
                <div
                  onClick={() => reportActiveSet(item)}
                  key={index}
                  className="flex items-center mb-4 last:mb-0 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full ml-2 ${
                      reportActive === item
                        ? 'border-[6px] border-[#A964AD]'
                        : 'border-[2px] border-[#D6D6D6]'
                    }`}
                    key={index}
                  />
                  <p className="textSm text-text3">{item}</p>
                </div>
              );
            })}
            {reportActive == 'سایر' && (
              <CustomInput
                inputClassName="bg-transparent"
                parentClassName="mt-4"
                label="گزارش شما"
                state={reportText}
                setState={reportTextSet}
                type="textarea"
                placeholder={`گزارش خود را وارد کنید`}
              />
            )}
          </div>

          <div className="flex w-fit mr-auto mt-6">
            <CustomButton
              className="!w-fit px-4 ml-2"
              variant="outline"
              type="button"
              onClick={clearReport}
            >
              انصراف
            </CustomButton>
            <CustomButton
              className="!w-fit px-4"
              variant="primary"
              type="button"
              primaryButtonHoverStyle={typology ? '!bg-[#945097]' : ''}
              primaryButtonStyle={typology ? '!bg-purple' : ''}
              onClick={submitReport}
            >
              ثبت
            </CustomButton>
          </div>
        </div>
      </Modal>
      <p
        onClick={() => reportSet(true)}
        className={`textSmm text-white font-bold cursor-pointer px-3 py-2 rounded-md ${
          typology ? 'bg-purple' : ''
        }`}
      >
        <i className="fa-regular fa-message-xmark ml-2" />
        گزارش
      </p>
    </div>
  );
};

export default ReportModal;
