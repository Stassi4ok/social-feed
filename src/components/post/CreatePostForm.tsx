import { useCreatePost } from '@/hooks/post/mutations/useCreatePost';
import { useUpdatePost } from '@/hooks/post/mutations/useUpdatePost';
import { buttonStyle, containerStyle, inputStyle } from '@/styles';
import { PostWithUser } from '@/types/post';
import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
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
       console.log(' UPDATE SUCCESS', post);
      updatePost(
        {
          postId: post.id,
          data: {
            title,
            body,
          },
        },
        {
          onSuccess: (data) => {
            onSuccess?.();
             console.log('✅ UPDATE SUCCESS', data);
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
    <View style={containerStyle.formContainer}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={inputStyle.base}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={[inputStyle.base, inputStyle.textArea]}
        multiline
      />

      <Pressable
        onPress={handleSubmit}
        disabled={isCreating || isUpdating}
        style={({ pressed }) => [
          buttonStyle.base,
          buttonStyle.primary,
          pressed && buttonStyle.pressed,
          (isCreating || isUpdating) && buttonStyle.disabled,
        ]}
      >
        <Text style={buttonStyle.textNormal}>
          {post ? 'Save' : 'Create'}
        </Text>
      </Pressable>
    </View>
  );
}