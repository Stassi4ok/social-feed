import { useCallback, useRef } from "react";

import { useComments } from "@/hooks/comments/queries/useComments";
import { usePost } from "@/hooks/post/queries/usePost";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import {
  AddCommentButton,
  CommentsList,
  CreateCommentBottomSheet,
} from "@/components";
import {
  CreatePostBottomSheet,
  CreatePostForm,
  PostCard,
} from "@/components/post";

import { PostWithUser } from "@/types";

import { CURRENT_USER_ID } from "@/constants";

import { containerStyle } from "@/styles";
export default function PostDetailsScreen() {
  const editPostSheetRef = useRef<BottomSheetModal>(null);
  const createCommentSheetRef = useRef<BottomSheetModal>(null);

  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);

  const { data: post } = usePost(postId);
  const { data: comments } = useComments(postId);

  const handleEdit = useCallback((post: PostWithUser) => {
    editPostSheetRef.current?.expand();
  }, []);
  const handleCloseEdit = () => {
    editPostSheetRef.current?.close();
  };

  const handleAddComment = useCallback(
    () => createCommentSheetRef.current?.expand(),
    [],
  );

  if (!post) {
    return (
      <View style={containerStyle.main}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={containerStyle.main}
        contentContainerStyle={containerStyle.scrollView}
      >
        <PostCard
          post={post}
          onEdit={handleEdit}
          disabled={true}
          isGoBack={true}
          isDetails={true}
        />

        <AddCommentButton onPress={handleAddComment} />

        {comments && <CommentsList comments={comments} />}
      </ScrollView>

      <CreatePostBottomSheet ref={editPostSheetRef} title="Edit Post">
        <CreatePostForm post={post} onSuccess={handleCloseEdit} />
      </CreatePostBottomSheet>

      <CreateCommentBottomSheet
        ref={createCommentSheetRef}
        postId={post.id}
        currentUserId={CURRENT_USER_ID}
      />
    </>
  );
}
