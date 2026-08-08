import { useInfiniteQuery } from '@tanstack/react-query';

import { postsQueryOptions } from './post.query';

export const usePosts = () => {
  return useInfiniteQuery(postsQueryOptions);
};