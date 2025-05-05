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
        url: `/admin/account/view/${id}`,
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
    getCases: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return {
          url: `/admin/cases/all?${params}`,
          method: "GET",
        }
      },
      providesTags: ["Cases"],
    }),
    getCaseById: builder.query({
      query: (id) => ({
        url: `/admin/cases/view/${id}`,
        method: "GET",
      }),
      providesTags: ["Cases"],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cases"],
    }),
    updateCase: builder.mutation({
      query: ({ case_id, new_status }) => ({
        url: `/admin/update-status/${case_id}/${new_status}`,
        method: "PUT",
      }),
      invalidatesTags: ["Cases"],
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
  useGetCasesQuery,
  useUnblockUserMutation,
  useBlockUserMutation,
  useDeleteCaseMutation,
  useGetCaseByIdQuery,
  useUpdateCaseMutation,
  useDeleteAccountMutation,
  useLazyGetAccountQuery,
  useGetAccountQuery,
  middleware: adminApiMiddleware,
  reducerPath: adminApiReducerPath,
  reducer: adminApiReducer,
} = accountsApi;
