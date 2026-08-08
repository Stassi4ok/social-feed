import { useCallback, useRef } from 'react';

import { useComments } from '@/hooks/comments/queries/useComments';
import { usePost } from '@/hooks/post/queries/usePost';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CommentsList, CreateCommentBottomSheet } from '@/components';
import { CreatePostBottomSheet, CreatePostForm, PostCard } from '@/components/post';

import { PostWithUser } from '@/types';

import { CURRENT_USER_ID } from '@/constants';

export default function PostDetailsScreen() {


  const editPostSheetRef = useRef<BottomSheetModal>(null);
  const createCommentSheetRef = useRef<BottomSheetModal>(null);
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);

  const { data: post } = usePost(postId);
  const { data: comments } = useComments(postId);

  const handleEdit = useCallback(
      (post: PostWithUser) => {
         editPostSheetRef.current?.expand();
      },
      [],
    );
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