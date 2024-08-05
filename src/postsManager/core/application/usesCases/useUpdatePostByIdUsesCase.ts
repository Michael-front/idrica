import { ApiResponsePost } from "src/postsManager/infrastructure/api/rtkQueryClient/postsApiRTK";
import { IPostsManagerApiPort } from "../../domain/ports/PostsManagerApiPort";
import { useUpdatePostByIdAdapter } from "src/postsManager/infrastructure/api/adapters/useUpdatePostByIdAdapter";

export const useUpdatePostByIdUseCase = (): IPostsManagerApiPort["useUpdatePostById"] => {
  const UpdatePostById = useUpdatePostByIdAdapter();
  return (params: Partial<ApiResponsePost>) => UpdatePostById(params);
};
