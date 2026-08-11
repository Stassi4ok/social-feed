import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { RADIUS, SPACING } from "./layout";

export const buttonStyle = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  normal: {
    minHeight: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  small: {
    minHeight: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.secondary,
  },

  textNormal: {
    color: COLORS.text1,
    fontSize: 16,
    fontWeight: "600",
  },
  textSmall: {
    color: COLORS.text1,
    fontSize: 12,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.7,
  },

  disabled: {
    opacity: 0.5,
  },
});
