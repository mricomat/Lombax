import React, { FC } from "react";
import { View, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from "react-native";

import { colors } from "src/assets";
import DeviceUtils from "src/utils/device";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export interface ISkeleton extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
}

const Skeleton: FC<ISkeleton> = ({ styleComponent }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        position: "absolute",
        backgroundColor: colors.grey80,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ backgroundColor: colors.grey50, width: "65%", height: 125, borderRadius: 15, marginTop: "40%" }} />
      <View
        style={{
          backgroundColor: colors.grey50,
          width: DeviceUtils.deviceSize.width - 44,
          height: 25,
          borderRadius: 15,
          marginTop: 18,
        }}
      />
      <View style={{ backgroundColor: colors.grey50, width: "30%", height: 25, borderRadius: 15, marginTop: 14 }} />
      <View
        style={{
          backgroundColor: colors.grey50,
          width: "40%",
          height: 15,
          borderRadius: 15,
          marginTop: 40,
          alignSelf: "flex-start",
          marginHorizontal: 22,
        }}
      />
      <View style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 22, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: colors.grey50,
            width: "30%",
            height: 145,
            borderRadius: 15,
            marginEnd: 12,
          }}
        />
        <View
          style={{
            backgroundColor: colors.grey50,
            width: "30%",
            height: 145,
            borderRadius: 15,
            marginEnd: 12,
          }}
        />
        <View
          style={{
            backgroundColor: colors.grey50,
            width: "30%",
            height: 145,
            borderRadius: 15,
            marginEnd: 12,
          }}
        />
      </View>
    </View>
  );
};

export default Skeleton;
