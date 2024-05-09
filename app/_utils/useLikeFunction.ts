import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import apiCall from '../_apiCall/apiCall';
import { NEED_LOGIN } from '../_toast_messages';
import { getUser } from '../store/user';

const useLikeFunction = (refetch: any) => {
  const { userData } = useSelector(getUser);

  const likeFunction = ({
    isLiked,
    markType,
    id,
    disLike = false,
  }: {
    isLiked: boolean;
    markType: number;
    id: number;
    disLike?: boolean;
  }) => {
    if (userData) {
      if (!isLiked) {
        apiCall({
          url: '/api/like',
          method: 'post',
          data: {
            postId: id,
            markType,
            likedislike: disLike ? 2 : 1,
          },
          callback: (res, er) => {
            if (res && res.message) {
              toast.success(res.message ?? '');
              refetch();
            }
          },
        });
      } else {
        apiCall({
          url: '/api/deleteLike',
          method: 'post',
          data: {
            postId: id,
            markType,
            likedislike: disLike ? 2 : 1,
          },
          callback: (res, er) => {
            if (res && res.message) {
              toast(res.message ?? '');
              refetch();
            }
          },
        });
      }
    } else {
      toast.error(NEED_LOGIN);
    }
  };

  return likeFunction;
};

export default useLikeFunction;
