import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import { Rating, AirbnbRating, TabRating } from "react-native-ratings";

import { colors, fontStyle, dimensions } from "src/assets";
import { gradients } from "src/assets/colors";
import IGame from "src/types/api";
import CrossImg from "src/assets/icons/cross.svg";
import { genresThemesSorted, defaultSortItem } from "src/utils/constants";
import GameImg from "src/assets/icons/game.svg";
import ShareImg from "src/assets/icons/share.svg";
import ListImg from "src/assets/icons/lists.svg";
import Stars from "src/components/stars";
import StarImg from "src/assets/icons/star";
import PencilImg from "src/assets/icons/pencil";
import TapRating from "src/components/tabRating";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 0,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 325,
    backgroundColor: colors.grey50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 70,
    height: 70,
    position: "absolute",
  },
  circleContainer: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
    marginHorizontal: 18,
  },
  title: {
    ...fontStyle.menuLabel,
    color: colors.white,
    marginTop: 8,
  },
  align: {
    alignItems: "center",
  },
  firstContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 18,
    marginTop: 10,
  },
});

export interface IGameModal extends ViewProps {
  playPress?: () => void;
  favoritePress?: () => void;
  listPress?: () => void;
  ratePress?: (rating: number) => void;
  reviewPress?: () => void;
  sharePress?: () => void;
  showModal: boolean;
  rating?: number;
  isFavorite: boolean;
  setShowModal: (showModal: boolean) => void;
}

const GameModal: FC<IGameModal> = ({
  playPress,
  favoritePress,
  listPress,
  ratePress,
  reviewPress,
  sharePress,
  showModal,
  setShowModal,
  isFavorite,
  rating,
}) => {
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(!showModal)}
      backdropOpacity={0.2}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.align}>
            <TouchableOpacity style={styles.circleContainer}>
              <View style={styles.circle} />
              <GameImg width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Play</Text>
          </View>
          <View style={styles.align}>
            <TouchableOpacity style={styles.circleContainer} onPress={favoritePress}>
              <View style={styles.circle} />
              <StarImg fill={isFavorite ? colors.yellow80 : colors.white} height={28} width={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Favorite</Text>
          </View>
          <View style={styles.align}>
            <TouchableOpacity style={styles.circleContainer}>
              <View style={styles.circle} />
              <ListImg style={{ marginStart: 4, marginTop: 2 }} />
            </TouchableOpacity>
            <Text style={styles.title}>Lists</Text>
          </View>
        </View>
        <View style={[styles.align, { marginTop: 16, marginBottom: 12 }]}>
          <TapRating
            showRating={false}
            defaultRating={rating}
            selectedColor={colors.blue100}
            onFinishRating={(i, index, isSame) => {
              // TODO REFACTOR DELETE
              let rating = 0;
              if (i === index && index == isSame) {
                rating = index;
              } else if (index === i && isSame === -2) {
                rating = index + 1 - 0.5;
              } else if (index !== i && isSame === -2) {
                rating = index + 1;
              } else if (i == -1) {
                rating = index + 1;
              }
              ratePress && ratePress(rating);
            }}
          />
          <Text style={styles.title}>Rate</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.align, { marginRight: 10 }]}>
            <TouchableOpacity style={styles.circleContainer}>
              <View style={styles.circle} />
              <PencilImg />
            </TouchableOpacity>
            <Text style={styles.title}>Review</Text>
          </View>
          <View style={styles.align}>
            <TouchableOpacity style={styles.circleContainer}>
              <View style={styles.circle} />
              <ShareImg />
            </TouchableOpacity>
            <Text style={styles.title}>Share</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GameModal;
