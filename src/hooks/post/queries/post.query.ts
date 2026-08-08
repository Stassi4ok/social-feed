import {
  infiniteQueryOptions,
} from '@tanstack/react-query';

import PostService from "../../../services/post.service";

const LIMIT = 10;

export const postsQueryOptions = infiniteQueryOptions({
  queryKey: ['posts'],

  queryFn: async ({ pageParam }) => {
    return PostService.getAll(LIMIT, pageParam);
  },

  initialPageParam: 0,

  getNextPageParam: (lastPage) => {
    const nextSkip = lastPage.skip + lastPage.limit;

    if (nextSkip >= lastPage.total) {
      return undefined;
    }

    return nextSkip;
  },
});