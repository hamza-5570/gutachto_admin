import { configureStore } from "@reduxjs/toolkit";
import {
  authApiMiddleware,
  authApiReducer,
  authApiReducerPath,
} from "../services/auth-api";
import {
  adminApiReducerPath,
  adminApiMiddleware,
  adminApiReducer,
} from "../services/admin-api";
import {
  accountsApiMiddleware,
  accountsApiReducer,
  accountsApiReducerPath,
} from "@/services/admin-api/accountsApi";

const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [adminApiReducerPath]: adminApiReducer,
    [accountsApiReducerPath]: accountsApiReducer,
    ["authApi"]: authApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(adminApiMiddleware)
      .concat(accountsApiMiddleware),
});

export default store;
