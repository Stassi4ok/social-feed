import { CURRENT_USER_ID } from '@/constants';
import { useDeleteComment } from '@/hooks/comments/mutations/useDeleteComment';
import { CommentWithUser } from '@/types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  comment: CommentWithUser;
};

export default function CommentCard({
  comment}: Props) {
  const isOwner = comment.user.id === CURRENT_USER_ID;
  const { mutate: deleteComment, isPending } = useDeleteComment();
  const handleDelete = () => {
    deleteComment(comment);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>  
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {comment.user.fullName[0].toUpperCase()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {comment.user.fullName}
          </Text>
        </View>

        {isOwner && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: '700',
  },
  body: {
    marginTop: 12,
    color: '#4b5563',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  edit: {
    color: '#2563eb',
    fontWeight: '600',
  },
  delete: {
    color: '#ef4444',
    fontWeight: '600',
  },
});