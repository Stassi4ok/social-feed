import { useDeletePost } from '@/hooks/post/mutations/useDeletePost';
import { buttonStyle } from '@/styles';
import { usePathname, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity
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



  const handleDelete = useCallback(() => {
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
  },[isHome, router, deletePost, postId])

  return (
    <TouchableOpacity
      style={[
        buttonStyle.base,
        buttonStyle.delete,
        buttonStyle.normal,
        isPending && buttonStyle.disabled,
      ]}
      onPress={handleDelete}
      disabled={isPending}
    >
      <Text style={buttonStyle.textNormal}>
        {isPending ? 'Deleting...' : 'Delete'}
      </Text>
    </TouchableOpacity>
  );
}