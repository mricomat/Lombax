import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import moment from "moment";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getDiary } from "src/services/users";
import { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl, getImageUrl } from "src/utils/image";
import useRootContext from "src/hooks/use-context";
import { getGameStatusSource, gameStatusColors, getStatusLabel } from "src/utils/constants";
import Stars from "src/components/stars";
import RevImg from "src/assets/icons/rev.svg";
import StarImg from "src/assets/icons/star";

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
    height: 48,
    width: 48,
    borderColor: colors.grey65,
    borderWidth: 1,
  },
  itemContainer: {
    minHeight: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colors.grey50,
    elevation: 3,
    marginBottom: 12,
  },
  name: {
    ...fontStyle.titleBold,
    color: colors.white,
    justifyContent: "center",
  },
  backGameContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backGame: {
    flex: 1,
    borderRadius: 15,
  },
  opacity: {
    position: "absolute",
    opacity: 0.8,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    backgroundColor: colors.grey50,
  },
  dayContainer: {
    width: 41,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey30,
    backgroundColor: colors.grey50,
    alignSelf: "center",
    marginRight: 16,
    justifyContent: "center",
  },
  dayTitle: {
    ...fontStyle.titleBold,
    color: colors.white,
    fontSize: 15,
    justifyContent: "center",
    alignSelf: "center",
  },
  date: {
    ...fontStyle.titleMed,
    color: colors.grey10,
    marginStart: 10,
    justifyContent: "center",
  },
  gameStatusContainer: {
    position: "absolute",
    borderRadius: 50,
    height: 18,
    width: 18,
    top: -3,
    right: -2,
    backgroundColor: colors.grey50,
  },
  gameStatusImage: {
    width: 20,
    height: 20,
    marginTop: 4,
    right: 1,
  },
  statusTitle: {
    ...fontStyle.menuLabel,
    marginEnd: 10,
  },
  dateContainer: {
    borderRadius: 10,
    height: 34,
    marginBottom: 12,
    backgroundColor: colors.blue100,
    justifyContent: "center",
  },
  dateItem: {
    ...fontStyle.titleBold,
    fontSize: 14,
    color: colors.white,
    alignSelf: "center",
  },
});

const DiaryList: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [userPr, setUserPr] = useState<IUser>((route.params && route.params.user) || {});
  const [diary, setDiary] = useState<any[]>([]);
  const [stickyHeader, setStickyHeader] = useState<any[]>([]);
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
      getDiaryService();
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

  const getDiaryService = async () => {
    const { data, error } = await getDiary(userPr.id, diary.length);
    let newData: any[] = [];

    let month = diary.length > 0 ? moment(diary[0].createdAt).format("MMMM") : "";
    data.diaries.map((item, index) => {
      const monthItem = moment(item.createdAt).format("MMMM");

      if (month !== monthItem) {
        newData = [
          item,
          {
            id: item._id,
            month: monthItem,
            year: moment(item.createdAt).format("YYYY"),
            isHeader: true,
          },

          ...newData,
        ];
        month = monthItem;
      } else {
        newData = [item, ...newData];
      }
    });

    let newIndices: any[] = [];
    newData.reverse().map((item, index) => {
      if (item.isHeader) {
        newIndices[index] = index;
      }
    });

    if (!error) {
      data.count !== 0 ? setStickyHeader([...newIndices]) : setIsEnd(true);
      data.count !== 0 ? setDiary([...newData, ...diary]) : setIsEnd(true);
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

  const renderDiaryItem = ({ item }) => {
    if (item.isHeader) {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.dateItem}>{`${item.month} ${item.year}`.toUpperCase()}</Text>
        </View>
      );
    } else {
      const uri = getImageUrl(item.game.imageId, "t_cover_big");
      const uriBack = getImageUrl(item.game.backgroundId, "t_cover_big");
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate(routeNames.UserProfile, { user: { id: item._id } })}
        >
          <View style={styles.backGameContainer}>
            <Image source={{ uri: uriBack }} style={styles.backGame} />
            <View style={styles.opacity} />
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayTitle}>{moment(item.createdAt).format("D")}</Text>
            </View>
            <View>
              <Image
                source={{ uri }}
                style={[styles.cover, { borderColor: gameStatusColors[item.gameFeel.gameStatus] }]}
              />
              <View style={styles.gameStatusContainer}>
                <Image source={getGameStatusSource[item.gameFeel.gameStatus]} style={styles.gameStatusImage} />
              </View>
            </View>

            <View style={{ marginStart: 16, justifyContent: "center", flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.game.name}
                  {"  "}
                  <Text style={styles.date}>{moment(item.game.releaseDate * 1000).format("YYYY")}</Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", maxWidth: "80%" }}>
                <Text style={[styles.statusTitle, { color: gameStatusColors[item.gameFeel.gameStatus] }]}>
                  {getStatusLabel[item.gameFeel.gameStatus]}
                </Text>
                {item.review && item.review.rating !== 0 && (
                  <View style={{ marginEnd: 4, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginEnd: 2, color: colors.white, ...fontStyle.menuLabel }}>
                      {item.review.rating}
                    </Text>
                    <StarImg fill={colors.blue50} />
                  </View>
                  // <Stars rating={item.review.rating} styleComponent={{ marginEnd: 4 }} />
                )}
                {item.review && item.review.summary !== "" && <RevImg style={{ marginTop: 2, marginStart: 2 }} />}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
      getDiaryService();
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
            data={diary}
            showsVerticalScrollIndicator={false}
            renderItem={renderDiaryItem}
            onEndReachedThreshold={0.01}
            onEndReached={() => onEndReached()}
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
            stickyHeaderIndices={stickyHeader}
          />
        </View>
      )}
    </View>
  );
};

export default DiaryList;
