import React, { FC, useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";

import { colors, fontStyle } from "src/assets";
import CrossImg from "src/assets/icons/cross_search.svg";
import SwitchImg from "src/assets/icons/switch.svg";

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
    color: colors.grey50,
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
  placeholder?: string;
  isSearch?: boolean;
  showSwitch?: boolean;
  onPressCancel?: () => void;
  onBlurCall?: () => void;
  onPressSwitch?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchInput: FC<IInput> = ({
  styleComponent,
  value,
  isSearch,
  onPressCancel,
  onChangeText,
  onBlurCall,
  onPressSwitch,
  placeholder,
  showSwitch = true,
  ...others
}) => {
  const [showInput, setShowInput] = useState(false);

  const onFocus = () => {
    if (!showInput) {
      setShowInput(true);
    }
  };

  const onBlur = () => {
    onBlurCall && onBlurCall();
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
          autoFocus
          selectionColor={colors.grey50}
          onChangeText={text => onChangeText && onChangeText(text)}
        />
      ) : (
        <View style={styles.placeHolderContainer}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      )}
      {isSearch && (
        <TouchableOpacity style={styles.cross} onPress={onPressCancel}>
          <CrossImg />
        </TouchableOpacity>
      )}
      {!isSearch && showSwitch && (
        <TouchableOpacity style={styles.cross} onPress={onPressSwitch}>
          <SwitchImg />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchInput;
