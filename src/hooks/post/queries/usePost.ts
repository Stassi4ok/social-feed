import { useInfiniteQuery } from '@tanstack/react-query';

import { postsQueryOptions } from './post.query';

export function usePost(postId: number) {
  return useInfiniteQuery({
    ...postsQueryOptions,

    select: (data) => {
      return data.pages
        .flatMap((page) => page.posts)
        .find((post) => post.id === postId);
    },
  });
}