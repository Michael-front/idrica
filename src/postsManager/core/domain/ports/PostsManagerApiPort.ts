import { Post } from "../entities/Post";
import { User } from "../entities/User";

export interface ResponseGetPostAdapter {
  posts: Post[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
}

export type ResponseGetUserAdapter = Omit<ResponseGetPostAdapter, "posts"> & {
  users: User[];
};

export interface IPostsManagerApiPort {
  useGetPosts(): ResponseGetPostAdapter;
  useGetUsers(): ResponseGetUserAdapter;
  useGetPostsByUserId(id: number): ResponseGetPostAdapter;
  // useUpdatePostById(id: number): Promise<Partial<ResponseGetPostAdapter>>;
  useUpdatePostById(id: number, title?: string, body?: string): Promise<void>;
  useDeletePostById(id: number): Promise<void>;
}
