import { StyleSheet, Text, View } from 'react-native';
import { Post } from '../types/post';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.footer}>
        <Text>👍 {post.reactions.likes}</Text>
        <Text>👎 {post.reactions.dislikes}</Text>
  
      </View>
    </View>
  );
}

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