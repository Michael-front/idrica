import { ApiResponsePost } from "src/postsManager/infrastructure/api/rtkQueryClient/postsApiRTK";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Comment } from "../entities/Comments";

export interface ResponseGetPostAdapter {
  posts: Post[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
}

export type ResponseGetUserAdapter = Omit<ResponseGetPostAdapter, "posts"> & {
  users: User[];
};

export interface ResponseGetCommentsAdapter {
  comments: Comment[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
}

export interface IPostsManagerApiPort {
  useGetPosts(): ResponseGetPostAdapter;
  useGetUsers(): ResponseGetUserAdapter;
  useGetPostsByUserId(id: number): ResponseGetPostAdapter;
  useGetCommentsByPostId(id: number): ResponseGetCommentsAdapter;
  useUpdatePostById(params: Partial<ApiResponsePost>): Promise<void>;
  useCreatePost(params: Partial<ApiResponsePost>): Promise<void>;
  useDeletePostById(id: number): Promise<void>;
}
