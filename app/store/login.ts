import { createSlice } from "@reduxjs/toolkit";
import { loginReduxInterface, storeInterface } from "../_interface";

const initialState: loginReduxInterface = {
   isOpen: false,
};

const loginRedux = createSlice({
   name: "login",
   initialState,
   reducers: {
      toggleOpenLogin: (state) => {
         state.isOpen = !state.isOpen;
      },
      setIsOpenLogin: (state, action) => {
         state.isOpen = action?.payload;
      },
   },
});

export const getLoginIsOpen = (state: storeInterface) => state.login;

export const { toggleOpenLogin, setIsOpenLogin } = loginRedux.actions;

export default loginRedux.reducer;
