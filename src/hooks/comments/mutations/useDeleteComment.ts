import CommentService from '@/services/comment.service';
import { CommentWithUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      postId,
    }: {
      commentId: number;
      postId: number;
    }) => CommentService.delete(commentId),

    onSuccess: (_, { commentId, postId }) => {
      queryClient.setQueryData<CommentWithUser[]>(
        ['comments', postId],
        (old = []) =>
          old.filter(comment => comment.id !== commentId)
      );
    },
  });
}