import { createSlice } from "@reduxjs/toolkit";
import { userReduxProps, storeInterface } from "../_interface";
import { getFromLocalStorage } from "../_utils/localStorage";

const initialState: userReduxProps = {
   userData: getFromLocalStorage("user") as {
      name: string;
      familyname: string;
      username: string;
      naturalcode: string;
      birthDate: null;
      gender: number;
      job: number;
      state: number;
      city: number;
      mbti: number;
      aniagram: number;
      bio: string;
      email: string;
      password: string;
      image: null;
      url: null;
      isAdmin: false;
      adminType: null;
      createdAt: string;
      updatedAt: string;
      userId: number;
      accessToken: string;
      msg: string;
      avatar: number;
   },
   userDetail: null,
};

const userRedux = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload;
      },
      updateUserData: (state, action) => {
         state.userData = {
            ...state.userData,
            ...action.payload,
         };
      },
   },
});

export const getUser = (state: storeInterface) => state.user;

export const { setUserData, updateUserData } = userRedux.actions;

export default userRedux.reducer;
