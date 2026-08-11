import {
  buttonStyle,
  COLORS,
  containerStyle,
  decorationStyle,
  inputStyle,
} from "@/styles";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
type Props = {
  tags: string[];
  onChangeTags: (tags: string[]) => void;
};

export default function TagsInput({ tags, onChangeTags }: Props) {
  const [tagInput, setTagInput] = useState("");

  useEffect(() => setTagInput(""), []);

  const handleAddTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    // Максимум 10 символів
    if (tag.length > 10) {
      return;
    }

    // Максимум 5 тегів
    if (tags.length >= 5) {
      return;
    }

    // Не дозволяємо дублікати
    if (tags.includes(tag)) {
      return;
    }

    onChangeTags([...tags, tag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChangeTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Add tag (max 5)"
          placeholderTextColor={COLORS.text1}
          style={inputStyle.base}
          maxLength={10}
          editable={tags.length < 5}
          onSubmitEditing={handleAddTag}
        />

        <TouchableOpacity
          onPress={handleAddTag}
          disabled={tags.length >= 5}
          style={[buttonStyle.base, buttonStyle.small, buttonStyle.secondary]}
        >
          <Text style={buttonStyle.textSmall}>Add</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 12,
        }}
      >
        {tags.map((tag) => (
          <View key={tag} style={[containerStyle.row, decorationStyle.tag]}>
            <Text>#{tag}</Text>

            <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
              <Text> ×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
