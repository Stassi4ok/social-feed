import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { usePosts } from '@/hooks/post/queries/usePosts';

import {
  AddPostButton,
  CreatePostBottomSheet,
  CreatePostForm,
  PostList,
} from '@/components/post';

import { View } from 'react-native';
import { SearchBar } from '../components';

import { PostWithUser } from '@/types';
import BottomSheet from '@gorhom/bottom-sheet';

export default function PostListScreen() {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] =
    useState<PostWithUser | null>(null);

  const bottomSheetRef =
    useRef<BottomSheet>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePosts();

  const posts =
    data?.pages.flatMap(
      page => page.posts,
    ) ?? [];

  console.log(
    '📱 SCREEN POSTS:',
    posts.map(post => post.id),
  );

  const filteredPosts = useMemo(() => {
    const normalizedSearch =
      search.toLowerCase();

    return posts.filter(
      post =>
        post.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        post.body
          .toLowerCase()
          .includes(normalizedSearch),
    );
  }, [posts, search]);

  const handleLoadMore = useCallback(() => {
    if (
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const handleCreate = useCallback(() => {
    setSelectedPost(null);
    bottomSheetRef.current?.expand();
  }, []);

  const handleEdit = useCallback(
    (post: PostWithUser) => {
      setSelectedPost(post);
      bottomSheetRef.current?.expand();
    },
    [],
  );

  const handleClose = useCallback(() => {
    console.log('🔥 HANDLE CLOSE');

    bottomSheetRef.current?.close();
    setSelectedPost(null);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <AddPostButton
        onPress={handleCreate}
      />

      <PostList
        posts={filteredPosts}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleLoadMore}
        onEdit={handleEdit}
      />

      <CreatePostBottomSheet
        ref={bottomSheetRef}
        title={
          selectedPost
            ? 'Edit Post'
            : 'Create Post'
        }
      >
        <CreatePostForm
          post={
            selectedPost ?? undefined
          }
          onSuccess={handleClose}
        />
      </CreatePostBottomSheet>
    </View>
  );
}