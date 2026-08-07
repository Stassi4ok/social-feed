import BottomSheet, {
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, ReactNode, useMemo } from 'react';
import { Text } from 'react-native';

type Props = {
  title?: string;
  children?: ReactNode;
};

const CreatePostBottomSheet = forwardRef<BottomSheet, Props>(
  ({ title, children }, ref) => {
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          <Text>{title}</Text>

          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CreatePostBottomSheet;