import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { PostsWithUserResponse } from "@/types";

import PostService from "../../../services/post.service";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await PostService.delete(id);

      return result;
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueryData<
        InfiniteData<PostsWithUserResponse>
      >(["posts"]);

      queryClient.setQueryData<InfiniteData<PostsWithUserResponse>>(
        ["posts"],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const newData = {
            ...oldData,

            pages: oldData.pages.map((page) => ({
              ...page,

              posts: page.posts.filter((post) => post.id !== postId),
            })),
          };

          return newData;
        },
      );

      return {
        previousPosts,
      };
    },

    onError: (error, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
