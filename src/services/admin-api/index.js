import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const accountsApi = createApi({
  reducerPath: "adminApi",
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
    createCase: builder.mutation({
      query: (data) => ({
        url: "/case/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cases"],
    }),
    getCases: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return {
          url: `/admin/cases/all?${params}`,
          method: "GET",
        };
      },
      providesTags: ["Cases"],
    }),
    getCaseById: builder.query({
      query: (id) => ({
        url: `/admin/cases/detail/${id}`,
        method: "GET",
      }),
      providesTags: ["Cases"],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/admin/cases/delete/${id}`,
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
    updateCaseDetails: builder.mutation({
      query: ({ case_id, data }) => ({
        url: `/admin/update-details/${case_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cases"],
    }),

    uploadImage: builder.mutation({
      query: (body) => ({
        url: `/case/upload-damage-images/`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetCasesQuery,

  useDeleteCaseMutation,
  useGetCaseByIdQuery,
  useUpdateCaseMutation,
  useCreateCaseMutation,
  useUploadImageMutation,
  useUpdateCaseDetailsMutation,
  middleware: adminApiMiddleware,
  reducerPath: adminApiReducerPath,
  reducer: adminApiReducer,
} = accountsApi;
