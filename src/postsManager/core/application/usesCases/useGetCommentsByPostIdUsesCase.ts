import { ResponseGetCommentsAdapter } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useGetCommentsByPostIdAdapter } from "src/postsManager/infrastructure/api/adapters/useGetCommentsByPostIdAdapter";

export const useGetCommentsByPostIdUsesCase = (postId: number): ResponseGetCommentsAdapter => {
  const executeAdpater = useGetCommentsByPostIdAdapter(postId);
  return executeAdpater(postId);
};
