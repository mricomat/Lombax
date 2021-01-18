import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import AbandonedImg from "src/assets/images/abandoned.png";
import BeatenImg from "src/assets/images/beaten.png";
import CompletedImg from "src/assets/images/completed.png";
import PlayingImg from "src/assets/images/playing2.png";
import WantPlayImg from "src/assets/images/wantplay.png";
import Button from "src/components/buttons";
import Header from "src/components/headers";
import useRootContext from "src/hooks/use-context";
import useNavigation from "src/hooks/use-navigation";
import IGame, { IGameFeel } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { postGameFeel } from "src/services/game";
import { GameStatus as GameTypes } from "src/types/api";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    height: DeviceUtils.deviceSize.height,
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    height: DeviceUtils.deviceSize.height,
    width: "100%",
    alignSelf: "center",
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    height: DeviceUtils.deviceSize.height,
    width: "100%",
    opacity: 0.75,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  itemTitle: {
    ...fontStyle.titleMed,
    color: colors.white,
    alignSelf: "center",
    marginTop: -70,
  },
  selectedBack: {
    width: 92,
    height: 92,
    backgroundColor: colors.disabled,
    opacity: 0.15,
    position: "absolute",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 5,
  },
});

const GameStatus: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [game] = useState<IGame>(route.params && route.params.game);
  const [selected, setSelected] = useState<any>(0);
  const [gameFeel] = useState<IGameFeel>(route.params && route.params.gameFeel);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.gameFeel) {
      setSelected(route.params.gameFeel.gameStatus);
    }
  }, []);

  const renderBackground = () => {
    return (
      <Animated.View style={[styles.backgroundContainer]}>
        <Animated.Image
          source={require("src/assets/images/backhollow.png")}
          style={[styles.imageBackground]}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.backColor]} />
      </Animated.View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: 10, paddingHorizontal: 22 }}>
          <Header
            title={"Game Status"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const saveStatus = async () => {
    setIsLoading(true);

    const result = await postGameFeel(user.id, game, gameFeel.like, selected);

    if (!result.error) {
      route.params.setGameFeel(result.data.gameFeel);
      navigation.goBack();
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <View style={{ paddingHorizontal: 22, flex: 1 }}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => setSelected(GameTypes.WantPlay)}>
            {selected === GameTypes.WantPlay && <View style={styles.selectedBack} />}
            <Image source={PlayingImg} style={{ transform: [{ scale: 0.8 }], marginStart: 2 }} />
            <Text style={styles.itemTitle}>Playing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => setSelected(GameTypes.Playing)}>
            {selected === GameTypes.Playing && <View style={styles.selectedBack} />}
            <Image source={WantPlayImg} style={{ transform: [{ scale: 0.8 }], marginLeft: 2, marginTop: 2 }} />
            <Text style={styles.itemTitle}>Playing</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => setSelected(GameTypes.Beaten)}>
            {selected === GameTypes.Beaten && <View style={styles.selectedBack} />}
            <Image source={BeatenImg} style={{ transform: [{ scale: 0.74 }], marginTop: -8, marginRight: -10 }} />
            <Text style={styles.itemTitle}>Playing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => setSelected(GameTypes.Completed)}>
            {selected === GameTypes.Completed && <View style={styles.selectedBack} />}
            <Image source={CompletedImg} style={{ transform: [{ scale: 0.8 }], marginTop: 0 }} />
            <Text style={styles.itemTitle}>Playing</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity style={{ width: "50%" }} onPress={() => setSelected(GameTypes.Abandoned)}>
            {selected === GameTypes.Abandoned && <View style={styles.selectedBack} />}
            <Image source={AbandonedImg} style={{ transform: [{ scale: 0.8 }] }} />
            <Text style={styles.itemTitle}>Playing</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 30 }}>
          <Button
            title={"Save"}
            inactive={selected === 0}
            onPress={() => saveStatus()}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default GameStatus;
