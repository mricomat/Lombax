import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList, Animated } from "react-native";
import moment from "moment";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { DragSortableView, AutoDragSortableView } from "react-native-drag-sort";

import colors, { gradients } from "src/assets/colors";
import { dimensions, fontStyle } from "src/assets";
import { updateUser } from "src/services/auth";
import Header from "src/components/headers";
import IGame, { IDataItem } from "src/types/api";
import DeviceUtils from "src/utils/device";
import GameItem from "src/components/items/gameItem";
import useRootContext from "src/hooks/use-context";
import Button from "src/components/buttons";

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
    opacity: 0.7,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  cover: {
    borderRadius: 10,
    height: 160,
    width: 130,
    marginTop: 22,
    alignSelf: "center",
  },
  empty: {
    borderWidth: 0.3,
    borderColor: colors.grey10,
    borderRadius: 10,
    backgroundColor: colors.grey50,
    height: 184,
    width: 135,
  },
  des: {
    ...fontStyle.titleMed,
    color: colors.white,
    alignSelf: "center",
    marginBottom: 20,
  },
});

const FavoriteSelection: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [game] = useState<IGame>(route.params && route.params.game);
  const [favorites, setFavorites] = useState<any>([{}, {}, {}, {}]);
  const [selected, setSelected] = useState<any[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    let newFavs = [...favorites];
    const userFavs: any[] = [...user.favorites];
    userFavs.map((item, index) => {
      newFavs[index] = {
        id: item.id,
        cover: {
          image_id: item.imageId || item.cover.image_id,
        },
        releaseDate: item.releaseDate || item.first_release_date,
        name: item.name,
      };
    });

    if (user.favorites.length < 4 && user.favorites.findIndex(item => item.id === game.id) === -1) {
      newFavs[user.favorites.length] = game;
    } else {
    }
    setFavorites([...newFavs]);
    setSelected([...newFavs]);
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
            title={"Favorite Selection"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderCoverGame = ({ item, index }) => {
    return item.cover ? (
      <GameItem cover={item.cover} styleComponent={{}} key={item.id + index} activity={false} disabled={true} />
    ) : (
      <View style={styles.empty} />
    );
  };

  const saveFavorites = async () => {
    setIsLoading(true);
    let newFavorites: any[] = [];
    selected.map((item, index) => {
      if (item.id) {
        newFavorites[index] = {
          id: item.id,
          imageId: item.imageId || item.cover.image_id,
          releaseDate: item.releaseDate || item.first_release_date,
          name: item.name,
        };
      } else {
        newFavorites[index] = {};
      }
    });
    newFavorites = newFavorites.filter(item => item.id);
    const result = await updateUser({ id: user.id, favorites: newFavorites });
    if (!result.error) {
      setUser({ ...user, favorites: newFavorites });
      navigation.goBack();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <Text style={styles.des}>Select the order to show your favorite games</Text>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: 310 }}>
            <DragSortableView
              dataSource={favorites}
              parentWidth={310}
              childrenWidth={135}
              childrenHeight={184}
              marginChildrenBottom={10}
              marginChildrenTop={10}
              marginChildrenRight={10}
              onDataChange={data => setSelected(data)}
              marginChildrenLeft={10}
              keyExtractor={(item, index) => item.id}
              renderItem={(item, index) => {
                return renderCoverGame({ item, index });
              }}
            />
          </View>
          <View style={{ width: "100%", paddingHorizontal: 22, marginBottom: 20 }}>
            <Button
              title={"Save"}
              style={{ marginTop: 30 }}
              onPress={() => saveFavorites()}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoriteSelection;
