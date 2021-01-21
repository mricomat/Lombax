import moment from "moment";
import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import Stars from "src/components/stars";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getUserReviews } from "src/services/reviews";
import { IReview, IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl, getImageUrl } from "src/utils/image";

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
  reviewContainer: {
    minHeight: 150,
    borderRadius: 15,
    width: "100%",
    marginBottom: 14,
  },
  imageReview: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  opacityContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: colors.grey80,
    opacity: 0.8,
  },
  titleReview: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
});

const ReviewsList: React.FC<any> = ({ route }) => {
  const [user, setUser] = useState<IUser>((route.params && route.params.user) || {});
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [heightView, setHeightView] = useState<number>(DeviceUtils.deviceSize.height);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [10, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [heightView, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (isLoading) {
      getReviewsService();
    }
  }, []);

  const getReviewsService = async () => {
    const { data, error } = await getUserReviews(user.id, reviews.length);
    if (!error) {
      data.count !== 0 ? setReviews([...reviews, ...data.reviews]) : setIsEnd(true);
    }
    setIsLoading(false);
  };

  const renderBackground = () => {
    const uri = getCoverUrl(user.backgroundId);
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

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 14 }}>
          <Header
            title={`${user.name}'s Reviews`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderReviewItem = ({ item }) => {
    const uri = getImageUrl(item.game.imageId, "t_screenshot_big");

    return (
      <TouchableOpacity
        style={styles.reviewContainer}
        onPress={() => navigation.navigate(routeNames.ReviewDetail, { review: item })}
      >
        <Image source={{ uri }} style={styles.imageReview} />
        <View style={styles.opacityContainer} />
        <View style={{ paddingHorizontal: 18, paddingVertical: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.titleReview}>{item.game.name}</Text>
              <Text style={{ ...fontStyle.titleMed, color: colors.grey10, marginStart: 10 }}>
                {moment(item.game.releaseDate * 1000).format("YYYY")}
              </Text>
            </View>
            {item.rating !== 0 && <Stars rating={item.rating} />}
          </View>

          <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
            {item.dateFinished && (
              <Text style={{ ...fontStyle.titleMed, color: colors.grey10 }}>
                Finished at {moment(item.dateFinished * 1000).format("MMMM DD, YYYY")}
              </Text>
            )}
            {item.timeToBeat && (
              <Text style={{ ...fontStyle.titleMed, color: colors.grey10 }}>{item.timeToBeat} h</Text>
            )}
          </View>
          <Text style={{ ...fontStyle.titleMed, color: colors.grey65, marginTop: 10, fontSize: 13 }} numberOfLines={4}>
            {item.summary}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
      getReviewsService();
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
            data={reviews}
            showsVerticalScrollIndicator={false}
            renderItem={renderReviewItem}
            onEndReachedThreshold={0.01}
            onEndReached={() => onEndReached()}
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewsList;
