// typography.ts

import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const typographyStyle = StyleSheet.create({
  // Заголовки
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },

  h2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },

  h3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },

  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h5: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 28,
  },

  // Основний текст
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },

  bodyMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },

  bodyBold: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },

  // Маленький текст
  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },

  captionMedium: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },

  small: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },

  smallMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },

  // Кнопки
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },

  buttonSmall: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },

  buttonLarge: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  error: {
    color: COLORS.errorColor,
  },
  delete: {
    color: COLORS.errorColor,
  },
  // Посилання
  link: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    textDecorationLine: "underline",
  },
  tagText: {
    color: COLORS.tagColorText,
    fontSize: 13,
    fontWeight: "600",
  },
  textColor1: {
    color: COLORS.text1,
  },
  textColor2: {
    color: COLORS.text2,
  },
  textColor3: {
    color: COLORS.text3,
  },
});
