import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  PostsWithUserResponse,
} from '@/types';

import PostService from '../../../services/post.service';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      console.log('🚀 delete mutationFn:', id);

      const result = await PostService.delete(id);

      console.log('✅ delete API success:', result);

      return result;
    },

    onMutate: async (postId) => {
  console.log('🟡 DELETE onMutate:', postId);

  await queryClient.cancelQueries({
    queryKey: ['posts'],
  });

  const previousPosts =
    queryClient.getQueryData<
      InfiniteData<PostsWithUserResponse>
    >(['posts']);

  console.log('📸 SNAPSHOT:', previousPosts);

  queryClient.setQueryData<
    InfiniteData<PostsWithUserResponse>
  >(
    ['posts'],
    (oldData) => {
      if (!oldData) {
        console.log('❌ NO CACHE');
        return oldData;
      }

      console.log(
        '📦 POSTS BEFORE:',
        oldData.pages.flatMap(
          page => page.posts
        ).length,
      );

      const newData = {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          posts: page.posts.filter(
            post => post.id !== postId
          ),
        })),
      };

      console.log(
        '📦 POSTS AFTER:',
        newData.pages.flatMap(
          page => page.posts
        ).length,
      );

      return newData;
    },
  );

  // Перевіряємо cache ПІСЛЯ setQueryData
  const afterUpdate =
    queryClient.getQueryData<
      InfiniteData<PostsWithUserResponse>
    >(['posts']);

  console.log(
    '🔎 CACHE AFTER OPTIMISTIC DELETE:',
    afterUpdate,
  );

  return {
    previousPosts,
  };
},})}