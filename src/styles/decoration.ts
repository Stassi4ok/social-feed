import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { RADIUS, SPACING } from "./layout";
export const decorationStyle = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },
  tag: {
    backgroundColor: COLORS.tagColor,
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.avatarColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
});
