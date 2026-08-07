import { useQuery } from '@tanstack/react-query';
import CommentService from '../../../services/comment.service';

export function useComments(postId: number) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => CommentService.getCommentsByPostId(postId),
  });
}