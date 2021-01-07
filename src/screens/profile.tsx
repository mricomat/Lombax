import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontStyle } from "src/assets";
import GameList from "src/components/gameList";
import Header from "src/components/headers";
import AvatarItem from "src/components/items/avatarItem";
import useNavigation from "src/hooks/use-navigation";
import { getMainGame } from "src/services/games";
import IGame from "src/types/api";
import { getImageUrl, getCoverUrl } from "src/utils/image";
import DeviceUtils from "src/utils/device";
import useRootContext from "src/hooks/use-context";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "57%",
    position: "absolute",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  background: {
    backgroundColor: colors.grey50,
    opacity: 0.65,
    width: "100%",
    height: "57%",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  username: {
    color: colors.grey65,
    ...fontStyle.menuLabel,
  },
  interests: {
    color: colors.white,
    ...fontStyle.headerTitle,
    fontSize: 14,
    marginTop: 2,
  },
  infoBar: {
    height: 70,
    backgroundColor: colors.grey50,
    width: "100%",
    borderRadius: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 25,
    elevation: 3,
  },
  description: {
    textAlign: "center",
    color: colors.blue20,
    ...fontStyle.titleMed,
    marginTop: 6,
    lineHeight: 20,
    flexWrap: "wrap",
  },
  titleTab: {
    color: colors.grey30,
    ...fontStyle.menuLabel,
  },
  numberTab: {
    color: colors.white,
    ...fontStyle.titleBold,
    fontSize: 14,
    marginTop: 5,
  },
});

const ProfileScreen: () => JSX.Element = () => {
  const {
    langState: [lang],
    user: [user],
  } = useRootContext();

  const [recentGames, setRecentGames] = useState<IGame[]>([]);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightHeader = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [43, 80],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height * 0.57, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    mainGameService();
  }, []);

  const mainGameService = async () => {
    const mainGamesResult = await getMainGame();
    setRecentGames(mainGamesResult.data);
  };

  const renderBackground = () => {
    return (
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Animated.Image
          source={{ uri: getCoverUrl(user.backgroundId) }}
          resizeMode={"cover"}
          style={[styles.image, { height: heightBack }]}
        />
        <Animated.View style={[styles.background, { height: heightBack }]} />
      </View>
    );
  };

  const renderTopInfo = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.username}>{user.username}</Text>
        <AvatarItem styleComponent={{ marginTop: 14 }} data={user.coverId} />
        <Text style={[styles.username, { marginTop: 12 }]}>Interested in</Text>
        <Text
          style={styles.interests}
        >{`${user.interests[0].name}  ${user.interests[1].name}  ${user.interests[2].name}`}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {user.summary}
        </Text>
      </View>
    );
  };

  const renderInfoBar = () => {
    return (
      <View style={styles.infoBar}>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Reviews</Text>
          <Text style={styles.numberTab}>{user.reviews.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Games</Text>
          <Text style={styles.numberTab}>{15}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Following</Text>
          <Text style={styles.numberTab}>{user.following.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Followers</Text>
          <Text style={styles.numberTab}>{user.followers.length}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <View style={styles.infoBar}>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Diary</Text>
          <Text style={styles.numberTab}>47</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Likes</Text>
          <Text style={styles.numberTab}>15</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Playlists</Text>
          <Text style={styles.numberTab}>32</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Lists</Text>
          <Text style={styles.numberTab}>17</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFavorites = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <GameList title={"Favorites"} games={recentGames} />
        <GameList title={"Recent Activity"} games={recentGames} styleComponent={{ marginTop: 12 }} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackground()}
      <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 14 }}>
        <Header
          title={user.name}
          playIcon={false}
          heart={false}
          styleComponent={{ height: heightHeader }}
          onBackPress={() => navigation.goBack()}
          profile={true}
        />
      </Animated.View>

      <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <View style={{ paddingHorizontal: 22 }}>
          {renderTopInfo()}
          {renderInfoBar()}
        </View>

        {renderFavorites()}
        <View style={{ paddingHorizontal: 22, paddingBottom: 20 }}>{renderBottomBar()}</View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
