import _ from "lodash";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { StyleSheet, Text, View } from "react-native";

import Star from "src/components/star";
import { is } from "date-fns/locale";

export default class TapRating extends Component {
  static defaultProps = {
    defaultRating: 0,
    reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
    count: 10,
    showRating: true,
    reviewColor: "rgba(230, 196, 46, 1)",
    reviewSize: 25,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultRating } = nextProps;

    if (defaultRating !== prevState.defaultRating) {
      return {
        position: defaultRating,
        defaultRating,
      };
    }
    return null;
  }

  constructor() {
    super();

    this.state = {
      position: 0,
      leftPosition: 0,
      i: -1,
      isSame: 0,
    };
  }

  componentDidMount() {
    const { defaultRating } = this.props;

    let rating = defaultRating;
    let isSame = 0;

    if (defaultRating) {
      if (Math.floor(rating) < defaultRating) {
        rating = Math.floor(rating) - 2;
      } else {
        rating = rating - 1;
      }
      isSame = -2;
    }

    this.setState({ position: rating, i: rating === 0 ? -1 : rating, isSame });
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star;
    });
  }

  starSelectedInPosition(newPosition, index) {
    const { position, leftPosition, i, isSame } = this.state;
    const { onFinishRating } = this.props;

    if (i === index) {
      if (isSame === index) {
        this.setState({ isSame: -2, i: index - 1 });
      } else {
        this.setState({ isSame: index });
      }
    } else {
      this.setState({ i: index, isSame: -2 });
    }

    if (position !== newPosition) {
      this.setState({ position: newPosition, leftPosition: newPosition + 1 });
    } else {
      if (leftPosition < newPosition) {
        this.setState({ position: newPosition - 1, leftPosition: newPosition });
      } else {
        this.setState({ leftPosition: newPosition - 1 });
      }
    }

    if (typeof onFinishRating === "function") onFinishRating(i, index, isSame);
  }

  render() {
    const { position, leftPosition, i, isSame } = this.state;
    const { count, reviews, showRating, reviewColor, reviewSize } = this.props;
    const rating_array = [];
    const starContainerStyle = [styles.starContainer];

    if (this.props.starContainerStyle) {
      starContainerStyle.push(this.props.starContainerStyle);
    }

    _.times(5, index => {
      rating_array.push(
        // <Star
        //   key={index}
        //   index={index}
        //   position={index + 1}
        //   starSelectedInPosition={this.starSelectedInPosition.bind(this)}
        //   left={position >= index + 1}
        //   right={position >= index + 1 && leftPosition >= index + 1}
        //   {...this.props}
        // />
        <Star
          key={index}
          index={index}
          position={index + 1}
          starSelectedInPosition={this.starSelectedInPosition.bind(this)}
          left={index < i + 1}
          right={index < i + 1 && isSame !== index}
          {...this.props}
        />
      );
    });

    return (
      <View style={styles.ratingContainer}>
        {showRating && (
          <Text style={[styles.reviewText, { fontSize: reviewSize, color: reviewColor }]}>{reviews[position - 1]}</Text>
        )}
        <View style={starContainerStyle}>{this.renderStars(rating_array)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: {
    fontWeight: "bold",
    margin: 10,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
