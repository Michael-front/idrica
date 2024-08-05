import { useMemo } from "react";
import { IPostsManagerApiPort, ResponseGetUserAdapter } from "src/postsManager/core/domain/ports/PostsManagerApiPort";
import { useGetUsersQuery } from "../rtkQueryClient/postsApiRTK";
import { responseGetUserMapper } from "../mappers/responseGetUsersMapper";

export const useGetUsersAdapter = (): IPostsManagerApiPort["useGetUsers"] => {
  const { data: users, error, isLoading, isError, isFetching } = useGetUsersQuery();

  const userMap = responseGetUserMapper(users);

  const result: ResponseGetUserAdapter = useMemo(() => {
    return {
      users: userMap || [],
      isLoading: isLoading || isFetching,
      error,
      isError,
    };
  }, [error, isError, isFetching, isLoading, userMap]);

  return () => {
    return result;
  };
};
