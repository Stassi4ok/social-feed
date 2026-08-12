import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { RADIUS, SPACING } from "./layout";

export const containerStyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    gap: SPACING.sm,
  },

  content: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    padding: 16,
    paddingBottom: 30,
    gap: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.xs,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  formContainer: {
    flex: 1,
    gap: SPACING.sm,
    padding: SPACING.sm,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.sm,
  },
  backgroundColor: {
    backgroundColor: COLORS.background,
  },
  surfaceColor: {
    backgroundColor: COLORS.surface,
  },
  header: {
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
