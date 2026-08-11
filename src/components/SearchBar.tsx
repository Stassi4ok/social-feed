import { COLORS, inputStyle } from "@/styles";
import { TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <TextInput
      style={[inputStyle.base]}
      placeholderTextColor={COLORS.text1}
      placeholder="Search posts..."
      multiline={false}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
