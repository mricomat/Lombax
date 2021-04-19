import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import useRootContext from "src/hooks/use-context";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl } from "src/utils/image";
import EditButton from "src/components/buttons/edit";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    width: "100%",
    alignSelf: "center",
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    width: "100%",
    opacity: 0.75,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginEnd: 22,
    marginBottom: 30,
  },
});

const Lists: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [userPr, setUserPr] = useState<IUser>((route.params && route.params.user) || {});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (isLoading) {
    }
  }, []);

  useEffect(() => {}, [user.following]);

  const renderBackground = () => {
    const uri = getCoverUrl(userPr.backgroundId);
    return (
      <Animated.View style={[styles.backgroundContainer, { height: heightBack }]}>
        <Animated.Image
          source={{ uri }}
          style={[styles.imageBackground, { height: heightBack }]}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.backColor, { height: heightBack }]} />
      </Animated.View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 22 }}>
          <Header
            title={`${userPr.name}'s Follows`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderListItem = () => {
    return <View />;
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
    }
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      {isLoading && (
        <View style={{ flex: 1, alignItems: "center", marginBottom: 100 }}>
          <PacmanIndicator color="white" size={40} />
        </View>
      )}
      {!isLoading && (
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
          data={[]}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
          onEndReachedThreshold={0.01}
          onEndReached={() => onEndReached()}
          contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
        />
      )}
      <EditButton styleComponent={styles.editButton} onPress={() => navigation.navigate(routeNames.NewList)} />
    </View>
  );
};

export default Lists;
