import React, { FC, useRef, useState } from "react";
import { FlatList, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";

import { colors, fontStyle } from "src/assets";
import { gradients } from "src/assets/colors";
import Button from "src/components/buttons";
import useNavigation from "src/hooks/use-navigation";
import IGame from "src/types/api";
import RegisterInfo from "src/screens/auth/registerInfo";
import RegisterInterests from "src/screens/auth/registerInterests";
import RegisterAvatar from "src/screens/auth/registerAvatar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 23,
  },
  textTab: {
    ...fontStyle.titleMed,
    color: colors.white,
  },
  touchableTab: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: colors.grey50,
    elevation: 1,
  },

  linearGradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    justifyContent: "flex-start",
  },
});

export interface IRegisterTab extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  game?: IGame;
}

const RegisterTab: FC<IRegisterTab> = ({ styleComponent, game, setBackground }) => {
  const [indexR, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [onNext, setOnNext] = useState(false);

  const swipeRef = useRef<Swiper>(null);

  const [routes] = useState([
    { key: "info", title: "Info" },
    { key: "interests", title: "Interests" },
    { key: "avatar", title: "Avatar" },
  ]);

  const navigation = useNavigation();

  const setNextAction = (result: boolean) => {
    setOnNext(false);
    if (result && indexR !== 2) {
      swipeRef && swipeRef.current && swipeRef.current.scrollBy(1, true);
    }
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, styleComponent]}>
      <View style={{ flex: 1 }}>
        <View style={styles.tabStyle}>
          <FlatList
            data={routes}
            horizontal
            style={{ paddingVertical: 2 }}
            contentContainerStyle={{ justifyContent: "space-between", paddingHorizontal: "14%" }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const focused = routes[index].key === routes[indexR].key;
              return (
                <TouchableOpacity
                  style={[
                    styles.touchableTab,
                    { backgroundColor: focused ? colors.blue100 : colors.grey50 },
                    index !== 0 && { marginStart: 20 },
                  ]}
                  onPress={() => setIndex(index)}
                >
                  <Text style={styles.textTab}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Swiper
          style={{}}
          ref={swipeRef}
          index={indexR}
          showsHorizontalScrollIndicator={false}
          showsPagination={false}
          loop={false}
          onIndexChanged={index => setIndex(index)}
        >
          <View style={{ flex: 1 }} key={indexR}>
            <RegisterAvatar
              setBackground={setBackground}
              index={indexR}
              onNext={onNext}
              setNext={setNextAction}
              setIndex={setIndex}
            />
            <View style={{ flex: 1, paddingHorizontal: 22 }} key={indexR}>
              <RegisterInfo index={indexR} onNext={onNext} setNext={setNextAction} setIndex={setIndex} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 22 }} key={indexR}>
              <RegisterInterests index={indexR} onNext={onNext} setNext={setNextAction} setIndex={setIndex} />
            </View>
          </View>
        </Swiper>
      </View>

      <LinearGradient style={styles.linearGradient} colors={gradients.bottomRegister}>
        <View style={{ paddingHorizontal: 22, flexDirection: "row", justifyContent: "space-between" }}>
          {indexR !== 0 && (
            <Button
              title={"Back"}
              onPress={() => {
                swipeRef && swipeRef.current && swipeRef.current.scrollTo(indexR === 2 ? 1 : 0, true);
              }}
              style={{ width: "35%" }}
              loading={isLoading}
              backgroundColor={colors.grey50}
              disabled={isLoading}
            />
          )}
          <Button
            title={"Next"}
            onPress={() => {
              setIsLoading(true);
              setOnNext(true);
            }}
            style={{ width: indexR !== 0 ? "60%" : "100%" }}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default RegisterTab;
