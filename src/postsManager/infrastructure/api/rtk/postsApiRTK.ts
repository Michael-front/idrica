import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponsePost } from "../clients/PostsManagerApiClient";

const postApiRTK = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponsePost[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = postApiRTK;
export default postApiRTK;
