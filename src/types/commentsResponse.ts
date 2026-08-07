import { CommentWithUser } from './comment';

export interface CommentsResponse {
  comments: CommentWithUser[];
  total: number;
  skip: number;
  limit: number;
}