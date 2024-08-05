import { IPostsManagerApiPort } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useDeletePostMutation } from "../rtkQueryClient/postsApiRTK";

export const useDeletePostByIdAdapter = (): IPostsManagerApiPort["useDeletePostById"] => {
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id: number) => {
    await deletePost(id);
  };

  return (id: number) => handleDelete(id);
};
