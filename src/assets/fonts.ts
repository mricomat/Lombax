import { StyleSheet } from "react-native";

export const fonts = {
  robotoBlack: "Roboto-Black",
  robotoBold: "Roboto-Bold",
  robotoRegular: "Roboto-Regular",
  robotoMedium: "Roboto-Medium",
};

export default StyleSheet.create({
  menuLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.robotoMedium,
  },
  keyword: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.robotoBold,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.robotoBold,
  },
  bigTitle: {
    fontSize: 35,
    lineHeight: 40,
    fontFamily: fonts.robotoBold,
  },
  titleBold: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fonts.robotoBold,
  },
  titleMed: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.robotoMedium,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.robotoBold,
  },
  genre: {
    fontFamily: fonts.robotoBold,
    fontSize: 20,
  },
});
