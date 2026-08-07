import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import CreatePostButton from '@/components/post/AddPostButton';
import CreatePostBottomSheet from '@/components/post/CreatePostBottomSheet';
import CreatePostForm from '@/components/post/CreatePostForm';
import PostList from '@/components/post/PostList';
import SearchBar from '@/components/SearchBar';
import { usePosts } from '@/hooks/post/queries/usePosts';
import { PostWithUser } from '@/types/post';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

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
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleCreate = () => {
    setSelectedPost(null);
    bottomSheetRef.current?.expand();
  };

  const handleEdit = (post: PostWithUser) => {
    setSelectedPost(post);
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
    setSelectedPost(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <CreatePostButton onPress={handleCreate} />

      <PostList
        posts={filteredPosts}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleLoadMore}
        onEdit={handleEdit}
      />

      <CreatePostBottomSheet
        ref={bottomSheetRef}
        title={selectedPost ? 'Edit Post' : 'Create Post'}
      >
        <CreatePostForm
          post={selectedPost ?? undefined}
          onSuccess={handleClose}
        />
      </CreatePostBottomSheet>
    </View>
  );
}