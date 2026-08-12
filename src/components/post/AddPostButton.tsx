import { buttonStyle } from "@/styles";
import { Pressable, Text } from "react-native";

type Props = {
  onPress?: () => void;
};

export default function AddPostButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[buttonStyle.base, buttonStyle.normal, buttonStyle.primary]}
    >
      <Text style={buttonStyle.textNormal}>Create Post</Text>
    </Pressable>
  );
}
