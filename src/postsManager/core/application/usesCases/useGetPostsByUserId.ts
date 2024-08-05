import { ResponseGetPostAdapter } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useGetPostsByUserIdAdapter } from "src/postsManager/infrastructure/api/adapters/useGetPostByUserIdAdapter";

export const useGetPostByUserIdUseCase = (userId: number): ResponseGetPostAdapter => {
  const executeAdpater = useGetPostsByUserIdAdapter(userId);
  return executeAdpater();
};
