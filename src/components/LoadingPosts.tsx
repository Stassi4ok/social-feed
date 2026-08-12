import { containerStyle } from "@/styles";
import { Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { AddPostButton } from "./post";
export default function LoadingPosts() {
  return (
    <View style={containerStyle.main}>
      <SearchBar />

      <AddPostButton />

      <Text>Loading post...</Text>
    </View>
  );
}
