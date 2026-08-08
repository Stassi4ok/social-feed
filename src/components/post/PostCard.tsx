import { CURRENT_USER_ID } from '@/constants/curentUser';
import { PostWithUser } from '@/types';
import { router } from 'expo-router';
import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DeletePostButton from './DeletePostButton';
import EditPostButton from './EditPostButton';

type PostCardProps = {
  post: PostWithUser;
  onEdit?: (post: PostWithUser) => void;
  
};

function PostCard({ post, onEdit }: PostCardProps) {
  console.log('🎨 PostCard render:', post.id);
  const isOwner = post.userId === CURRENT_USER_ID;
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>  router.push(`/post/${post.id}`)}
      >
        <Text style={styles.author}>
          {post.user?.firstName} {post.user?.lastName}
        </Text>

        <Text style={styles.title}>{post.title}</Text>

        {post.body && (
          <Text style={styles.body}>{post.body}</Text>
        )}

        <View style={styles.tagsContainer}>
          {post.tags?.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
          {isOwner && onEdit && (
              <View style={styles.actions}>
              <EditPostButton onPress={() => onEdit(post)} />
              <DeletePostButton postId={post.id} />
            </View>
            )}
            <View style={styles.footer}>
                <Text>👍 {post.reactions.likes}</Text>
                <Text>👎 {post.reactions.dislikes}</Text>
                <Text>👁 {post.views}</Text>
              </View>
        </TouchableOpacity>

      
    </View>
  );
}

export default memo(PostCard);
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
    author: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  tag: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
});