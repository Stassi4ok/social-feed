import { CURRENT_USER_ID } from "@/constants/curentUser";
import { containerStyle, decorationStyle, typographyStyle } from "@/styles";
import { PostWithUser } from "@/types";
import { router } from "expo-router";
import { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

type PostCardProps = {
  post: PostWithUser;
  onEdit?: (post: PostWithUser) => void;
  disabled?: boolean;
  isGoBack?: boolean;
  isDetails?: boolean;
};

function PostCard({
  post,
  onEdit,
  disabled = false,
  isGoBack = false,
  isDetails = false,
}: PostCardProps) {
  console.log("🎨 PostCard render:", post.id);

  const isOwner = post.userId === CURRENT_USER_ID;

  const handlePress = useCallback(() => {
    router.push(`/post/${post.id}`);
  }, [post.id]);

  const handleEdit = useCallback(() => {
    onEdit?.(post);
  }, [onEdit, post]);

  return (
    <View style={containerStyle.card}>
      <TouchableOpacity disabled={disabled} onPress={handlePress}>
        <Text style={typographyStyle.textColor1}>
          {post.user?.firstName} {post.user?.lastName}
        </Text>

        <Text
          style={[typographyStyle.h3, typographyStyle.textColor1]}
          numberOfLines={isDetails ? undefined : 2}
        >
          {post.title}
        </Text>

        {post.body && (
          <Text
            style={[typographyStyle.body, typographyStyle.textColor1]}
            numberOfLines={isDetails ? undefined : 3}
          >
            {post.body}
          </Text>
        )}

        <View style={containerStyle.tags}>
          {post.tags?.map((tag) => (
            <View key={tag} style={decorationStyle.tag}>
              <Text style={typographyStyle.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {isOwner && onEdit && (
          <View style={decorationStyle.actions}>
            <EditPostButton onPress={handleEdit} />

            <DeletePostButton postId={post.id} isGoBack={isGoBack} />
          </View>
        )}

        <View style={decorationStyle.cardFooter}>
          <Text style={typographyStyle.textColor1}>
            👍 {post.reactions.likes}
          </Text>
          <Text style={typographyStyle.textColor1}>
            👎 {post.reactions.dislikes}
          </Text>
          <Text style={typographyStyle.textColor1}>👁 {post.views}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default memo(PostCard);
