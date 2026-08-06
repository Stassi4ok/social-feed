import { useInfiniteQuery } from '@tanstack/react-query';
import PostService from '../services/post.service';

const LIMIT = 10;

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await PostService.getAll(LIMIT, pageParam);
      return result;
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
};