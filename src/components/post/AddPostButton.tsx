import { Button } from 'react-native';


type Props = {
  onPress: () => void;
};

export default function AddPostButton({ onPress }: Props) {
  return (
    <Button
      title="Create Post"
      onPress={onPress}
    />
  );
}