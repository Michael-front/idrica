import { useDeletePostByIdAdapter } from "src/postsManager/infrastructure/api/adapters/useDeletePostByIdAdapter";
import { IPostsManagerApiPort } from "../../domain/ports/PostsManagerApiPort";

export const useDeleteByIdUseCase = (): IPostsManagerApiPort["useDeletePostById"] => {
  const deletePostByid = useDeletePostByIdAdapter();
  return (id: number) => deletePostByid(id);
};
