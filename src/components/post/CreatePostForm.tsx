import { useCreatePost } from '@/hooks/post/mutations/useCreatePost';
import { useUpdatePost } from '@/hooks/post/mutations/useUpdatePost';
import { PostWithUser } from '@/types/post';
import { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

type Props = {
  post?: PostWithUser;
  onSuccess?: () => void;
};

export default function CreatePostForm({ post, onSuccess }: Props) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [body, setBody] = useState(post?.body ?? '');

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  useEffect(() => {
    setTitle(post?.title ?? '');
    setBody(post?.body ?? '');
  }, [post]);

  const handleSubmit = () => {
    if (post) {
      updatePost(
        {
          id: post.id,
          data: {
            title,
            body,
          },
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createPost(
        {
          title,
          body,
          userId: 1,
        },
        {
          onSuccess: () => {
            setTitle('');
            setBody('');
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Button
        title={post ? 'Save' : 'Create'}
        onPress={handleSubmit}
        disabled={isCreating || isUpdating}
      />
    </View>
  );
}