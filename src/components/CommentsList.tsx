import { CommentWithUser } from '@/types';
import { StyleSheet } from 'react-native';
import CommentCard from './CommentCard';
type Props = {
  comments: CommentWithUser[];
};

export default function CommentsList({ comments, }: Props) {
  
  return (
    <>
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}

      
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});