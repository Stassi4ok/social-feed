import { CreatePostDto } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostService from "../../../services/post.service";




export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostDto) => {
      return PostService.create(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}