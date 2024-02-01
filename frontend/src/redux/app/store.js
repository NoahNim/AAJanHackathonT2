import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import userReducer from "../features/auth/userSlice";
import blogReducer from "../features/blogs/blogSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: userReducer,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
