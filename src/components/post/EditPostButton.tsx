import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function EditPostButton({ onPress }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
  <TouchableOpacity onPress={onPress}>
    <Text>Edit</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  edit: {
    backgroundColor: '#2563EB',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },
});