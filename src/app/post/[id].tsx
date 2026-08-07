import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CURRENT_USER_ID } from '@/constants';

import CommentsList from '@/components/CommentsList';
import PostCard from '@/components/post/PostCard';

import { CommentWithUser } from '@/types';

import CreateCommentBottomSheet from '@/components/CreateCommentBottomSheet';
import CreatePostBottomSheet from '@/components/post/CreatePostBottomSheet';
import CreatePostForm from '@/components/post/CreatePostForm';

import { useComments } from '@/hooks/comments/queries/useComments';
import { usePost } from '@/hooks/post/queries/usePost';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);

  const editPostSheetRef = useRef<BottomSheetModal>(null);
  const createCommentSheetRef = useRef<BottomSheetModal>(null);
  const editCommentSheetRef = useRef<BottomSheetModal>(null);
  const [selectedComment, setSelectedComment] = useState<CommentWithUser | null>(null);
  const { data: post } = usePost(postId);
  const { data: comments } = useComments(postId);

  const handleEdit = () => {
    editPostSheetRef.current?.present();
  };
  const handleEditComment = (comment: CommentWithUser) => {
    setSelectedComment(comment);
    editCommentSheetRef.current?.present();
  };
  const handleCloseEdit = () => {
    editPostSheetRef.current?.close();
  };

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <PostCard
          post={post}
          onEdit={handleEdit}
        />

        <Button
          title="Add Comment"
          onPress={() => createCommentSheetRef.current?.present()}
        />

        {comments && <CommentsList 
        comments={comments} 
        />}
      </ScrollView>

      <CreatePostBottomSheet
        ref={editPostSheetRef}
        title="Edit Post"
      >
        <CreatePostForm
          post={post}
          onSuccess={handleCloseEdit}
        />
      </CreatePostBottomSheet>

      <CreateCommentBottomSheet
        ref={createCommentSheetRef}
        postId={post.id}
        currentUserId={CURRENT_USER_ID}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});