import React, { FC, useState } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors, dimensions, fonts, fontStyle } from "src/assets";
import ArroLeftImg from "src/assets/icons/arrow_left.svg";
import DeviceUtils from "src/utils/device";

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: colors.grey80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 32,
    height: 32,
    position: "absolute",
  },
  circleContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
    marginHorizontal: 18,
  },
  title: {
    fontSize: 23,
    lineHeight: 30,
    fontFamily: fonts.robotoBold,
    color: colors.white,
    alignSelf: "center",
  },
  titleContainer: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  flexRow: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  background: {
    backgroundColor: colors.grey50,
    opacity: 0.8,
    width: "100%",
    height: "100%",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  titleDes: {
    alignSelf: "center",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 12,
    fontFamily: fonts.robotoBold,
    color: colors.white,
  },
  stepContainer: {
    width: 230,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 12,
  },
  step: {
    backgroundColor: colors.blue100,
    height: 11,
    borderRadius: 10,
    width: 65,
  },
  stepTitle: {
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 18,
    fontFamily: fonts.robotoMedium,
    color: colors.white,
  },
  itemSelection: {
    height: 30,
    borderRadius: 10,
    elevation: 3,
    marginEnd: 12,
  },
  linearGradient: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export interface IHeader extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  title?: string;
  titleDes?: string;
  stepInfo?: string;
  step?: number;
  showError?: boolean;
  onBackPress?: () => void;
  removeSelection?: () => void;
  scrollY: Animated.Value;
  selections: any[];
  background: any;
}

const RegisterHeader: FC<IHeader> = ({
  styleComponent,
  onBackPress,
  title,
  scrollY,
  titleDes,
  stepInfo,
  step = 0,
  selections = [],
  removeSelection,
  showError,
  background = require("src/assets/images/backhollow.png"),
}) => {
  const FlatListAnimated = Animated.createAnimatedComponent(FlatList);

  const heightHeader = scrollY.interpolate({
    inputRange: [10, 250],
    outputRange: [selections.length > 0 ? 220 : 185, selections.length > 0 ? 140 : 110],
    extrapolate: "clamp",
  });

  const heightHeader3 = scrollY.interpolate({
    inputRange: [10, 100],
    outputRange: [DeviceUtils.deviceSize.height, 110],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -10],
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [0, step !== 2 ? 50 : 30],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const stepOpacity = scrollY.interpolate({
    inputRange: [0, step !== 2 ? 150 : 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const desOpacity = scrollY.interpolate({
    inputRange: [0, step !== 2 ? 200 : 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderBackground = () => {
    return (
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: step !== 2 ? heightHeader : DeviceUtils.deviceSize.height,
        }}
      >
        <Animated.Image
          source={background}
          resizeMode={"cover"}
          style={[styles.image, { transform: [{ translateY: imageTranslate }] }]}
        />
        <Animated.View style={[styles.background, { transform: [{ translateY: imageTranslate }] }]} />
      </Animated.View>
    );
  };

  const renderSteps = () => {
    return (
      <Animated.View style={[styles.stepContainer, { opacity: stepOpacity }]}>
        <View style={styles.step} />
        <View style={[styles.step, { backgroundColor: step >= 1 ? colors.blue100 : colors.grey50 }]} />
        <View style={[styles.step, { backgroundColor: step === 2 ? colors.blue100 : colors.grey50 }]} />
      </Animated.View>
    );
  };

  const renderSelections = () => {
    return (
      <FlatListAnimated
        data={selections}
        renderItem={renderItemSelection}
        style={{ height: 55, transform: [{ translateY: imageTranslate }], position: "absolute", bottom: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 12, marginStart: 22, marginTop: 10 }}
      />
    );
  };

  const renderItemSelection = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemSelection} onPress={() => removeSelection(item)}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
          colors={[item.colorLeft ? item.colorLeft : "#F59B23", item.colorRight ? item.colorRight : "#7B4E12"]}
        >
          <Text style={{ ...fontStyle.placeholder, color: colors.white }}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.container, styleComponent, { height: step == 2 ? heightHeader3 : heightHeader }]}>
      {renderBackground()}
      <View style={styles.flexRow}>
        <TouchableOpacity style={styles.circleContainer} onPress={onBackPress}>
          <View style={styles.circle} />
          <ArroLeftImg />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <Animated.Text style={[styles.titleDes, { opacity: desOpacity }]}>{titleDes}</Animated.Text>
      {renderSteps()}
      <Animated.Text style={[styles.stepTitle, { opacity: scale, color: showError ? colors.red100 : colors.white }]}>
        {stepInfo}
      </Animated.Text>
      {selections.length > 0 && renderSelections()}
    </Animated.View>
  );
};

export default RegisterHeader;
