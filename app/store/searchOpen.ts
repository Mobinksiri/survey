import { createSlice } from '@reduxjs/toolkit';
import { storeInterface } from '../_interface';

const initialState = {
  searchActive: false,
};

const searchRedux = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchActivate: (state, action) => {
      const data = action.payload;
      state.searchActive = data;
    },
  },
});

export const getSearchRedux = (state: storeInterface) => state.search;

export const { setSearchActivate } = searchRedux.actions;

export default searchRedux.reducer;
