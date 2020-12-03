import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";

import { colors, fontStyle, dimensions } from "src/assets";
import { gradients } from "src/assets/colors";
import IGame from "src/types/api";
import CrossImg from "src/assets/icons/cross.svg";
import { genresThemesSorted, defaultSortItem } from "src/utils/constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    ...fontStyle.titleMed,
    color: colors.white,
    marginBottom: 12,
    marginStart: 20,
  },
  titleModal: {
    alignSelf: "center",
    ...fontStyle.genre,
    color: "white",
    marginTop: 70,
  },
  genreTitle: {
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 16.5,
    color: colors.grey60,
    marginTop: 26,
    justifyContent: "center",
    textAlign: "center",
  },
  linearGModal: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  touchableModal: {
    width: 70,
    height: 70,
    borderRadius: dimensions.radiusCircle,
    backgroundColor: colors.white,
    position: "absolute",
    justifyContent: "center",
    bottom: 30,
    alignItems: "center",
  },
  touchable: {
    justifyContent: "center",
    alignSelf: "center",
  },
});

export interface IGenreModal extends ViewProps {
  games?: IGame[];
  showModal?: boolean;
  genreSelected: () => void;
  setShowModal: (isShown: boolean) => void;
}

const GenreModal: FC<IGenreModal> = ({ showModal, genreSelected, setShowModal }) => {
  const renderGenreItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.touchable} onPress={() => genreSelected(item)}>
        <Text style={styles.genreTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(!showModal)}
      backdropOpacity={0.83}
      style={{ flex: 1, margin: 0 }}
    >
      <View style={styles.contentContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 120 }}
          data={genresThemesSorted}
          renderItem={renderGenreItem}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => item.id + item.name + index}
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity onPress={() => genreSelected(defaultSortItem)}>
                <Text style={styles.titleModal}>{"All genres"}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <LinearGradient colors={gradients.mainGenres} style={styles.linearGModal} />
        <TouchableOpacity style={styles.touchableModal} onPress={() => setShowModal(!showModal)}>
          <CrossImg />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default GenreModal;
