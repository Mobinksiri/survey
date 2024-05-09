import React from 'react';
import Modal from '../common/modal/Modal';
import CustomButton from '../common/custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRevokeIsOpen, setIsOpenUserRevoke } from '@/app/store/userRevoke';
import { useRouter } from 'next/navigation';
import { setUserData } from '@/app/store/user';
import { removeFromLocalStorage } from '@/app/_utils/localStorage';
import toast from 'react-hot-toast';

const UserRevokeModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isOpen } = useSelector(getUserRevokeIsOpen);

  const closeModal = () => {
    dispatch(setIsOpenUserRevoke(false));
  };

  const revokeUserFunction = () => {
    router.push('/');
    dispatch(setUserData(null));
    removeFromLocalStorage('user');
    dispatch(setIsOpenUserRevoke(false));
    toast.success('با موفقیت خارج شدید.');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClick={closeModal}>
        <div
          id="revoke-user-box"
          className="p-6 bg-white rounded-lg w-[calc(100vw-32px)] md:sm:w-[calc(100vw-50px)] lg:w-[450px]"
        >
          <div className="flex items-center mb-6 pb-6 border-b border-b-gray1">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red ml-4 text-white">
              !
            </div>
            <p>خروج</p>
          </div>
          <p className="mb-8 textSm text-text3 font-bold">
            آیا از خروج حساب کاربری خود مطمعن هستید؟
          </p>
          <div className="flex items-center justify-end">
            <CustomButton onClick={closeModal} variant="outline" className="!w-fit px-4 ml-4">
              انصراف
            </CustomButton>
            <CustomButton
              onClick={revokeUserFunction}
              variant="primary"
              className="!w-fit px-4 bg-red"
            >
              خروج
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserRevokeModal;
