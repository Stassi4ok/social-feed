import { Comment } from './comment';

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}