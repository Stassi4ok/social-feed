import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useCreateComment } from '@/hooks/comments/mutations/useCreateComment';

import { buttonStyle, containerStyle, inputStyle, typographyStyle } from '@/styles';
type Props = {
  postId: number;
  currentUserId: number;
};

const CreateCommentBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ postId, currentUserId }, ref) => {
    const snapPoints = useMemo(() => ['45%'], []);

    const [body, setBody] = useState('');

    const { mutate: createComment, isPending } = useCreateComment();

    const handleCreate = () => {
      if (!body.trim()) {
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
            setBody('');

            (ref as React.RefObject<BottomSheetModal>).current?.close();
          },
        }
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
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetView style={[containerStyle.content, containerStyle.formContainer]}>
          <Text style={typographyStyle.h3}>New Comment</Text>

          <BottomSheetTextInput
            placeholder="Comment"
            value={body}
            onChangeText={setBody}
            multiline
            style={[inputStyle.base, inputStyle.textArea]}
          />

          <Pressable
                onPress={handleCreate}
                style={[
                  buttonStyle.base,
                  buttonStyle.normal,
                  buttonStyle.create,
                ]}
                disabled={isPending}
              >
                <Text style={buttonStyle.textNormal}>
                  {isPending ? 'Creating...' : 'Create'}
                </Text>
              </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

CreateCommentBottomSheet.displayName = 'CreateCommentBottomSheet';

export default CreateCommentBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});