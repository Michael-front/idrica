import { Post } from "../entities/Post";

export interface ResponseGetPostAdapter {
  posts: Post[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
}

export interface IPostsManagerApiPort {
  useGetPosts(): ResponseGetPostAdapter;
}
