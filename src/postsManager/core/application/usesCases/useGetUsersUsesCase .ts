import { ResponseGetUserAdapter } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useGetUsersAdapter } from "src/postsManager/infrastructure/api/adapters/useGetUsersAdapter";

export const useGetUsersUseCase = (): ResponseGetUserAdapter => {
  const executeUseGetUsesAdapter = useGetUsersAdapter();
  return executeUseGetUsesAdapter();
};
