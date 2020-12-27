import React, { FC, useState } from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { colors, fontStyle } from "src/assets";
import GameItem from "src/components/items/gameItem";
import GameReviewItem from "src/components/items/gameReviewItem";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import DeviceUtils from "src/utils/device";
import PlayImg from "src/assets/icons/playV";
import { getImageUrl } from "src/utils/image";
import Input from "src/components/inputs/simple";
import Button from "src/components/buttons";
import InterestList from "src/components/interestList";
import { genresThemesInfo } from "src/constants/genres";
import AvatarItem from "src/components/items/avatarItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 1,
  },
  textTab: {
    ...fontStyle.titleMed,
    color: colors.white,
  },
  touchableTab: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: colors.grey50,
    elevation: 1,
  },
  titleName: {
    color: colors.white,
    ...fontStyle.headerTitle,
  },
  titleUsername: {
    color: colors.grey30,
    ...fontStyle.menuLabel,
    marginTop: 6,
  },
});

export interface IGameTab extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  game?: IGame;
}

const GameDetailTab: FC<IGameTab> = ({ styleComponent, game, setBackground }) => {
  const [indexR, setIndex] = useState(0);
  const [routes] = useState([
    { key: "info", title: "Info" },
    { key: "interests", title: "Interests" },
    { key: "avatar", title: "Avatar" },
  ]);

  const navigation = useNavigation();

  const renderInfo = () => {
    return (
      <View style={{ marginTop: 25 }}>
        <KeyboardAvoidingView>
          <ScrollView style={{}} contentContainerStyle={{}}>
            <Input placeholder={"Name"} />
            <Input placeholder={"Last name"} styleContent={{ marginTop: 25 }} />
            <Input placeholder={"Username"} styleContent={{ marginTop: 25 }} />
            <Input placeholder={"Birth"} styleContent={{ marginTop: 25 }} />
            <Input placeholder={"Email"} styleContent={{ marginTop: 25 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };

  const renderInterests = () => {
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView>
          <InterestList data={genresThemesInfo} onPressItem={item => {}} />
        </ScrollView>
      </View>
    );
  };

  const renderAvatar = () => {
    return (
      <View style={{ marginTop: 18 }}>
        <ScrollView style={{}} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleName}>Martin Rico</Text>
            <Text style={styles.titleUsername}>mrico</Text>
            <AvatarItem styleComponent={{ marginTop: 14 }} />
            <Text style={[styles.titleUsername, { marginTop: 14 }]}>Interested in</Text>
            <Text style={[styles.titleName, { fontSize: 14, marginTop: 4 }]}>{"Action   Shooter   Platforms"}</Text>
          </View>

          <Text style={[styles.titleName, { fontSize: 14, marginTop: 20 }]}>{"Select your avatar"}</Text>
          <FlatList
            renderItem={renderAvatarItem}
            data={["p3svrq6ewzxnn7p1a3v9", "txx0awlwujyyiqt6pp2t", "sc6l81", "sc8gf9"]}
            horizontal
            style={{ marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={[styles.titleName, { fontSize: 14, marginTop: 20 }]}>{"Select your background"}</Text>
          <FlatList
            renderItem={renderAvatarItem}
            data={["p3svrq6ewzxnn7p1a3v9", "txx0awlwujyyiqt6pp2t", "sc6l81", "sc8gf9"]}
            horizontal
            style={{ marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    );
  };

  const renderAvatarItem = ({ item }) => {
    const uri = getImageUrl(item, "t_original");
    return <AvatarItem styleComponent={{ marginEnd: 12 }} data={item} onPress={() => setBackground({ uri })} />;
  };

  const renderScene = (index: number) => {
    switch (index) {
      case 0:
        return renderInfo();
      case 1:
        return renderInterests();
      case 2:
        return renderAvatar();
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, styleComponent]}>
      <View style={styles.tabStyle}>
        <FlatList
          data={routes}
          horizontal
          style={{ paddingVertical: 2 }}
          contentContainerStyle={{ justifyContent: "space-between", paddingHorizontal: "14%" }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const focused = routes[index].key === routes[indexR].key;
            return (
              <TouchableOpacity
                style={[
                  styles.touchableTab,
                  { backgroundColor: focused ? colors.blue100 : colors.grey50 },
                  index !== 0 && { marginStart: 20 },
                ]}
                onPress={() => setIndex(index)}
              >
                <Text style={styles.textTab}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {renderScene(indexR)}

      <View style={{ marginBottom: 25, position: "absolute", bottom: 0, width: "100%" }}>
        <Button title={"Next"} />
      </View>
    </View>
  );
};

export default GameDetailTab;
