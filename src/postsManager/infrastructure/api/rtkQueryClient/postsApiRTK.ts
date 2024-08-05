import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponsePost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponseUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const postApiRTK = createApi({
  reducerPath: "postApiRTK",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponsePost[], void>({
      query: () => "posts",
    }),
    getUsers: builder.query<ApiResponseUser[], void>({
      query: () => "users",
    }),
    getPostByUserId: builder.query<ApiResponsePost[], number>({
      query: (userId) => `posts?userId=${userId}`, // === `/users/${userid}/posts`
    }),
  }),
});

export const { useGetPostsQuery, useGetUsersQuery, useGetPostByUserIdQuery } = postApiRTK;
export default postApiRTK;
