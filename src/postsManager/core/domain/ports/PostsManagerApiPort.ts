import { Post } from "../entities/Post";

export interface ResponseGetPost {
  data?: Post[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

export interface IPostsManagerApiPort {
  getPosts: () => ResponseGetPost;
}
