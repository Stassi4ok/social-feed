import { Comment } from '@/types';
import { StyleSheet, Text, View } from 'react-native';
import CommentCard from './CommentCard';

type Props = {
  comments: Comment[];
};

export default function CommentsList({ comments }: Props) {
  return (
    <View>
      <Text style={styles.title}>
        Comments ({comments.length})
      </Text>

      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});