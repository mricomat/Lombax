import React, { useState } from "react";
import { Animated, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import AgendaImg from "src/assets/icons/agenda.svg";
import GameImg from "src/assets/icons/game.svg";
import HeartImg from "src/assets/icons/heart";
import Button from "src/components/buttons";
import Header from "src/components/headers";
import Input from "src/components/inputs/simple";
import Stars from "src/components/stars";
import useNavigation from "src/hooks/use-navigation";
import IGame from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";

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
    opacity: 0.7,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  cover: {
    borderRadius: 10,
    height: 170,
    width: 130,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
  dateGame: {
    marginStart: 12,
    ...fontStyle.titleMed,
    color: colors.grey60,
  },
});

const NewReviewScreen: React.FC<any> = ({ route }) => {
  const [game, setGame] = useState<IGame>((route.params && route.params.game) || {});
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  //const [scrollY, setScrollY] = useState<any>(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height * 0.6, 80],
    extrapolate: "clamp",
  });

  const renderBackground = () => {
    const uri = getImageUrl(game.screenshots && game.screenshots[0].image_id, "t_screenshot_big");
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
            title={"New Review"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderCover = () => {
    const uri = getImageUrl(game.cover && game.cover.image_id, "t_cover_big");
    return <Image source={{ uri }} style={styles.cover} resizeMode={"contain"} />;
  };

  const renderInfo = () => {
    return (
      <View style={{ maxWidth: "52%" }}>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.title}>
            {game.name} <Text style={styles.dateGame}>2017</Text>
          </Text>
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            placeholder={"Date finished"}
            styleContent={{ marginTop: 16 }}
            isError={false}
            RightIcon={AgendaImg}
          />
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            placeholder={"Time to beated"}
            styleContent={{ marginTop: 14 }}
            RightIcon={GameImg}
          />
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
            <Stars rating={90} width={25} height={21} />
            <HeartImg width={22} height={18} style={{ marginStart: 16, marginTop: 1 }} fill={colors.grey65} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, paddingHorizontal: 22 }}>
            {renderInfo()}
            {renderCover()}
          </View>
          <View style={{ paddingHorizontal: 22, flex: 1 }}>
            <Input
              styleContent={{ marginTop: 20 }}
              value={value2}
              onChangeText={text => setValue2(text)}
              placeholder={"Add Review"}
              isDescription={true}
            />
            <Button title={"Publish"} style={{ marginTop: 40, marginBottom: 20 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewReviewScreen;
