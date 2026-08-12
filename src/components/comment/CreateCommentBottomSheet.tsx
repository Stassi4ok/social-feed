import { useCreateComment } from "@/hooks/comments/mutations/useCreateComment";
import {
  buttonStyle,
  COLORS,
  containerStyle,
  inputStyle,
  typographyStyle,
} from "@/styles";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";
type Props = {
  postId: number;
  currentUserId: number;
};
type Errors = {
  body?: string;
};

const CreateCommentBottomSheet = forwardRef<BottomSheet, Props>(
  ({ postId, currentUserId }, ref) => {
    const snapPoints = useMemo(() => ["90%"], []);

    const [body, setBody] = useState("");

    const [errors, setErrors] = useState<Errors>({});

    const { mutate: createComment, isPending } = useCreateComment();

    const handleCreate = () => {
      if (!validate()) {
        return;
      }

      createComment(
        {
          postId,
          body,
          userId: currentUserId,
        },
        {
          onSuccess: () => {
            setBody("");

            (ref as React.RefObject<BottomSheet>).current?.close();
          },
        },
      );
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    const validate = () => {
      const newErrors: Errors = {};

      if (!body.trim()) {
        newErrors.body = "Body is required";
      } else if (body.trim().length < 3) {
        newErrors.body = "Body must be at least 3 characters";
      } else if (body.trim().length > 100) {
        newErrors.body = "Body must be no more than 100 characters";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        handleStyle={containerStyle.backgroundColor}
        handleIndicatorStyle={containerStyle.surfaceColor}
      >
        <BottomSheetView
          style={[containerStyle.formContainer, containerStyle.backgroundColor]}
        >
          <Text style={[typographyStyle.h3, typographyStyle.textColor1]}>
            New Comment
          </Text>

          <BottomSheetTextInput
            placeholder="Comment"
            placeholderTextColor={COLORS.text1}
            value={body}
            onChangeText={setBody}
            multiline
            style={[inputStyle.base, inputStyle.textArea]}
          />
          {errors.body && (
            <Text style={typographyStyle.error}>{errors.body}</Text>
          )}

          <Pressable
            onPress={handleCreate}
            style={[
              buttonStyle.base,
              buttonStyle.normal,
              buttonStyle.secondary,
            ]}
            disabled={isPending}
          >
            <Text style={buttonStyle.textNormal}>
              {isPending ? "Creating..." : "Create"}
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

CreateCommentBottomSheet.displayName = "CreateCommentBottomSheet";

export default CreateCommentBottomSheet;
