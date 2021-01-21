import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontStyle } from "src/assets";
import GameList from "src/components/gameList";
import Header from "src/components/headers";
import AvatarItem from "src/components/items/avatarItem";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getMainGame } from "src/services/games";
import IGame, { IUser } from "src/types/api";
import { getImageUrl, getCoverUrl } from "src/utils/image";
import { follow, unFollow } from "src/services/users";
import DeviceUtils from "src/utils/device";
import useRootContext from "src/hooks/use-context";
import { getUser } from "src/services/users";

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
    fontSize: 14,
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

const UserProfile: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();
  const [favorites, setFavorites] = useState<any[]>([{}, {}, {}, {}]);
  const [userPr, setUserPr] = useState<IUser>(route.params && route.params.user);
  const [diary, setDiary] = useState<any[]>([{}, {}, {}, {}]);
  const [isFollow, setIsFollow] = useState<boolean>(user.following.findIndex(item => item === userPr.id) !== -1);
  const [following, setIsFollowing] = useState<boolean>(
    userPr.following && userPr.following.findIndex(item => item === user.id) !== -1
  );
  const [heightView, setHeightView] = useState<number>(DeviceUtils.deviceSize.height * 0.6);

  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  const interests =
    userPr.interests && userPr.interests.length !== 0
      ? `${userPr.interests[0].name}  ${userPr.interests[1].name}  ${userPr.interests[2].name}`
      : "";

  const gamesPlayed = userPr.counts && userPr.counts.gamesCount;

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
    outputRange: [heightView, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await getUser(userPr.id);
    if (!res.error) {
      setUserPr(res.data.user);
    }
  };

  useEffect(() => {
    let newFavs = [...favorites];
    const userFavs: any[] = userPr.favorites || [];
    userFavs.map((item, index) => {
      newFavs[index] = {
        id: item.id,
        cover: {
          image_id: item.imageId,
        },
      };
    });
    setFavorites([...newFavs]);
  }, [userPr.favorites]);

  useEffect(() => {
    let newDiary = [...diary];
    const userDiary: any[] = userPr.diary || [];
    userDiary.map((item, index) => {
      newDiary[index] = {
        id: item.id,
        cover: {
          image_id: item.game.imageId,
        },
        diary: {
          review: item.review,
          gameFeel: item.gameFeel,
        },
      };
    });
    setDiary([...newDiary]);
  }, [userPr.diary]);

  const renderBackground = () => {
    return (
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Animated.Image
          source={{ uri: getCoverUrl(userPr.backgroundId) }}
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
        <Text style={styles.username}>{userPr.username}</Text>
        <AvatarItem styleComponent={{ marginTop: 14 }} data={userPr.coverId} />
        <Text style={[styles.username, { marginTop: 12 }]}>Interested in</Text>
        <Text style={styles.interests}>{interests}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {userPr.description}
        </Text>
      </View>
    );
  };

  const renderInfoBar = () => {
    return (
      <View style={styles.infoBar}>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 5, borderRadius: 15 }}
          onPress={() =>
            userPr.counts && userPr.counts.reviewsCount !== 0
              ? navigation.navigate(routeNames.ReviewsList, { user: userPr })
              : {}
          }
        >
          <Text style={styles.titleTab}>Reviews</Text>
          <Text style={styles.numberTab}>{(userPr.counts && userPr.counts.reviewsCount) || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 5, borderRadius: 15 }}
          onPress={() =>
            userPr.counts && userPr.counts.gamesCount !== 0
              ? navigation.navigate(routeNames.GameFeels, { user: userPr })
              : {}
          }
        >
          <Text style={styles.titleTab}>Games</Text>
          <Text style={styles.numberTab}>{gamesPlayed}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 5, borderRadius: 15 }}
          onPress={() =>
            userPr.following.length !== 0
              ? navigation.navigate(routeNames.FollowsList, { user: userPr, isFollows: true }, user.id)
              : {}
          }
        >
          <Text style={styles.titleTab}>Following</Text>
          <Text style={styles.numberTab}>{(userPr.following && userPr.following.length) || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 5, borderRadius: 15 }}
          onPress={() =>
            userPr.followers.length !== 0
              ? navigation.navigate(routeNames.FollowsList, { user: userPr, isFollows: false }, user.id)
              : {}
          }
        >
          <Text style={styles.titleTab}>Followers</Text>
          <Text style={styles.numberTab}>{(userPr.followers && userPr.followers.length) || 0}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <View style={styles.infoBar}>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Diary</Text>
          <Text style={styles.numberTab}>{(userPr.counts && userPr.counts.diaryCounts) || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 5, borderRadius: 15 }}>
          <Text style={styles.titleTab}>Likes</Text>
          <Text style={styles.numberTab}>{(userPr.counts && userPr.counts.likesCount) || 0}</Text>
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
        <GameList title={"Favorites"} games={favorites} />
      </View>
    );
  };

  const renderActivity = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <GameList title={"Recent Activity"} games={diary} activity={true} />
      </View>
    );
  };

  const onFollowPress = async () => {
    if (isFollow) {
      setIsFollow(false);
      await unFollow(user.id, userPr.id);
      const newFollows: [] = [];
      const indexFollow = user.following.indexOf(userPr.id);
      if (indexFollow > -1) {
        newFollows.splice(indexFollow, 1);
      }
      const newFollowers: [] = [];

      const indexFollwers = user.following.indexOf(user.id);
      if (indexFollwers > -1) {
        newFollowers.splice(indexFollwers, 1);
      }

      setUser({ ...user, following: [...newFollows] });
      setUserPr({ ...userPr, followers: [...newFollowers] });
    } else {
      setIsFollow(true);
      await follow(user.id, userPr.id);
      setUser({ ...user, following: [userPr.id, ...user.following] });
      setUserPr({ ...userPr, followers: [user.id, ...userPr.followers] });
    }
  };

  return (
    <View style={styles.container}>
      {renderBackground()}
      <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 14 }}>
        <Header
          title={userPr.name}
          playIcon={false}
          heart={false}
          styleComponent={{ height: heightHeader }}
          onBackPress={() => navigation.goBack()}
          profile={false}
          userProfile={true}
          isFollow={isFollow}
          following={following}
          onPressFollow={onFollowPress}
        />
      </Animated.View>

      <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <View
          style={{ paddingHorizontal: 22 }}
          onLayout={event => {
            var { height } = event.nativeEvent.layout;
            if (height !== heightView) {
              setHeightView(height + 38);
            }
          }}
        >
          {renderTopInfo()}
          {renderInfoBar()}
        </View>

        {renderFavorites()}
        {renderActivity()}
        <View style={{ paddingHorizontal: 22, paddingBottom: 20 }}>{renderBottomBar()}</View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
