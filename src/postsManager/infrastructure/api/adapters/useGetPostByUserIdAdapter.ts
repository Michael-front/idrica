import { useMemo } from "react";
import { IPostsManagerApiPort, ResponseGetPostAdapter } from "../../../core/domain/ports/PostsManagerApiPort";
import { useGetPostByUserIdQuery } from "../rtkQueryClient/postsApiRTK";

export const useGetPostsByUserIdAdapter = (userId: number): IPostsManagerApiPort["useGetPostsByUserId"] => {
  const { data: posts, error, isLoading, isError, isFetching } = useGetPostByUserIdQuery(userId);

  const result: ResponseGetPostAdapter = useMemo(() => {
    return {
      posts: posts || [],
      isLoading: isLoading || isFetching,
      error,
      isError,
    };
  }, [error, isError, isFetching, isLoading, posts]);

  return () => {
    return result;
  };
};
