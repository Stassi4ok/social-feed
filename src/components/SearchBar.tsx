import { inputStyle } from '@/styles';
import { TextInput } from 'react-native';
type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      style={inputStyle.base}
      placeholder="Search posts..."
      value={value}
      onChangeText={onChangeText}
    />
  );
}

