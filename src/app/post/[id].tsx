import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CommentsList from '@/components/CommentsList';
import PostCard from '@/components/PostCard';

import { useComments } from '@/hooks/useComments';
import { usePost } from '@/hooks/usePost';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const postId = Number(id);

  const { data: post } = usePost(postId);
  const { data: comments } = useComments(postId);

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PostCard post={post} />

      {comments && (
        <CommentsList comments={comments} />
      )}
    </ScrollView>
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
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});