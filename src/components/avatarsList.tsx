import React, { FC, useState } from "react";
import { FlatList, StyleProp, StyleSheet, Image, View, ViewProps, ViewStyle, TouchableOpacity } from "react-native";
import ImagePicker, { ImagePickerOptions } from "react-native-image-picker";

import { colors, fontStyle } from "src/assets";
import AddPhotoImg from "src/assets/icons/addphoto.svg";
import { getCoverUrl } from "src/utils/image";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...fontStyle.placeholder,
    color: colors.white,
  },
  addTouchable: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey50,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
  },
});

export interface IAvatarsList extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  data?: any;
  indexStart?: number;
  onPressItem: (item: string, index: number) => any;
  setAvatarSelector: (item: any) => any;
}

const AvatarsList: FC<IAvatarsList> = ({
  styleComponent,
  data,
  onPressItem = () => {},
  setAvatarSelector,
  indexStart = 1,
}) => {
  const [indexSelected, setIndexSelected] = useState<number>(indexStart);

  const addSelectionStyle = (index: number) => {
    return {
      borderColor: index === indexSelected ? colors.white : colors.blue20,
      borderWidth: index === indexSelected ? 2 : 1,
    };
  };

  const renderAvatarItem = ({ item, index }) => {
    if (item.isSelector) {
      return renderSelector(item);
    } else {
      const uri = getCoverUrl(item.id);
      return (
        <TouchableOpacity
          style={[styles.addTouchable, { marginEnd: 12 }, addSelectionStyle(index)]}
          onPress={() => {
            setIndexSelected(index);
            onPressItem(getCoverUrl(item.id), index);
          }}
        >
          <Image style={[styles.addTouchable, addSelectionStyle(index)]} source={{ uri: uri }} />
        </TouchableOpacity>
      );
    }
  };

  const selectAvatar = () => {
    const options: ImagePickerOptions = {
      title: "Selecciona un imagen",
      mediaType: "photo",
      takePhotoButtonTitle: "Hacer un foto",
      chooseFromLibraryButtonTitle: "Seleccionar de la librería",
      cancelButtonTitle: "Cancelar",
      // maxHeight: 700,
      // maxWidth: 400,
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        !response.didCancel && setAvatarSelector(response);
      }
    });
  };

  const renderSelector = (item: any) => {
    return (
      <TouchableOpacity
        style={[styles.addTouchable, { marginEnd: 12 }, addSelectionStyle(0)]}
        onPress={() => {
          setIndexSelected(0);
          item.uri ? onPressItem(item.uri) : selectAvatar();
        }}
      >
        {item.uri && (
          <Image
            style={[
              styles.addTouchable,
              {
                position: "absolute",
              },
              addSelectionStyle(0),
            ]}
            source={{ uri: item.uri }}
          />
        )}
        <TouchableOpacity
          style={item.uri ? { position: "absolute", bottom: 0, right: 10 } : {}}
          onPress={() => {
            selectAvatar();
            setIndexSelected(0);
          }}
        >
          <AddPhotoImg />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, styleComponent]}>
      <FlatList
        key={"avatar"}
        renderItem={renderAvatarItem}
        data={data}
        horizontal
        scrollEnabled={true}
        style={{ marginTop: 10, width: "100%" }}
        contentContainerStyle={{ paddingLeft: 22 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AvatarsList;
