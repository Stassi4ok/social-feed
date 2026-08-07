import { CommentUser } from './user';

export interface Comment {
  postId: number;
  id: number;
  body: string;
  likes: number;
}

export interface CommentWithUser extends Comment {
  user: CommentUser;
}

export interface CreateCommentDto {
  postId: number;
  body: string;
  userId: number;
}