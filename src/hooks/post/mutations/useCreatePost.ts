import { CreatePostDto, PostsWithUserResponse } from "@/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PostService from "../../../services/post.service";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostDto) => PostService.create(data),

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueryData<
        InfiniteData<PostsWithUserResponse>
      >(["posts"]);

      queryClient.setQueryData<InfiniteData<PostsWithUserResponse>>(
        ["posts"],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    posts: [
                      {
                        id: Date.now(), // тимчасовий id
                        title: newPost.title,
                        body: newPost.body,
                        userId: newPost.userId,
                        tags: [],
                        reactions: {
                          likes: 0,
                          dislikes: 0,
                        },
                        views: 0,
                      },
                      ...page.posts,
                    ],
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