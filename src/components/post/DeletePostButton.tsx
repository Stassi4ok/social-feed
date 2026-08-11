import { useDeletePost } from "@/hooks/post/mutations/useDeletePost";
import { buttonStyle } from "@/styles";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
type Props = {
  postId: number;
  isGoBack: boolean;
};

export default function DeletePostButton({ postId, isGoBack }: Props) {
  const { mutate: deletePost } = useDeletePost();

  const router = useRouter();

  const handleDelete = useCallback(() => {
    Alert.alert("Delete post", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          isGoBack && router.back();
          deletePost(postId);
        },
      },
    ]);
  }, [router, deletePost, postId]);

  return (
    <TouchableOpacity
      style={[buttonStyle.base, buttonStyle.delete, buttonStyle.normal]}
      onPress={handleDelete}
    >
      <Text style={buttonStyle.textNormal}>Delete</Text>
    </TouchableOpacity>
  );
}
