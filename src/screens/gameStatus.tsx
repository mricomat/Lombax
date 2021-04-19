import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import AbandonedImg from "src/assets/icons/abandoned.svg";
import BeatenImg from "src/assets/icons/beaten.svg";
import CompletedImg from "src/assets/icons/completed.svg";
import PlayingImg from "src/assets/icons/playing.svg";
import WantPlayImg from "src/assets/icons/wantPlay.svg";
import Button from "src/components/buttons";
import Header from "src/components/headers";
import useRootContext from "src/hooks/use-context";
import useNavigation from "src/hooks/use-navigation";
import IGame, { IGameFeel } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { postGameFeel } from "src/services/game";
import { GameStatus as GameTypes } from "src/types/api";
import { gameStatusColors } from "src/utils/constants";

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
    opacity: 0.77,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  itemTitle: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
  itemDes: {
    ...fontStyle.titleMed,
    color: colors.grey65,
    marginTop: 3,
  },
  selectedBack: {
    width: 73,
    height: 73,
    backgroundColor: colors.disabled,
    opacity: 0.15,
    position: "absolute",
    borderRadius: 100,
    alignSelf: "center",
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
  const [isSave, setIsSave] = useState<boolean>(true);

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
        <Animated.View style={{ marginTop: 10, paddingHorizontal: 18 }}>
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

    const result = await postGameFeel(user.id, game, gameFeel && gameFeel.like, selected, isSave);

    if (!result.error) {
      route.params.setGameFeel(result.data.gameFeel);
      let newDiaries = {};
      let diaryCounts = user.counts.diaryCounts;
      let gamesCount = user.counts.gamesCount;
      if (result.data.diary) {
        const diary = { ...result.data.diary, gameFeel: result.data.gameFeel };
        newDiaries = { diary: [diary, ...user.diary] };
        diaryCounts = diaryCounts + 1;
      }

      let newGameFeels = [...user.gameFeels];

      if (gameFeel) {
        // remove gameFeel user
        const index = user.gameFeels.indexOf(gameFeel._id);
        if (index > -1) {
          newGameFeels.splice(index, 1);
        }
      } else {
        gamesCount = gamesCount + 1;
      }
      newGameFeels = [result.data.gameFeel, ...newGameFeels];

      setUser({
        ...user,
        gameFeels: [...newGameFeels],
        ...newDiaries,
        counts: { ...user.counts, diaryCounts, gamesCount },
      });
      navigation.goBack();
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 22 }}>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row" }}
            onPress={() => setSelected(GameTypes.WantPlay)}
          >
            <View style={{ justifyContent: "center" }}>
              {selected === GameTypes.WantPlay && <View style={styles.selectedBack} />}
              <WantPlayImg />
            </View>

            <View style={{ marginStart: 30 }}>
              <Text style={[styles.itemTitle, { color: gameStatusColors.WANT_TO_PLAY }]}>Want to Play</Text>
              <Text style={styles.itemDes}>Waiting for playing soon</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row", marginTop: 35 }}
            onPress={() => setSelected(GameTypes.Playing)}
          >
            <View style={{ justifyContent: "center", marginStart: 2 }}>
              {selected === GameTypes.Playing && <View style={styles.selectedBack} />}
              <PlayingImg />
            </View>

            <View style={{ marginStart: 30 }}>
              <Text style={[styles.itemTitle, { color: gameStatusColors.PLAYING }]}>Playing</Text>
              <Text style={styles.itemDes}>Currently playing</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row", marginTop: 35 }}
            onPress={() => setSelected(GameTypes.Beaten)}
          >
            <View style={{ justifyContent: "center", marginStart: 2 }}>
              {selected === GameTypes.Beaten && <View style={styles.selectedBack} />}
              <BeatenImg />
            </View>

            <View style={{ marginStart: 30 }}>
              <Text style={[styles.itemTitle, { color: gameStatusColors.BEATEN }]}>Beaten</Text>
              <Text style={styles.itemDes}>Finished the main objective</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row", marginTop: 35 }}
            onPress={() => setSelected(GameTypes.Completed)}
          >
            <View style={{ justifyContent: "center", marginStart: 4 }}>
              {selected === GameTypes.Completed && <View style={styles.selectedBack} />}
              <CompletedImg />
            </View>

            <View style={{ marginStart: 30 }}>
              <Text style={[styles.itemTitle, { color: gameStatusColors.COMPLETED }]}>Completed</Text>
              <Text style={styles.itemDes}>100% All quests and objectives</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", flexDirection: "row", marginTop: 35 }}
            onPress={() => setSelected(GameTypes.Abandoned)}
          >
            <View style={{ justifyContent: "center", marginStart: 5 }}>
              {selected === GameTypes.Abandoned && <View style={styles.selectedBack} />}
              <AbandonedImg />
            </View>

            <View style={{ marginStart: 30 }}>
              <Text style={[styles.itemTitle, { color: gameStatusColors.ABANDONED }]}>Abandoned</Text>
              <Text style={styles.itemDes}>Given up, won't to play again</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 30, marginTop: 50 }}>
          <Button
            title={"Record in your diary?"}
            inactive={selected === 0}
            onPress={() => setIsSave(!isSave)}
            style={{}}
            backgroundColor={isSave ? colors.blue100 : colors.grey50}
          />
          <Button
            title={"Save"}
            style={{ marginTop: 16 }}
            inactive={selected === 0}
            onPress={() => saveStatus()}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GameStatus;
