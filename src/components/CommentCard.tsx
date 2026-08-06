import { Comment } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {comment.user.username[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.username}>
          @{comment.user.username}
        </Text>
      </View>

      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  username: {
    fontWeight: '700',
  },
  body: {
    color: '#4b5563',
    lineHeight: 22,
  },
});