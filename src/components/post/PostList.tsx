import { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
} from 'react-native';

import { PostWithUser } from '../../types';
import PostCard from './PostCard';

type Props = {
  posts: PostWithUser[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  onEdit: (post: PostWithUser) => void;
};

export default function PostList({
  posts,
  refreshing,
  onRefresh,
  onEndReached,
  onEdit,
}: Props) {
  const renderItem = useCallback<ListRenderItem<PostWithUser>>(
    ({ item }) => {
      return (
        <PostCard
          post={item}
          onEdit={onEdit}
        />
      );
    },
    [onEdit],
  );

  const keyExtractor = useCallback(
    (item: PostWithUser) => String(item.id),
    [],
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}