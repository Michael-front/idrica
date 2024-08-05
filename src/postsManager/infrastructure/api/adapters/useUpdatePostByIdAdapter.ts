import { IPostsManagerApiPort } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { ApiResponsePost, useUpdatePostMutation } from "../rtkQueryClient/postsApiRTK";

export const useUpdatePostByIdAdapter = (): IPostsManagerApiPort["useUpdatePostById"] => {
  const [updatePost] = useUpdatePostMutation();
  const handleUpdate = async (params: Partial<ApiResponsePost>) => {
    await updatePost(params);
  };

  return (params: Partial<ApiResponsePost>) => handleUpdate(params);
};
