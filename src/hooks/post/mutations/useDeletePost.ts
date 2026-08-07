import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostService from '../../../services/post.service';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => PostService.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      queryClient.removeQueries({
        queryKey: ['post', id],
      });
    },
  });
}