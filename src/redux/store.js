import { configureStore } from "@reduxjs/toolkit";
import { authApiMiddleware, authApiReducer, authApiReducerPath } from "../services/auth-api";
import { alertsApiMiddleware,alertsApiReducer,alertsApiReducerPath} from "../services/alerts-api";
import {adminApiReducerPath,adminApiMiddleware,adminApiReducer} from "../services/admin-api";


const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [alertsApiReducerPath]:alertsApiReducer,
    [adminApiReducerPath]:adminApiReducer,
    ["authApi"]: authApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(alertsApiMiddleware)
      .concat(adminApiMiddleware),
});

export default store;
