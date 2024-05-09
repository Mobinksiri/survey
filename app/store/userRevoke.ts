import { createSlice } from '@reduxjs/toolkit';
import { userRevokeProps, storeInterface } from '../_interface';

const initialState: userRevokeProps = {
  isOpen: false,
};

const userRevoke = createSlice({
  name: 'userRevoke',
  initialState,
  reducers: {
    toggleOpenUserRevoke: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsOpenUserRevoke: (state, action) => {
      state.isOpen = action?.payload;
    },
  },
});

export const getUserRevokeIsOpen = (state: storeInterface) => state.userRevoke;

export const { toggleOpenUserRevoke, setIsOpenUserRevoke } = userRevoke.actions;

export default userRevoke.reducer;
