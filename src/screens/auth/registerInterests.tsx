import lodash from "lodash";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { colors } from "src/assets";
import Button from "src/components/buttons";
import RegisterHeader from "src/components/headers/registerHeader";
import InterestList from "src/components/interestList";
import { genresThemesInfo } from "src/constants/genres";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  background: {
    backgroundColor: colors.grey50,
    opacity: 0.7,
    width: "100%",
    height: "100%",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonContainer: {
    paddingHorizontal: 22,
    flexDirection: "row",
    marginBottom: 25,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
  },
});

const RegisterInterests = ({ route }) => {
  const user = route.params && route.params.user;

  const [selections, setSelections] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const renderInterests = () => {
    return (
      <View style={{ marginTop: 5 }}>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
          contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 250 }}
        >
          <InterestList data={genresThemesInfo} onPressItem={item => setNewSelection(item)} />
        </Animated.ScrollView>
      </View>
    );
  };

  const setNewSelection = (item: any) => {
    setShowError(false);
    if (selections.length < 4) {
      setSelections(lodash.uniqBy([...selections, item], "name"));
    }
  };

  const removeSelection = (item: any) => {
    const newItems = selections.filter(sel => sel.name !== item.name);
    setSelections(lodash.uniqBy([...newItems], "name"));
  };

  const navigateToRegisterAvatar = () => {
    const newUser = { ...user, interests: selections };
    navigation.navigate(routeNames.RegisterAvatar, { user: newUser });
  };

  return (
    <View style={styles.container}>
      <RegisterHeader
        title={"Welcome to Lombax"}
        onBackPress={() => navigation.goBack()}
        scrollY={scrollY}
        titleDes={"We will bring the best gaming experience"}
        stepInfo={"Step 2: Select 4 genres"}
        step={1}
        selections={selections}
        removeSelection={removeSelection}
        showError={showError}
      />
      {renderInterests()}
      <View style={styles.buttonContainer}>
        <Button
          title={"Next"}
          onPress={() => {
            selections.length < 4 ? setShowError(true) : navigateToRegisterAvatar();
          }}
        />
      </View>
    </View>
  );
};

export default RegisterInterests;
