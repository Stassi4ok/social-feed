import { useCreatePost } from "@/hooks/post/mutations/useCreatePost";
import { useUpdatePost } from "@/hooks/post/mutations/useUpdatePost";
import {
  buttonStyle,
  COLORS,
  containerStyle,
  inputStyle,
  typographyStyle,
} from "@/styles";
import { PostWithUser } from "@/types/post";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import TagsInput from "./TagsInput";

type Props = {
  post?: PostWithUser;
  onSuccess?: () => void;
};

type Errors = {
  title?: string;
  body?: string;
  tags?: string;
};

export default function CreatePostForm({ post, onSuccess }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);

  const [errors, setErrors] = useState<Errors>({});

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  useEffect(() => {
    setTitle(post?.title ?? "");
    setBody(post?.body ?? "");
    setTags(post?.tags ?? []);
    setErrors({});
  }, [post]);

  const validate = () => {
    const newErrors: Errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 100) {
      newErrors.title = "Title must be no more than 100 characters";
    }

    if (!body.trim()) {
      newErrors.body = "Body is required";
    } else if (body.trim().length < 10) {
      newErrors.body = "Body must be at least 10 characters";
    } else if (body.trim().length > 1000) {
      newErrors.body = "Body must be no more than 1000 characters";
    }

    if (tags.length > 5) {
      newErrors.tags = "You can add no more than 5 tags";
    }

    if (tags.some((tag) => !tag.trim() || tag.trim().length > 10)) {
      newErrors.tags = "Each tag must be no more than 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    if (post) {
      console.log("UPDATE SUCCESS", post);

      updatePost({
        postId: post.id,
        data: {
          title: title.trim(),
          body: body.trim(),
          tags,
        },
      });

      onSuccess?.();
    } else {
      createPost({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
        tags,
      });

      setTitle("");
      setBody("");
      setTags([]);
      setErrors({});

      onSuccess?.();
    }
  };

  return (
    <View style={containerStyle.formContainer}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={COLORS.text1}
        value={title}
        onChangeText={setTitle}
        style={inputStyle.base}
      />

      {errors.title && (
        <Text style={typographyStyle.error}>{errors.title}</Text>
      )}

      <TextInput
        placeholder="Body"
        placeholderTextColor={COLORS.text1}
        value={body}
        onChangeText={setBody}
        style={[inputStyle.base, inputStyle.textArea]}
        multiline
      />

      {errors.body && <Text style={typographyStyle.error}>{errors.body}</Text>}

      <TagsInput tags={tags} onChangeTags={setTags} />

      {errors.tags && <Text style={typographyStyle.error}>{errors.tags}</Text>}

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
        <Text style={buttonStyle.textNormal}>{post ? "Save" : "Create"}</Text>
      </Pressable>
    </View>
  );
}
