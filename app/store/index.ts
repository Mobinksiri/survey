import { configureStore } from '@reduxjs/toolkit';
import navigation from './navigation';
import filter from './typology/filter';
import login from './login';
import loading from './loading';
import user from './user';
import userRevoke from './userRevoke';
import searchOpen from './searchOpen';
import test from './test';

export const store = configureStore({
  reducer: {
    navigation,
    filter: filter,
    login: login,
    loading: loading,
    user: user,
    userRevoke: userRevoke,
    search: searchOpen,
    test: test,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
