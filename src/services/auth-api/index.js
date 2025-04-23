import { base_Url } from "@/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_Url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/token`,
        method: "POST",
        body: data,
      }),
    }),

    getuser: builder.query({
      query: () => ({
        url: `/user/`,
        method: "GET",
      }),
    }),
    getuserById: builder.query({
      query: (id) => ({
        url: `/auth/getById/${id}`,
        method: "GET",
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `/user/forget-Password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `/user/reset-Password/${token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useGetuserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useLazyGetuserByIdQuery,
  useGetuserByIdQuery,
  middleware: authApiMiddleware,
  reducerPath: authApiReducerPath,
  reducer: authApiReducer,
} = authApi;
