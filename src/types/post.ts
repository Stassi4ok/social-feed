import { User } from './user';

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface PostWithUser extends Post {
  user: User;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
  userId?: number;
}

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}