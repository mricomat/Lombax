import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getFollows, getFollowers, unFollow, follow } from "src/services/users";
import { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl } from "src/utils/image";
import useRootContext from "src/hooks/use-context";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    width: "100%",
    alignSelf: "center",
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    width: "100%",
    opacity: 0.75,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  cover: {
    borderRadius: 50,
    height: 50,
    width: 50,
    borderColor: colors.grey65,
    borderWidth: 0.7,
  },
  itemContainer: {
    height: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.grey50,
    elevation: 3,
  },
  name: {
    ...fontStyle.titleMed,
    color: colors.white,
    justifyContent: "center",
  },
  username: {
    ...fontStyle.titleMed,
    color: colors.grey60,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1.4,
    paddingVertical: 4,
  },
});

const FollowsList: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const isFollows = route.params && route.params.isFollows;

  const [userPr, setUserPr] = useState<IUser>((route.params && route.params.user) || {});
  const [follows, setFollows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (isLoading) {
      getFollowsService();
    }
  }, []);

  useEffect(() => {}, [user.following]);

  const renderBackground = () => {
    const uri = getCoverUrl(userPr.backgroundId);
    return (
      <Animated.View style={[styles.backgroundContainer, { height: heightBack }]}>
        <Animated.Image
          source={{ uri }}
          style={[styles.imageBackground, { height: heightBack }]}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.backColor, { height: heightBack }]} />
      </Animated.View>
    );
  };

  const getFollowsService = async () => {
    const { data, error } = isFollows
      ? await getFollows(userPr.id, follows.length)
      : await getFollowers(userPr.id, follows.length);
    if (!error) {
      const dataF = isFollows ? data.following : data.followers;
      data.count !== 0 ? setFollows([...follows, ...dataF]) : setIsEnd(true);
    }
    setIsLoading(false);
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 22 }}>
          <Header
            title={`${userPr.name}'s Follows`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderGameItem = ({ item }) => {
    const isFollowing = user.following.indexOf(item._id) !== -1;
    const uri = getCoverUrl(item.coverId);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(routeNames.UserProfile, { user: { id: item._id } })}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri }} style={styles.cover} />
          <View style={{ marginStart: 16, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.followButton, { borderColor: isFollowing ? colors.blue50 : colors.white }]}
          onPress={() => manageFollowPress(item)}
        >
          <Text style={{ ...fontStyle.titleMed, color: colors.white }}>{isFollowing ? "Following" : "Follow"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const manageFollowPress = async (item: any) => {
    const followingIndex = user.following.indexOf(item._id);
    if (followingIndex !== -1) {
      const newFollows: [] = [];
      if (followingIndex > -1) {
        newFollows.splice(followingIndex, 1);
      }
      setUser({ ...user, following: [...newFollows] });
      await unFollow(user.id, item._id);
    } else {
      setUser({ ...user, following: [item._id, ...user.following] });
      await follow(user.id, item._id);
    }
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
      getFollowsService();
    }
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      {isLoading && (
        <View style={{ flex: 1, alignItems: "center", marginBottom: 100 }}>
          <PacmanIndicator color="white" size={40} />
        </View>
      )}
      {!isLoading && (
        <View style={{ flex: 1 }}>
          <Animated.FlatList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
            data={follows}
            showsVerticalScrollIndicator={false}
            renderItem={renderGameItem}
            onEndReachedThreshold={0.01}
            onEndReached={() => onEndReached()}
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default FollowsList;
