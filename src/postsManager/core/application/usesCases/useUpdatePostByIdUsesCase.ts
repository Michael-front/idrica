import { IPostsManagerApiPort } from "../../domain/ports/PostsManagerApiPort";
import { useUpdatePostByIdAdapter } from "src/postsManager/infrastructure/api/adapters/useUpdatePostByIdAdapter";

export const useUpdatePostByIdUseCase = (): IPostsManagerApiPort["useUpdatePostById"] => {
  const UpdatePostById = useUpdatePostByIdAdapter();
  return (id: number, title?: string, body?: string) => UpdatePostById(id, title, body);
};
