import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import { colors, fontStyle } from "src/assets";
import ProfileIcon from "src/assets/icons/profile";
import FeedIcon from "src/assets/icons/logo.svg";
import FeedWhiteIcon from "src/assets/icons/logo_white.svg";
import SearchIcon from "src/assets/icons/search";
import SoonIcon from "src/assets/icons/soon";
import ReviewsIcon from "src/assets/icons/reviews";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.grey50,
    flex: 1,
    height: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  touchableContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey50,
    borderRadius: 20,
  },
  touchable: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: colors.white,
    ...fontStyle.menuLabel,
    marginTop: 3,
  },
  logoContainer: {
    borderRadius: 100,
    height: 75,
    backgroundColor: colors.grey50,
    width: 75,
    alignItems: "center",
    marginBottom: 20,
  },
});

const renderIcon = (label: string, isFocused: boolean, onPress) => {
  switch (label) {
    case "Soon":
      return <SoonIcon fill={isFocused ? colors.bluer70 : colors.white} />;
    case "Search":
      return <SearchIcon fill={isFocused ? colors.bluer70 : colors.white} />;
    case "Feed":
      return isFocused ? (
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={onPress}>
            <FeedIcon style={{ transform: [{ scale: 0.9 }], marginTop: 6 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={[styles.logoContainer, { height: 70, width: 70 }]}>
          <TouchableOpacity onPress={onPress}>
            <FeedWhiteIcon style={{ transform: [{ scale: 0.75 }], marginTop: 8 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    case "Reviews":
      return <ReviewsIcon fill={isFocused ? colors.bluer70 : colors.white} />;
    case "Profile":
      return <ProfileIcon fill={isFocused ? colors.bluer70 : colors.white} />;
  }
};

const MainTab = ({ state, descriptors, navigation }) => {
  const safeAreaInsets = useSafeArea();

  return (
    <>
      <View style={{ flexDirection: "row", backgroundColor: colors.grey80 }}>
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <View style={styles.touchableContainer} key={route.key}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  disabled={index === 2}
                >
                  {renderIcon(label, isFocused, onPress)}
                  {label !== "Feed" && (
                    <Text style={[styles.label, { color: isFocused ? colors.bluer70 : colors.white }]}>{label}</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          height: safeAreaInsets.bottom,
          backgroundColor: colors.black,
        }}
      />
    </>
  );
};

export default MainTab;
