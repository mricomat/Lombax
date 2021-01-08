import React, { useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";
import Header from "src/components/headers";
import Input from "src/components/inputs/simple";
import RegisterTab from "src/components/registerTab";
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
});

const RegisterScreen: () => JSX.Element = () => {
  const [value, setValue] = useState("");
  const [background, setBackground] = useState(require("src/assets/images/backhollow.png"));
  const navigation = useNavigation();

  const renderBackground = () => {
    return (
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Image source={background} resizeMode={"cover"} style={styles.image} />
        <View style={styles.background} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackground()}
      <View style={{ paddingHorizontal: 22 }}>
        <Header
          title={"Register"}
          playIcon={false}
          heart={false}
          styleComponent={{ marginTop: 35 }}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <RegisterTab styleComponent={{ marginTop: 20 }} setBackground={setBackground} />
    </View>
  );
};

export default RegisterScreen;
