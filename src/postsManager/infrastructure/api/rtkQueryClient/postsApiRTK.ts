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

export interface ResponseCommentsByPostId {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
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
    getCommentsByPostId: builder.query<ResponseCommentsByPostId[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),
    updatePost: builder.mutation<ApiResponsePost, Partial<ApiResponsePost>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    addPost: builder.mutation<ApiResponsePost, Partial<ApiResponsePost>>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useGetPostByUserIdQuery,
  useGetCommentsByPostIdQuery,
  useUpdatePostMutation,
  useAddPostMutation,
  useDeletePostMutation,
} = postApiRTK;
export default postApiRTK;
