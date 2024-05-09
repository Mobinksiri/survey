import { useSelector } from 'react-redux';
import apiCall from '../_apiCall/apiCall';
import toast from 'react-hot-toast';
import { getUser } from '../store/user';
import { NEED_LOGIN } from '../_toast_messages';

const useSaveFunction = (refetch: any) => {
  const { userData } = useSelector(getUser);

  const saveFunction = ({
    isSaved,
    markType,
    id,
  }: {
    isSaved: boolean;
    markType: number;
    id: number;
  }) => {
    if (userData) {
      if (!isSaved) {
        apiCall({
          url: '/api/save',
          method: 'post',
          data: {
            postId: id,
            markType,
          },
          callback: (res, er) => {
            if (res && res.message) {
              toast.success(res.message);
              refetch();
            }
          },
        });
      } else {
        apiCall({
          url: '/api/deleteSave',
          method: 'post',
          data: {
            postId: id,
            markType,
          },
          callback: (res, er) => {
            if (res && res.message) {
              toast(res.message);
              refetch();
            }
          },
        });
      }
    } else {
      toast.error(NEED_LOGIN);
    }
  };

  return saveFunction;
};

export default useSaveFunction;
