import { ResponseGetPostAdapter } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useGetPostsAdapter } from "src/postsManager/infrastructure/api/adapters/useGetPostsAdapter";

export const useGetPostUseCase = (): ResponseGetPostAdapter => {
  const executeUseGetPotsAdapter = useGetPostsAdapter();
  return executeUseGetPotsAdapter();
};
