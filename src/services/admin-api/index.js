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
    getCaseById: builder.query({
      query: (id) => ({
        url: `/case/view/${id}`,
        method: "GET",
      }),
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/cases/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateCase: builder.mutation({
      query: ({case_id,new_status}) => ({
        url: `/case/update-status/${case_id}/${new_status}`,
        method: "PUT",
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
  useDeleteCaseMutation,
  useGetCaseByIdQuery,
  useUpdateCaseMutation,
  middleware: adminApiMiddleware,
  reducerPath: adminApiReducerPath,
  reducer: adminApiReducer,
} = accountsApi;
