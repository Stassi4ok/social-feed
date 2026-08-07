import { PostsWithUserResponse } from '@/types';
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';
import PostService from '../../../services/post.service';

export function usePost(postId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['post', postId],

    queryFn: () => PostService.getById(postId),

    initialData: () => {
      const data = queryClient.getQueryData<
        InfiniteData<PostsWithUserResponse>
      >(['posts']);
  
      return data?.pages
        .flatMap(page => page.posts)
        .find(post => post.id === postId);
    },
  });
}