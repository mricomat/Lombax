import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList, Animated } from "react-native";
import moment from "moment";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { StackActions } from "@react-navigation/native";

import colors, { gradients } from "src/assets/colors";
import { dimensions, fontStyle } from "src/assets";
import Header from "src/components/headers";
import IGame, { IDataItem } from "src/types/api";
import DeviceUtils from "src/utils/device";
import Button from "src/components/buttons";
import UserImg from "src/assets/icons/profile";
import ArroLeftImg from "src/assets/icons/arrow_left.svg";
import PlayImg from "src/assets/icons/game.svg";
import NotificationsImg from "src/assets/icons/alert.svg";
import PictureImg from "src/assets/icons/picture.svg";
import BinImg from "src/assets/icons/bin.svg";
import LegalImg from "src/assets/icons/legal.svg";
import { getCoverUrl } from "src/utils/image";
import useRootContext from "src/hooks/use-context";
import { defUser } from "src/utils/defForm";
import { deleteToken } from "src/services/fetch";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.6,
  },
  titleItem: {
    ...fontStyle.titleMed,
    color: colors.white,
    marginStart: 18,
  },
  itemContainer: {
    width: "100%",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.grey50,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 28,
    height: 28,
    position: "absolute",
  },
  circleContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
  },
  itemInfoContainer: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    alignSelf: "center",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  opacity: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 10,
    opacity: 0.4,
    backgroundColor: colors.grey50,
  },
});

const SettingsScreen: React.FC<any> = ({}) => {
  const {
    user: [user, setUser],
  } = useRootContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const logOutService = () => {
    setIsLoading(true);
    deleteToken();
    setUser(defUser);
    navigation.dispatch(StackActions.replace(routeNames.LoginScreen, {}));
    setIsLoading(false);
  };

  const renderBackground = () => {
    return (
      <View style={styles.backgroundContainer}>
        <Image
          source={require("src/assets/images/backhollow.png")}
          style={[styles.imageBackground]}
          resizeMode={"cover"}
        />
        <View style={[styles.backColor]} />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <View style={{ paddingHorizontal: 18 }}>
          <Header
            title={"Settings"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </View>
      </>
    );
  };

  const renderItem = (title: string, Icon: any, onPress: any, size: number, type: string = "normal") => {
    return (
      <TouchableOpacity style={[styles.itemContainer, type === "delete" && { backgroundColor: colors.red80 }]}>
        {(type === "cover" || type === "background") && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: getCoverUrl(type === "cover" ? user.coverId : user.backgroundId) }}
            />
            <View style={styles.opacity} />
          </View>
        )}
        <View style={styles.itemInfoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon width={size} style={{}} />
            <Text style={styles.titleItem}>{title}</Text>
          </View>
          {renderArrow(onPress)}
        </View>
      </TouchableOpacity>
    );
  };

  const renderArrow = (onPress: any) => {
    return (
      <TouchableOpacity style={styles.circleContainer} onPress={onPress}>
        <View style={styles.circle} />
        <ArroLeftImg style={{ transform: [{ rotate: "180 deg" }] }} width={14} />
      </TouchableOpacity>
    );
  };

  const renderLogOut = () => {
    return (
      <View style={{ paddingTop: 40, paddingBottom: 30 }}>
        <Button
          title={"Log out"}
          onPress={() => logOutService()}
          backgroundColor={colors.darkBlue}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22 }}>
        {renderItem("Edit profile info", UserImg, {}, 18)}
        {renderItem("Edit interests", PlayImg, {}, 18)}
        {renderItem("Notifications", NotificationsImg, {}, 20)}
        {renderItem("Change avatar", PictureImg, {}, 16, "cover")}
        {renderItem("Change background", PictureImg, {}, 16, "background")}
        {renderItem("Legal policy", LegalImg, {}, 16)}
        {renderItem("Delete account", BinImg, {}, 14, "delete")}
        {renderLogOut()}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
