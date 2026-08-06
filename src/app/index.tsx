import { FlatList, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

export default function HomeScreen() {
  const { data: posts, isLoading, error } = usePosts();
  console.log(posts
  );
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View>
      <Text> posts</Text>
      <FlatList
        data={posts?.posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}