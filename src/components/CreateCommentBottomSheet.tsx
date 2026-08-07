import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { useCreateComment } from '@/hooks/comments/mutations/useCreateComment';

type Props = {
  postId: number;
  currentUserId: number;
};

const CreateCommentBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ postId, currentUserId }, ref) => {
    const snapPoints = useMemo(() => ['45%'], []);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { mutate: createComment, isPending } = useCreateComment();

    const handleCreate = () => {
      if (!title.trim() || !body.trim()) {
        return;
      }

      createComment(
        {
          postId,
          title,
          body,
          userId: currentUserId,
        },
        {
          onSuccess: () => {
            setTitle('');
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
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>New Comment</Text>

          <BottomSheetTextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <BottomSheetTextInput
            placeholder="Comment"
            value={body}
            onChangeText={setBody}
            multiline
            style={[styles.input, styles.textArea]}
          />

          <Button
            title={isPending ? 'Creating...' : 'Create'}
            onPress={handleCreate}
            disabled={isPending}
          />
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