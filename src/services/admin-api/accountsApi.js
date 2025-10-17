import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: fetchBaseQuery({
    // eslint-disable-next-line no-undef
    baseUrl: import.meta.env.VITE_SOME_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Accounts", "Cases"],
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return {
          url: `/admin/accounts/all?${params}`,
          method: "GET",
        };
      },
      providesTags: ["Accounts"],
    }),
    getAccount: builder.query({
      query: (id) => ({
        url: `/admin/accounts/detail/{account_id}?user_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Accounts"],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/admin/accounts/delete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Accounts"],
    }),
    unblockUser: builder.mutation({
      query: (body) => ({
        url: `/admin/accounts/unblock/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Accounts"],
    }),
    blockUser: builder.mutation({
      query: (body) => ({
        url: `/admin/accounts/block/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useDeleteAccountMutation,
  useLazyGetAccountQuery,
  useGetAccountQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  middleware: accountsApiMiddleware,
  reducerPath: accountsApiReducerPath,
  reducer: accountsApiReducer,
} = accountsApi;
