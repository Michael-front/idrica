import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponsePost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const postApiRTK = createApi({
  reducerPath: "postApiRTK",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponsePost[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = postApiRTK;
export default postApiRTK;
