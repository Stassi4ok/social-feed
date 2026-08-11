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
      console.log("🚀 delete mutationFn:", id);

      const result = await PostService.delete(id);

      console.log("✅ delete API success:", result);

      return result;
    },

    onMutate: async (postId) => {
      console.log("🟡 DELETE onMutate:", postId);

      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueryData<
        InfiniteData<PostsWithUserResponse>
      >(["posts"]);

      console.log("📸 SNAPSHOT:", previousPosts);

      queryClient.setQueryData<InfiniteData<PostsWithUserResponse>>(
        ["posts"],
        (oldData) => {
          if (!oldData) {
            console.log("❌ NO CACHE");
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

      console.log(
        "🔎 CACHE AFTER OPTIMISTIC DELETE:",
        queryClient.getQueryData(["posts"]),
      );

      return {
        previousPosts,
      };
    },

    onError: (error, postId, context) => {
      console.log("🔴 DELETE ERROR:", error, postId);

      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);

        console.log("🔄 DELETE ROLLBACK");
      }
    },

    onSettled: () => {
      console.log("🔵 DELETE SETTLED");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
