import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Animated, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";
import lodash from "lodash";

import { colors, dimensions, fontStyle } from "src/assets";
import SearchInput from "src/components/inputs/search";
import InterestList from "src/components/interestList";
import { genresThemesInfo } from "src/constants/genres";
import { platformsWithImage } from "src/constants/platforms";
import { searchGames, searchHighGames } from "src/services/games";
import FilterImg from "src/assets/icons/filter.svg";
import LoopImg from "src/assets/icons/loop.svg";
import EmptyContainer from "src/components/empty";
import { PacmanIndicator } from "react-native-indicators";
import ResultSearch from "src/screens/search/resultSearch";
import IGame from "src/types/api";
import DeviceUtils from "src/utils/device";
import FiltersModal from "src/components/modals/filtersModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey80,
  },
  title: {
    alignSelf: "center",
    color: colors.white,
    ...fontStyle.bigTitle,
    marginTop: 50,
  },
  slide1: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  linearGradient: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSelection: {
    height: 30,
    borderRadius: 10,
    elevation: 3,
    marginEnd: 12,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent,
    width: "100%",
    flexDirection: "row",
  },
  button: {
    padding: 10,
    height: 60,
    width: 60,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: dimensions.radiusCircle,
    borderWidth: 5,
    borderColor: colors.grey80,
  },
});

const screenWitdh = DeviceUtils.deviceSize.width;

const SearchScreen = ({}) => {
  const [index, setIndex] = useState(1);
  const [selections, setSelections] = useState<any[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScrollEnabled, setIsScrollEnable] = useState<boolean>(true);
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IGame[]>([]);
  const [highResult, setHighResult] = useState<IGame[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollView = React.createRef();

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -90],
    extrapolate: "clamp",
  });

  const marginTitleTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -10],
    extrapolate: "clamp",
  });

  const scaleTitle = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (textValue.length > 0 && isScrollEnabled) {
      initAnimation();
    }
  }, [textValue]);

  const initAnimation = () => {
    Animated.timing(scrollY, {
      toValue: 220,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsScrollEnable(false));
  };

  const removeAnimation = () => {
    setIsScrollEnable(true);
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const searchService = async () => {
    initAnimation();
    setIsLoading(true);
    const result = await searchGames({ selections, name: textValue });
    const highGamesRes = await searchHighGames({ selections, name: textValue });
    console.log("SEARCH", result, highGamesRes);
    setHasSearch(true);
    setSearchResult(lodash.uniqBy([...result.data], "id"));
    setHighResult(lodash.uniqBy([...highGamesRes.data], "id"));
    setIsLoading(false);
  };

  const onEndReached = async (offset: number) => {
    const result = await searchGames({ selections, name: textValue, offset });
    setHasSearch(true);
    setSearchResult(lodash.uniqBy([...searchResult, ...result.data], "id"));
  };

  const renderHeader = () => {
    return (
      <View style={{ paddingHorizontal: 22 }}>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ scale: scaleTitle }, { translateY: marginTitleTop }], opacity: isScrollEnabled ? 1 : 0 },
          ]}
        >
          Search
        </Animated.Text>
      </View>
    );
  };

  const renderItemSelection = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemSelection} onPress={() => removeSelection(item)}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
          colors={[item.colorLeft ? item.colorLeft : "#F59B23", item.colorRight ? item.colorRight : "#7B4E12"]}
        >
          <Text style={{ ...fontStyle.placeholder, color: colors.white }}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderSelections = () => {
    return (
      <FlatList
        data={selections}
        renderItem={renderItemSelection}
        style={{ marginTop: 20, height: 48 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginStart: 22, alignItems: "center", paddingBottom: 12 }}
      />
    );
  };

  const setNewSelection = item => {
    isScrollEnabled && initAnimation();
    setSelections(lodash.uniqBy([...selections, item], "name"));
  };

  const removeSelection = item => {
    const newItems = selections.filter(sel => sel.name !== item.name);
    setSelections(lodash.uniqBy([...newItems], "name"));
    if (newItems.length === 0) {
      !isScrollEnabled && removeAnimation();
      setHasSearch(false);
      setSearchResult([]);
    }
  };

  const renderButtons = () => {
    const hasLoop = textValue.length > 0 || selections.length > 0;
    return (
      <>
        <TouchableOpacity
          style={[styles.button, { left: hasLoop ? screenWitdh * 0.33 : undefined }]}
          onPress={() => setShowModal(true)}
        >
          <FilterImg />
        </TouchableOpacity>
        {hasLoop && (
          <TouchableOpacity
            style={[styles.button, { right: hasLoop ? screenWitdh * 0.33 : undefined }]}
            onPress={() => searchService()}
          >
            <LoopImg />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const resetInput = () => {
    setSelections([]);
    setHasSearch(false);
    setSearchResult([]);
    setTextValue("");
    removeAnimation();
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Animated.View style={{ transform: [{ translateY: isScrollEnabled ? marginTop : -90 }], marginTop: 25 }}>
        <View style={{ paddingHorizontal: 22 }}>
          <SearchInput
            value={textValue}
            onChangeText={text => setTextValue(text)}
            isSearch={textValue.length > 0 || selections.length > 0}
            onPressCancel={resetInput}
            onBlurCall={() => {
              if (textValue.length === 0 && !isScrollEnabled && !hasSearch) {
                removeAnimation();
              }
            }}
          />
        </View>
        {selections.length > 0 && renderSelections()}
        <Animated.ScrollView
          ref={scrollView}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {!isLoading && hasSearch && searchResult.length > 0 && (
            <ResultSearch
              mainResults={highResult}
              results={searchResult}
              styleComponent={{ marginTop: 12 }}
              searchService={onEndReached}
            />
          )}
          {!isLoading && hasSearch && searchResult.length === 0 && <EmptyContainer styleComponent={{ height: 400 }} />}

          {isLoading ? (
            <View style={{ height: 400 }}>
              <PacmanIndicator color="white" size={30} />
            </View>
          ) : (
            !hasSearch && (
              <Swiper
                style={[{ backgroundColor: colors.grey80 }, index === 1 ? { height: 2000 } : { height: 700 }]}
                index={index}
                showsHorizontalScrollIndicator={false}
                onIndexChanged={index => setIndex(index)}
              >
                <View style={[styles.slide1, { marginTop: selections.length === 0 ? 20 : 10 }]}>
                  <InterestList
                    data={platformsWithImage}
                    styleComponent={{}}
                    title={"Platforms"}
                    onPressItem={item => setNewSelection(item)}
                  />
                </View>
                <View style={[styles.slide1, { marginTop: selections.length === 0 ? 20 : 10 }]}>
                  <InterestList
                    data={genresThemesInfo}
                    styleComponent={{}}
                    title={"Genres & Themes"}
                    onPressItem={item => setNewSelection(item)}
                  />
                </View>
              </Swiper>
            )
          )}
        </Animated.ScrollView>
      </Animated.View>

      {renderButtons()}
      <FiltersModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default SearchScreen;
