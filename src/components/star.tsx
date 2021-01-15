import React, { PureComponent } from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";

import StarImg from "src/assets/icons/star";
import HalfStarImg from "src/assets/icons/halfStar";

const STAR_SIZE = 35;

export default class Star extends PureComponent {
  static defaultProps = {
    selectedColor: "#f1c40f",
  };

  constructor() {
    super();
    this.springValue = new Animated.Value(1);
    this.state = {
      selected: false,
    };
  }

  spring() {
    const { position, starSelectedInPosition, index } = this.props;

    this.springValue.setValue(1.2);

    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 2,
      tension: 1,
      useNativeDriver: true,
    }).start();

    this.setState({ selected: !this.state.selected });
    starSelectedInPosition(position, index);
  }

  render() {
    const { fill, size, selectedColor, isDisabled, starStyle, left, right } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind(this)} disabled={isDisabled}>
        <Animated.View
          style={[
            styles.starStyle,
            {
              transform: [{ scale: this.springValue }],
            },
            starStyle,
          ]}
        >
          <HalfStarImg width={size || STAR_SIZE} height={size || STAR_SIZE} left={left} right={right} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  starStyle: {},
});
