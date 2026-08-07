import CommentService from '@/services/comment.service';
import { CommentWithUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: CommentWithUser) =>
      CommentService.delete(comment.id),

    onSuccess: (_, comment) => {
      queryClient.setQueryData<CommentWithUser[]>(
        ['comments', comment.postId],
        (old = []) =>
          old.filter(c => c.id !== comment.id)
      );
    },
  });
}