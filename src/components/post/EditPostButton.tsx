import { buttonStyle, typographyStyle } from "@/styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
type Props = {
  onPress: () => void;
};

export default function EditPostButton({ onPress }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle.base, buttonStyle.normal]}
    >
      <Text style={[buttonStyle.textNormal, typographyStyle.textColor1]}>
        Edit
      </Text>
    </TouchableOpacity>
  );
}
