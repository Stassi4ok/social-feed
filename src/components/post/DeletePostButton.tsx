import { useDeletePost } from '@/hooks/post/mutations/useDeletePost';
import { usePathname, useRouter } from 'expo-router';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
type Props = {
  postId: number;
};

export default function DeletePostButton({
  postId,
}: Props) {
  const {
    mutate: deletePost,
    isPending,
  } = useDeletePost();

const router = useRouter();
const isHome = "/" === usePathname();

  const handleDelete = () => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            !isHome &&  router.back();
            deletePost(postId);
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles.delete]}
      onPress={handleDelete}
      disabled={isPending}
    >
      <Text style={styles.text}>
        {isPending
          ? 'Deleting...'
          : 'Delete'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  delete: {
    backgroundColor: '#EF4444',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },
});