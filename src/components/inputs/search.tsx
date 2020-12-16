import React, { FC, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  View,
  Text,
  TextInput,
} from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import HeartImg from "src/assets/icons/heart";
import ArroLeftImg from "src/assets/icons/arrow_left.svg";
import CrossImg from "src/assets/icons/cross_search.svg";
import { ICover } from "src/types/api";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  placeHolderContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  placeholderText: {
    ...fontStyle.placeholder,
    color: colors.grey50,
  },
  textInput: {
    marginStart: 30,
    color: colors.black,
    ...fontStyle.titleMed,
  },
  cross: {
    position: "absolute",
    right: 0,
    marginEnd: 18,
  },
});

export interface IInput extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  value?: string;
  isSearch?: boolean;
  onPressCancel: () => void;
  onBlurCall: () => void;
  onChangeText: (text: string) => void;
}

const SearchInput: FC<IInput> = ({
  styleComponent,
  value,
  isSearch,
  onPressCancel,
  onChangeText,
  onBlurCall,
  ...others
}) => {
  const [showInput, setShowInput] = useState(false);

  const onFocus = () => {
    if (!showInput) {
      setShowInput(true);
    }
  };

  const onBlur = () => {
    onBlurCall();
    if (!value) {
      setShowInput(false);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onFocus}>
      {showInput ? (
        <TextInput
          style={styles.textInput}
          {...others}
          value={value}
          onBlur={onBlur}
          onEndEditing={() => onBlur()}
          autoFocus={true}
          onChangeText={text => onChangeText(text)}
        />
      ) : (
        <View style={styles.placeHolderContainer}>
          <Text style={styles.placeholderText}>Find all games & collections</Text>
        </View>
      )}
      {isSearch && (
        <TouchableOpacity style={styles.cross} onPress={onPressCancel}>
          <CrossImg />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchInput;
