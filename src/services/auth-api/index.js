import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithTokenCheck } from "../admin-api/authBaseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithTokenCheck(),
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data) => ({
        url: `/auth/register/`,
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
    GetUserProfile: builder.query({
      query: () => ({ url: `/auth/profile` }),
      transformResponse: (response) => response,
    }),
    UpdateUser: builder.mutation({
      query: (body) => ({
        url: `/auth/update-profile/`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response) => response,
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/request-password-reset/`,
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/update-password/`,
        method: "PUT",
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
    deleteAccount: builder.mutation({
      query: (body) => ({
        url: `/auth/delete-account/`,
        method: "DELETE",
        body: body,
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
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  middleware: authApiMiddleware,
  reducerPath: authApiReducerPath,
  reducer: authApiReducer,
} = authApi;
