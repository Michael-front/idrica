import { ApiResponsePost } from "src/postsManager/infrastructure/api/rtkQueryClient/postsApiRTK";
import { IPostsManagerApiPort } from "../../domain/ports/PostsManagerApiPort";
import { useCreatePostAdapter } from "src/postsManager/infrastructure/api/adapters/useCreatePostAdapter";

export const useCreatePostUseCase = (): IPostsManagerApiPort["useCreatePost"] => {
  const createPostById = useCreatePostAdapter();
  return (params: Partial<ApiResponsePost>) => createPostById(params);
};
