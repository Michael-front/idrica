import { IPostsManagerApiPort } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { ApiResponsePost, useAddPostMutation } from "../rtkQueryClient/postsApiRTK";

export const useCreatePostAdapter = (): IPostsManagerApiPort["useCreatePost"] => {
  const [createPost] = useAddPostMutation();
  const handleCreate = async (params: Partial<ApiResponsePost>) => {
    await createPost(params);
  };

  return (params: Partial<ApiResponsePost>) => handleCreate(params);
};
