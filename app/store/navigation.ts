import { createSlice } from '@reduxjs/toolkit';
import { navigationReduxInterface, storeInterface } from '../_interface';

const initialState: navigationReduxInterface = {
  dropdownActiveId: '',
  joinedTopicsToggle: true,
};

const navigationRedux = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setDropdownActiveId: (state, action) => {
      const data = action.payload;
      state.dropdownActiveId = data;
    },
    toggleJoinedTopicsToggle: (state) => {
      state.joinedTopicsToggle = !state.joinedTopicsToggle;
    },
  },
});

export const getNavigationRedux = (state: storeInterface) => state.navigation;
export const getJoinedTopicToggle = (state: storeInterface) => state.navigation.joinedTopicsToggle;

export const { setDropdownActiveId, toggleJoinedTopicsToggle } = navigationRedux.actions;

export default navigationRedux.reducer;
