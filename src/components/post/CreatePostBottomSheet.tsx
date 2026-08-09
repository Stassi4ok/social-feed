import { containerStyle, typographyStyle } from '@/styles';
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
    const snapPoints = useMemo(() => ['50%'], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView style={containerStyle.content}>
          <Text
            style={typographyStyle.h4}
          >{title}</Text>

          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CreatePostBottomSheet;