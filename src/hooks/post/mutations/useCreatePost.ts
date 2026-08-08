import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { CreatePostDto, PostsWithUserResponse } from "@/types";
import PostService from "../../../services/post.service";

import { CURRENT_USER_DATA } from "@/constants";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostDto) => PostService.create(data),

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts =
        queryClient.getQueryData<InfiniteData<PostsWithUserResponse>>([
          "posts",
        ]);

      queryClient.setQueryData<InfiniteData<PostsWithUserResponse>>(
        ["posts"],
        (old) => {
          if (!old) return old;

          const optimisticPost = {
            id: Date.now(),
            title: newPost.title,
            body: newPost.body,
            userId: newPost.userId,
            tags: [],
            reactions: {
              likes: 0,
              dislikes: 0,
            },
            views: 0,
            user: {
              id: newPost.userId,
              firstName: CURRENT_USER_DATA.firstName,
              lastName: CURRENT_USER_DATA.lastName,
              fullName: CURRENT_USER_DATA.fullName,
            },
          };

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    posts: [optimisticPost, ...page.posts],
                  }
                : page
            ),
          };
        }
      );

      return { previousPosts };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["posts"],
          context.previousPosts
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}