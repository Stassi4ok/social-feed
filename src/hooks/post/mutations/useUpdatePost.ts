import { UpdatePostDto } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostService from "../../../services/post.service";
type UpdatePostVariables = {
  id: number;
  data: UpdatePostDto;
};


export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePostVariables) =>
      PostService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}