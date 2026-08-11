import { CURRENT_USER_ID } from "@/constants";
import { useDeleteComment } from "@/hooks/comments/mutations/useDeleteComment";
import {
  buttonStyle,
  containerStyle,
  decorationStyle,
  typographyStyle,
} from "@/styles";
import { CommentWithUser } from "@/types";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  comment: CommentWithUser;
};

function CommentCard({ comment }: Props) {
  const isOwner = comment.user.id === CURRENT_USER_ID;
  const { mutate: deleteComment, isPending } = useDeleteComment();
  const handleDelete = () => {
    deleteComment(comment);
  };
  console.log("🎨 Comment render: ", comment.id);

  return (
    <View style={containerStyle.card}>
      <View style={containerStyle.rowBetween}>
        <View style={containerStyle.row}>
          <View style={decorationStyle.avatar}>
            <Text
              style={[typographyStyle.bodyBold, typographyStyle.textColor1]}
            >
              {comment.user.fullName[0].toUpperCase()}
            </Text>
          </View>

          <View>
            <Text
              style={[typographyStyle.bodyMedium, typographyStyle.textColor1]}
            >
              {comment.user.fullName}
            </Text>
          </View>
        </View>
        {isOwner && (
          <TouchableOpacity
            onPress={handleDelete}
            style={[buttonStyle.base, buttonStyle.small]}
          >
            <Text style={[typographyStyle.delete]}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[typographyStyle.body, typographyStyle.textColor1]}>
        {comment.body}
      </Text>
    </View>
  );
}

export default memo(CommentCard);
