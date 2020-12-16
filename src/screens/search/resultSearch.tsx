import React, { useEffect, FC, useState } from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  StyleProp,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import Carousel from "react-native-snap-carousel";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

import { colors, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import Keywords from "src/components/keywords";
import DeviceUtils from "src/utils/device";
import { genresThemesInfo } from "src/constants/genres";
import IGame from "src/types/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey80,
  },
  mainItemContainer: {
    backgroundColor: colors.grey50,
    borderRadius: 15,
    height: 200,
    elevation: 3,
  },
  mainTitle: {
    marginBottom: 12,
    color: colors.white,
    ...fontStyle.titleBold,
    paddingHorizontal: 22,
  },
  mainImage: {
    height: 200,
    position: "absolute",
    borderRadius: 10,
    width: "100%",
  },
  titleMainGame: {
    marginTop: 5,
    color: colors.white,
    ...fontStyle.titleBold,
    maxWidth: DeviceUtils.deviceSize.width * 0.55,
  },
  genreContainer: {
    height: 24,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 2,
    marginEnd: 10,
  },
  genreLinear: {
    height: 24,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  mainItemWrap: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
    flex: 1,
  },
  flexrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  resultContainer: {
    backgroundColor: colors.grey50,
    borderRadius: 15,
    height: 110,
    elevation: 3,
    alignItems: "center",
    paddingHorizontal: 18,
  },
  resultWrap: {
    justifyContent: "space-between",
    flex: 1,
    height: 110,
    paddingVertical: 18,
    alignItems: "flex-start",
    marginStart: 12,
  },
  imageResult: {
    width: 60,
    height: 80,
    backgroundColor: colors.grey80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey50,
    elevation: 3,
  },
  summary: {
    ...fontStyle.titleMed,
    color: colors.grey65,
    width: DeviceUtils.deviceSize.width * 0.8,
  },
  genreResult: {
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.grey80,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 12,
    elevation: 3,
  },
});

export interface IResultSearch extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  mainResults: IGame[];
  results: IGame[];
}

const ResultSearch: FC<IResultSearch> = ({ styleComponent, mainResults, results, searchService }) => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const renderMainResult = ({ item }: any) => {
    const uri = getImageUrl(item.cover && item.cover.image_id, "t_cover_big");

    return (
      <TouchableOpacity
        style={styles.mainItemContainer}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item })}
      >
        <Image source={{ uri }} style={styles.mainImage} />
        <View style={[styles.mainImage, { backgroundColor: colors.grey80, opacity: 0.75 }]} />
        <View style={styles.mainItemWrap}>
          <View style={styles.flexrow}>
            <Text style={styles.titleMainGame} numberOfLines={1}>
              {item.name}
            </Text>
            {(item.rating || item.total_rating) && (
              <Stars rating={item.total_rating} styleComponent={{ marginStart: 20 }} />
            )}
          </View>

          <Text style={{ ...fontStyle.keyword, color: colors.grey10 }}>
            {moment.unix(item.release_dates && item.release_dates[0].date).format("MMM DD, YYYY")}
          </Text>

          <Text style={styles.summary} numberOfLines={3}>
            {item.summary}
          </Text>
          <Keywords words={item.keywords} lenght={22} />
          <View style={{ height: 25, flexDirection: "row", width: "100%" }}>
            {item.genres && item.genres.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.genres.map(i => {
                  return renderGenre(i);
                })}
              </ScrollView>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGenre = item => {
    const genre = genresThemesInfo.find(gen => gen.id === item.id);
    return (
      <TouchableOpacity style={styles.genreContainer}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 1 }}
          style={styles.genreLinear}
          colors={[
            genre.colorLeft ? genre.colorLeft : colors.grey80,
            genre.colorRight ? genre.colorRight : colors.grey80,
          ]}
        >
          <Text style={{ ...fontStyle.keyword, color: colors.white, marginBottom: 1 }}>{genre.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderResults = ({ item }) => {
    const uri = getImageUrl(item.cover && item.cover.image_id, "t_cover_big");
    return (
      <TouchableOpacity
        style={[styles.resultContainer, { marginBottom: 10 }]}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item })}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri }} style={styles.imageResult} />
          <View style={styles.resultWrap}>
            <Text style={{ ...fontStyle.titleMed, color: colors.white, maxWidth: "100%" }} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
              <Text style={{ ...fontStyle.keyword, color: colors.grey10 }}>
                {moment.unix(item.release_dates && item.release_dates[0].date).format("MMM DD, YYYY")}
              </Text>
              {(item.rating || item.total_rating) && (
                <Stars rating={item.total_rating} styleComponent={{ marginBottom: 2, marginStart: 10 }} />
              )}
            </View>

            {item.genres && item.genres.length > 0 && (
              <View style={{ height: 25, flexDirection: "row", width: "100%" }}>
                <ScrollView horizontal style={{ height: 26 }} showsHorizontalScrollIndicator={false}>
                  {item.genres.map(i => {
                    return (
                      <TouchableOpacity style={styles.genreResult}>
                        <Text style={{ ...fontStyle.keyword, color: colors.white, marginBottom: 2 }}>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onEndReached = ({ distanceFromEnd }) => {
    console.log("called", distanceFromEnd);
    if (distanceFromEnd < 0) return;
    searchService && searchService(results?.length - 1);
  };

  return (
    <View style={[styles.container, styleComponent]}>
      {mainResults.length > 0 && (
        <>
          <Text style={styles.mainTitle}>Most popular</Text>
          <Carousel
            data={mainResults}
            inactiveSlideScale={0.95}
            renderItem={renderMainResult}
            sliderWidth={DeviceUtils.deviceSize.width}
            loop
            itemWidth={DeviceUtils.deviceSize.width - 44}
          />
        </>
      )}
      <Text style={[styles.mainTitle, { marginTop: 15 }]}>Results</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={results}
          renderItem={renderResults}
          contentContainerStyle={{ paddingHorizontal: 22, marginBottom: 110 }}
          onEndReached={onEndReached}
          initialNumToRender={7}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
};

export default ResultSearch;
