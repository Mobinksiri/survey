import { filterInterface, storeInterface } from '@/app/_interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: filterInterface = {
  activeFilterBoxId: [],
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveFilterBoxId: (state, action) => {
      const data = action.payload;
      state.activeFilterBoxId = data;
    },
    addActiveFilterBoxId: (state, action) => {
      const data = action.payload;
      state.activeFilterBoxId = [...state.activeFilterBoxId, data];
    },
    removeActiveFilterBoxId: (state, action) => {
      const data = action.payload;
      state.activeFilterBoxId = state.activeFilterBoxId?.filter((item) => item !== data);
    },
  },
});

export const getFilter = (state: storeInterface) => state.filter;

export const { setActiveFilterBoxId, addActiveFilterBoxId, removeActiveFilterBoxId } =
  filter.actions;

export default filter.reducer;
