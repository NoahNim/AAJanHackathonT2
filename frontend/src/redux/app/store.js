import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import userReducer from '../features/auth/userSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
