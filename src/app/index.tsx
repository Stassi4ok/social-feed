import { FlatList, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

const posts = data?.pages.flatMap(page => page.posts) ?? [];

  return (
    <View>
      <Text> posts</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}