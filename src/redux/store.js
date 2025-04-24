import { configureStore } from "@reduxjs/toolkit";
import { authApiMiddleware, authApiReducer, authApiReducerPath } from "../services/auth-api";
import {adminApiReducerPath,adminApiMiddleware,adminApiReducer} from "../services/admin-api";


const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [adminApiReducerPath]:adminApiReducer,
    ["authApi"]: authApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(adminApiMiddleware),
});

export default store;
