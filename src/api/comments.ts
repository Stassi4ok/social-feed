import { Comment } from '../types/comment';
import { api } from './client';
import { ENDPOINTS } from './endpoints';

export const getCommentsByPost = async (
  postId: number
): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>(
    `${ENDPOINTS.COMMENTS}?postId=${postId}`
  );

  return data;
};