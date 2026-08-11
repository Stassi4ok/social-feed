import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { PostsWithUserResponse, UpdatePostDto } from "@/types";

import PostService from "../../../services/post.service";

type UpdatePostVariables = {
  postId: number;
  data: UpdatePostDto;
};

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, data }: UpdatePostVariables) => {
      const result = await PostService.update(postId, data);

      return result;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueryData<
        InfiniteData<PostsWithUserResponse>
      >(["posts"]);

      // 3. Optimistic update
      queryClient.setQueryData<InfiniteData<PostsWithUserResponse>>(
        ["posts"],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,

            pages: oldData.pages.map((page) => ({
              ...page,

              posts: page.posts.map((post) => {
                // Оновлюємо тільки потрібний пост
                if (post.id !== variables.postId) {
                  return post;
                }

                return {
                  ...post,
                  ...variables.data,
                };
              }),
            })),
          };
        },
      );

      return {
        previousPosts,
      };
    },

    onError: (_error, _variables, context) => {
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
