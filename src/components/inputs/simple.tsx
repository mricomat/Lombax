import React, { useState, useEffect, useCallback, FC } from "react";
import {
  View,
  TextInput,
  Animated,
  Text,
  StyleSheet,
  TextInputProperties,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

import { colors, dimensions, fontStyle } from "../../assets/index";
import DeviceUtils from "src/utils/device";

const isIOS = DeviceUtils.isIOS;

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    marginVertical: 1,
    borderRadius: dimensions.radius,
    paddingLeft: 8,
    paddingRight: 8,
    height: 52,
    elevation: 3,
    backgroundColor: colors.grey50,
  },
  input: {
    ...fontStyle.titleMed,
    flex: 1,
    color: colors.white,
    marginTop: -5,
    marginStart: 3,
  },
  bodyContent: {
    borderBottomColor: "black",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  toucheableLineContent: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  label: {
    color: colors.grey60,
    ...fontStyle.titleMed,
    fontSize: 10,
    marginTop: 3,
    marginStart: 7,
    marginBottom: -8,
    zIndex: 2,
  },
  // error: {
  //   ...fontStyle.error,
  //   color: colors.red100,
  //   marginTop: 4,
  //   marginStart: 1,
  // },
  sufix: {
    flexDirection: "column-reverse",
  },
  eye: {
    position: "absolute",
    alignSelf: "center",
    flex: 1,
    right: 10,
  },
  flexSpace: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export interface IInputProps extends TextInputProperties {
  styleInput?: ViewStyle | ViewStyle;
  styleContent?: ViewStyle | ViewStyle;
  styleError?: TextStyle | TextStyle[];
  styleLabel?: TextStyle | TextStyle[];
  styleBodyContent?: ViewStyle | ViewStyle[];
  placeholder?: string;
  errorText?: string;
  isError?: boolean;
  errorColor?: string;
  disabled?: boolean;
  value?: string;
  prefix?: string;
  sufix?: string;
  isCalendar?: boolean;
  onPressCalendar?: () => void;
  secureTextEntry?: boolean;
  isDescription?: boolean;
}

const AnimatedInput: FC<IInputProps> = ({
  placeholder,
  errorText,
  isError = false,
  errorColor,
  disabled = false,
  value,
  prefix,
  sufix,
  secureTextEntry = false,
  styleInput,
  styleLabel,
  styleError,
  styleContent,
  styleBodyContent,
  autoFocus = true,
  isCalendar = false,
  onPressCalendar,
  isDescription = false,
  onChangeText,
  RightIcon,
  LeftIcon,
  ...others
}) => {
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(1));
  const [animatedMargin] = useState(new Animated.Value(0));
  const [isHidden, setIsHidden] = useState(true);
  const [letters, setLetters] = useState(0);

  const inputFontSize = styles.input.fontSize;
  const labelFontSize = styles.label.fontSize;

  useEffect(() => {
    setShowError(isError);
    if (value) {
      setShowInput(true);
    }
    if (value && !showInput) {
      startAnimation();
    }
    animationView();
  }, [isError, showError, value, animatedIsFocused, showInput]);

  const onBlur = () => {
    if (!value) {
      setShowInput(false);
      setShowError(false);
      startAnimation();
    }
  };

  const onFocus = () => {
    if (!showInput) {
      startAnimation();
    }
  };

  const borderColor = () => {
    let borderStyle = {};
    if (showError) {
      borderStyle = {
        borderColor: errorColor || colors.red100,
      };
    }
    return borderStyle;
  };

  const labelColor = () => {
    let labelStyle = {};
    if (showError) {
      labelStyle = {
        color: errorColor || colors.red100,
      };
    }
    return labelStyle;
  };

  const startAnimation = useCallback(() => {
    Animated.timing(animatedMargin, {
      toValue: showInput ? 0 : 1,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      if (!showInput) {
        setShowInput(true);
      }
    });
    Animated.timing(animatedIsFocused, {
      toValue: showInput ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      if (!showInput) {
        setShowInput(true);
      }
    });
  }, [animatedIsFocused, showInput, animatedMargin]);

  const animationView = useCallback(() => {
    const sizeShow = 15 + labelFontSize + inputFontSize + 5;
    const sizeHide = 15 + labelFontSize;
    const inputAdjust = {
      height: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeShow, sizeHide],
      }),
    };
    return inputAdjust;
  }, [animatedIsFocused, inputFontSize, labelFontSize]);

  const animationLabelFontSize = useCallback(() => {
    const fontAdjust = {
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [labelFontSize, inputFontSize],
      }),
      marginTop: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 3],
      }),
    };
    return fontAdjust;
  }, [animatedIsFocused, inputFontSize, labelFontSize]);

  const marginTopDescription = useCallback(() => {
    const marginAdjust = {
      marginTop: animatedMargin.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 8],
      }),
    };
    return marginAdjust;
  }, [animatedIsFocused, inputFontSize, labelFontSize, animatedMargin]);

  const onPressInput = () => {
    if (isCalendar) {
      onPressCalendar && onPressCalendar();
    } else {
      !disabled && onFocus();
    }
  };

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <TouchableOpacity
        style={[
          styles.content,
          styleContent,
          borderColor(),
          isDescription && { height: 300, justifyContent: "flex-start" },
        ]}
        activeOpacity={1}
        onPress={onPressInput}
      >
        <Animated.View style={[styles.bodyContent, styleBodyContent, animationView()]}>
          <View style={styles.flexSpace}>
            <Animated.Text
              style={[
                styles.label,
                styleLabel,
                animationLabelFontSize(),
                labelColor(),
                isDescription && marginTopDescription(),
                isDescription && { marginBottom: 0 },
                LeftIcon && { marginStart: 36 },
              ]}
              onPress={onPressInput}
            >
              {placeholder}
            </Animated.Text>
            {showInput && (
              <View style={styles.toucheableLineContent}>
                <>{prefix}</>
                <TextInput
                  maxLength={450}
                  {...others}
                  value={value}
                  secureTextEntry={secureTextEntry && isHidden}
                  //pointerEvents={disabled ? "box-none" : "auto"}
                  autoFocus={autoFocus}
                  blurOnSubmit
                  multiline={isDescription}
                  editable={!disabled}
                  onBlur={() => onBlur()}
                  style={[
                    styles.input,
                    isIOS && { marginStart: 7, marginBottom: 4 },
                    disabled && !isCalendar && { color: colors.grey30 },
                    isDescription && { height: 300, textAlignVertical: "top" },
                    LeftIcon && { marginStart: 32 },
                  ]}
                  onEndEditing={() => onBlur()}
                  onChangeText={text => {
                    isDescription && setLetters(text.length);
                    letters <= 1000 && onChangeText && onChangeText(text);
                  }}
                />
              </View>
            )}
          </View>
        </Animated.View>
        {LeftIcon && <LeftIcon />}
        {RightIcon && <RightIcon style={{ position: "absolute", right: 16 }} />}
        {/* {secureTextEntry && (
          <TouchableOpacity style={styles.eye} onPress={() => setIsHidden(!isHidden)}>
            <Eye fill={isHidden ? colors.grey30 : colors.black} />
          </TouchableOpacity>
        )}
        {isCalendar && (
          <TouchableOpacity style={styles.eye} onPress={() => onPressCalendar()}>
            <CalendarImg />
          </TouchableOpacity>
        )} */}
      </TouchableOpacity>
    </View>
  );
};

AnimatedInput.defaultProps = {
  isError: false,
  disabled: false,
  value: "",
  styleInput: {},
  styleBodyContent: {},
  styleLabel: {},
  styleError: {},
};

export default AnimatedInput;
