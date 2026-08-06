import { FlatList } from 'react-native';
import { PostWithUser } from '../types';
import PostCard from './PostCard';

type Props = {
  posts: PostWithUser[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

export default function PostList({
  posts,
  refreshing,
  onRefresh,
  onEndReached,
}: Props) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id.toString()}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}