import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';

import { useComments } from '../hooks/queries/useComments';
import { usePost } from '../hooks/queries/usePost';

export default function PostDetailsScreen() {
  const route = useRoute();

  const { postId } = route.params;

  const { data: post } = usePost(postId);

  const { data: comments } = useComments(postId);

  if (!post) return null;

  return (
    <ScrollView>

      <Text>{post.title}</Text>

      <Text>{post.body}</Text>

      <Text>
        {post.user.firstName} {post.user.lastName}
      </Text>

      {comments?.map(comment => (
        <View key={comment.id}>
          <Text>{comment.user.username}</Text>
          <Text>{comment.body}</Text>
        </View>
      ))}

    </ScrollView>
  );
}