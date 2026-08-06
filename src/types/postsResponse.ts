import { Post, PostWithUser } from './post';

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostsWithUserResponse {
  posts: PostWithUser[];
  total: number;
  skip: number;
  limit: number;
}