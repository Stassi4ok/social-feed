// styles/input.ts

import { StyleSheet } from "react-native";

import { COLORS } from "./colors";
import { RADIUS, SPACING } from "./layout";

export const inputStyle = StyleSheet.create({
  base: {
    minHeight: 48,
    maxHeight: 48,
    flex: 1,

    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,

    backgroundColor: COLORS.surface,

    color: COLORS.text1,

    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  focused: {
    borderColor: COLORS.primary,
  },

  error: {
    borderColor: COLORS.text2,
  },

  disabled: {
    backgroundColor: COLORS.background,
    opacity: 0.6,
  },

  placeholder: {
    color: COLORS.text1,
  },

  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});
