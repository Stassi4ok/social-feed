import CommentService from '@/services/comment.service';
import { CommentWithUser, CreateCommentDto } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      comment,
    }: {
      id: number;
      comment: CreateCommentDto;
    }) => CommentService.update(comment, id),

    onSuccess: (updatedComment) => {
      queryClient.setQueryData<CommentWithUser[]>(
        ['comments', updatedComment.postId],
        (old = []) =>
          old.map(comment =>
            comment.id === updatedComment.id
              ? updatedComment
              : comment
          )
      );
    },
  });
}