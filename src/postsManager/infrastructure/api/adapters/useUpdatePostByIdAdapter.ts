import { IPostsManagerApiPort } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useUpdatePostMutation } from "../rtkQueryClient/postsApiRTK";

export const useUpdatePostByIdAdapter = (): IPostsManagerApiPort["useUpdatePostById"] => {
  const [updatePost] = useUpdatePostMutation();
  const handleUpdate = async (id: number, title?: string, body?: string) => {
    await updatePost({ id, title, body });
  };

  return (id: number, title?: string, body?: string) => handleUpdate(id, title, body);
};
