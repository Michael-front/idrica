import { useMemo } from "react";
import { IPostsManagerApiPort, ResponseGetCommentsAdapter } from "../../../core/domain/ports/PostsManagerApiPort";
import { useGetCommentsByPostIdQuery } from "../rtkQueryClient/postsApiRTK";

export const useGetCommentsByPostIdAdapter = (postId: number): IPostsManagerApiPort["useGetCommentsByPostId"] => {
  const { data: comments, error, isLoading, isError, isFetching } = useGetCommentsByPostIdQuery(postId);

  const result: ResponseGetCommentsAdapter = useMemo(() => {
    return {
      comments: comments || [],
      isLoading: isLoading || isFetching,
      error,
      isError,
    };
  }, [comments, error, isError, isFetching, isLoading]);

  return () => {
    return result;
  };
};
