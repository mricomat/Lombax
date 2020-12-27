import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";

import { colors, fontStyle } from "src/assets";
import InterestItem from "src/components/items/interestItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...fontStyle.placeholder,
    color: colors.white,
  },
});

export interface IInteresList extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  title?: string;
  data?: any;
  onPressItem: (item: any) => any;
}

const InterestList: FC<IInteresList> = ({ styleComponent, title, data, onPressItem }) => {
  const renderItem = ({ item }) => {
    return (
      <InterestItem
        imageId={item.image_id}
        colorLeft={item.colorLeft}
        colorRight={item.colorRight}
        title={item.name}
        onPress={() => onPressItem(item)}
      />
    );
  };
  return (
    <View style={[styles.container, styleComponent]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.name + index}
          renderItem={renderItem}
          numColumns={2}
          initialNumToRender={12}
          nestedScrollEnabled={true}
          contentContainerStyle={{ flex: 1 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </View>
  );
};

export default InterestList;
