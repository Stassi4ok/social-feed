import { containerStyle, typographyStyle } from "@/styles";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, ReactNode, useMemo } from "react";
import { Text } from "react-native";

type Props = {
  title?: string;
  children?: ReactNode;
};

const CreatePostBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ title, children }, ref) => {
    const snapPoints = useMemo(() => ["90%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleStyle={containerStyle.backgroundColor}
        handleIndicatorStyle={containerStyle.surfaceColor}
      >
        <BottomSheetView
          style={[containerStyle.content, containerStyle.backgroundColor]}
        >
          <Text style={[typographyStyle.h4, typographyStyle.textColor1]}>
            {title}
          </Text>

          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CreatePostBottomSheet.displayName = "CreatePostBottomSheet";

export default CreatePostBottomSheet;
