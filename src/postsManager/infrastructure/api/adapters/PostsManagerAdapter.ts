import { IPostsManagerApiPort, ResponseGetPost } from "../../../core/domain/ports/PostsManagerApiPort";
import { PostsManagerApiClient } from "../clients/PostsManagerApiClient";

export class PostsManagerApiAdapter implements IPostsManagerApiPort {
  private apiClient = new PostsManagerApiClient();

  getPosts(): ResponseGetPost {
    return this.apiClient.useGetPostsQuery();
  }
}
