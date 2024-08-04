import { useMemo } from "react";
import { IPostsManagerApiPort, ResponseGetPostAdapter } from "../../../core/domain/ports/PostsManagerApiPort";
import { useGetPostsQuery } from "../rtkQueryClient/postsApiRTK";

export const useGetPostsAdapter = (): IPostsManagerApiPort["useGetPosts"] => {
  const { data: posts, error, isLoading, isError, isFetching } = useGetPostsQuery();

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
