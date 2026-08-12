import { useCallback, useMemo, useRef, useState } from "react";

import { usePosts } from "@/hooks/post/queries/usePosts";

import {
  AddPostButton,
  CreatePostBottomSheet,
  CreatePostForm,
  PostList,
} from "@/components/post";

import { View } from "react-native";
import { SearchBar } from "../components";

import { PostWithUser } from "@/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import LoadingPosts from "@/components/LoadingPosts";
import { containerStyle } from "@/styles";
export default function PostListScreen() {
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isRefetching,
  } = usePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.body.toLowerCase().includes(normalizedSearch),
    );
  }, [posts, search]);

  if (isPending) {
    return <LoadingPosts />;
  }

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCreate = useCallback(() => {
    setSelectedPost(null);
    bottomSheetRef.current?.present();
  }, []);

  const handleEdit = useCallback((post: PostWithUser) => {
    setSelectedPost(post);
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    setSelectedPost(null);
  }, []);

  return (
    <View style={containerStyle.main}>
      <SearchBar value={search} onChangeText={setSearch} />

      <AddPostButton onPress={handleCreate} />

      <PostList
        posts={filteredPosts}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleLoadMore}
        onEdit={handleEdit}
      />

      <CreatePostBottomSheet
        ref={bottomSheetRef}
        title={selectedPost ? "Edit Post" : "Create Post"}
      >
        <CreatePostForm
          post={selectedPost ?? undefined}
          onSuccess={handleClose}
        />
      </CreatePostBottomSheet>
    </View>
  );
}
