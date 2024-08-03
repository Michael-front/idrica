import { useGetPostsQuery } from "src/postsManager/infrastructure/api/rtk/postsApi";

export interface ApiResponsePost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export class PostsManagerApiClient {
  useGetPostsQuery = useGetPostsQuery;
}
