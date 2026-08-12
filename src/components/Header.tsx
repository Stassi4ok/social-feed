import { containerStyle, typographyStyle } from "@/styles";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  screenName: string;
}
export default function Header({ screenName }: Props) {
  const handleHomePress = () => {
    router.replace("/");
  };
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[{ paddingTop: insets.top }, containerStyle.backgroundColor]}
      />
      <View style={[containerStyle.header, containerStyle.backgroundColor]}>
        <Pressable onPress={handleHomePress}>
          <Text style={typographyStyle.h2}>Social feed</Text>
        </Pressable>
        <Text style={typographyStyle.h4}>{screenName}</Text>
      </View>
    </>
  );
}
