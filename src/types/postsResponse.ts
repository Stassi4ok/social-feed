import { Post } from './post';

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}