import { createSlice } from "@reduxjs/toolkit";
import { loadingReduxProps, storeInterface } from "../_interface";

const initialState: loadingReduxProps = {
   apiLoading: false,
   pageLoading: false,
};

const loadingRedux = createSlice({
   name: "loading",
   initialState,
   reducers: {
      setApiLoading: (state, action) => {
         state.apiLoading = action.payload;
      },
      setPageLoading: (state, action) => {
         state.pageLoading = action.payload;
      },
   },
});

export const getLoading = (state: storeInterface) => state.loading;

export const { setApiLoading, setPageLoading } = loadingRedux.actions;

export default loadingRedux.reducer;
