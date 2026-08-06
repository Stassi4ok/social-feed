import PostList from '@/components/PostList';
import SearchBar from '@/components/SearchBar';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { usePosts } from '../hooks/usePosts';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePosts();

  
const posts = data?.pages.flatMap(page => page.posts) ?? [];

const filteredPosts = useMemo(() => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );
}, [posts, search]);

const handleLoadMore = () => {
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
};
  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <PostList
        posts={filteredPosts}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleLoadMore}
      />
    </View>
  );
}