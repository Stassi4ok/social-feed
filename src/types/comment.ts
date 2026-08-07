import { CommentUser } from './user';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  likes: number;
}

export interface CommentWithUser extends Comment {
  user: CommentUser;
}

export interface CreateCommentDto {
  postId: number;
  title: string;
  body: string;
  userId: number;
}