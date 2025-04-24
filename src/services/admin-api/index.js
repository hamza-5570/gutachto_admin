import { base_Url } from "@/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const accountsApi = createApi({
  reducerPath: "adminApi",
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
 

    getAccounts: builder.query({
      query: () => ({
        url: `/admin/accounts/all/`,
        method: "GET",
      }),
    }),
    getCases: builder.query({
      query: () => ({
        url: `/admin/cases/all/`,
        method: "GET",
      }),
    }),
    unblockUser: builder.mutation({
      query: (body) => ({
        url: `/admin/accounts/unblock/`,
        method: "PUT",
        body:body
      }),
    }),
    blockUser: builder.mutation({
      query: (body) => ({
        url: `/admin/accounts/block/`,
        method: "PUT",
        body:body
      }),
    })
 
  }),
});

export const {
  useGetAccountsQuery,
  useGetCasesQuery,
  useUnblockUserMutation,
  useBlockUserMutation,
  middleware: adminApiMiddleware,
  reducerPath: adminApiReducerPath,
  reducer: adminApiReducer,
} = accountsApi;
