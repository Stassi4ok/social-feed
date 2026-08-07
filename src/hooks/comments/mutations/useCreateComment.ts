import CommentService from '@/services/comment.service';
import { CommentWithUser, CreateCommentDto } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: CreateCommentDto) =>
      CommentService.add(comment),

    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentWithUser[]>(
        ['comments', newComment.postId],
        (old = []) => [ newComment, ...old]
      );
    },
  });
}