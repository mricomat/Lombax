import React, { FC } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  View,
  Text,
  Animated,
} from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import HeartImg from "src/assets/icons/heart";
import ArroLeftImg from "src/assets/icons/arrow_left.svg";
import GameImg from "src/assets/icons/game.svg";
import SettingsImg from "src/assets/icons/settings.svg";
import AlertImg from "src/assets/icons/alert.svg";
import { ICover } from "src/types/api";
import { gameStatusColors } from "src/utils/constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
  },
  title: {
    ...fontStyle.headerTitle,
    color: colors.white,

    alignSelf: "center",
  },
  titleContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
  },
  statusContainer: {
    position: "absolute",
    top: 6,
    right: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBack: {
    opacity: 0.2,
    borderRadius: dimensions.radiusCircle,
    width: 15,
    height: 15,
    position: "absolute",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: dimensions.radiusCircle,
    backgroundColor: colors.red100,
  },

  followContainer: {
    height: 30,
    backgroundColor: colors.grey50,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.white,
    elevation: 1,
  },
});

export interface IHeader extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  title?: string;
  onBackPress?: () => void;
  onGamePress?: () => void;
  onPressFollow?: () => void;
  onHeartPress?: () => void;
  playIcon?: boolean;
  profile?: boolean;
  heart?: boolean;
  like?: boolean;
  isFollow?: boolean;
  userProfile?: boolean;
  following?: boolean;
  gameStatus?: string;
}

const MainHeader: FC<IHeader> = ({
  styleComponent,
  onBackPress,
  title,
  playIcon = true,
  heart = true,
  profile = false,
  onGamePress,
  gameStatus,
  onHeartPress,
  onPressFollow,
  isFollow = false,
  following = false,
  userProfile,
  like,
}) => {
  const renderFollowButton = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginEnd: 10 }}>
        <TouchableOpacity
          style={[
            styles.followContainer,
            {
              marginTop: following ? 20 : 0,
              paddingHorizontal: isFollow ? 12 : 18,
              borderColor: isFollow ? colors.bluer70 : colors.white,
            },
          ]}
          onPress={onPressFollow}
        >
          <Text style={{ color: colors.white, ...fontStyle.titleMed }}>{isFollow ? "Following" : "Follow"}</Text>
        </TouchableOpacity>
        {following && <Text style={{ color: colors.grey65, ...fontStyle.menuLabel, marginTop: 2 }}>Follows you</Text>}
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, styleComponent]}>
      {profile && (
        <TouchableOpacity style={styles.circleContainer} onPress={onBackPress}>
          <View style={styles.circle} />
          <SettingsImg width={18} height={14} />
        </TouchableOpacity>
      )}
      {!profile && (
        <TouchableOpacity style={styles.circleContainer} onPress={onBackPress}>
          <View style={styles.circle} />
          <ArroLeftImg />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        {playIcon && (
          <TouchableOpacity style={[styles.circleContainer, { marginEnd: 5 }]} onPress={onGamePress}>
            <View style={styles.circle} />
            <GameImg />
            {gameStatus && (
              <View style={styles.statusContainer}>
                <View style={styles.statusBack} />
                <View style={[styles.dot, { backgroundColor: gameStatusColors[gameStatus] }]} />
              </View>
            )}
          </TouchableOpacity>
        )}
        {heart && (
          <TouchableOpacity style={styles.circleContainer} onPress={onHeartPress}>
            <View style={styles.circle} />
            <HeartImg width={17} height={13} fill={like ? colors.red70 : colors.white} />
          </TouchableOpacity>
        )}
        {profile && (
          <TouchableOpacity style={styles.circleContainer}>
            <View style={styles.circle} />
            <AlertImg width={20} height={16} />
          </TouchableOpacity>
        )}
        {userProfile && renderFollowButton()}
      </View>
    </Animated.View>
  );
};

export default MainHeader;
