import { CommentsResponse } from '../types';
import { api } from './client';
import { ENDPOINTS } from './endpoints';

export const getCommentsByPost = async (
  postId: number
): Promise<CommentsResponse> => {
  const { data } = await api.get<CommentsResponse>(
    `${ENDPOINTS.COMMENTS}/${postId}/comments`
  );

  return data;
};