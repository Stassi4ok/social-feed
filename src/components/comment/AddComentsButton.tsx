import { Pressable, Text } from "react-native";

import { buttonStyle } from "@/styles";

type Props = {
  onPress?: () => void;
};

export default function AddCommentButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        buttonStyle.base,
        buttonStyle.primary,
        buttonStyle.normal,
        pressed && buttonStyle.pressed,
      ]}
    >
      <Text style={buttonStyle.textNormal}>Add Comment</Text>
    </Pressable>
  );
}
