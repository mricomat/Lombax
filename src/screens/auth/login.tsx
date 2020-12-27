import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

import { colors, dimensions, fontStyle } from "src/assets";
import Input from "src/components/inputs/simple";
import Button from "src/components/buttons";
import ProfileImg from "src/assets/icons/profile";
import LockImg from "src/assets/icons/lock.svg";
import VideoImg from "src/assets/icons/video.svg";
import NoVideoImg from "src/assets/icons/no_video.svg";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundOpacity: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.grey80,
    opacity: 0.5,
    position: "absolute",
  },
  title: {
    ...fontStyle.midTitle,
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    marginTop: 18,
    ...fontStyle.smallTitle,
    color: colors.white,
    textAlign: "center",
  },
  forgotTitle: {
    ...fontStyle.titleMed,
    fontSize: 15,
    color: colors.white,
    alignSelf: "center",
  },
  backdropVideo: {
    width: "100%",
    height: "140%",
    alignContent: "center",
    position: "absolute",
    top: -136,
    left: 0,
  },
  videoButton: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
    position: "absolute",
    top: 0,
    marginEnd: 22,
    right: 0,
    marginTop: 30,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 32,
    height: 32,
    position: "absolute",
  },
  icon: {
    position: "absolute",
    marginStart: 16,
    alignSelf: "flex-start",
    top: 17,
  },
});

const LoginScreen: () => JSX.Element = () => {
  const [value, setValue] = useState("");
  const [showVideo, setShowVideo] = useState(true);
  const navigation = useNavigation();

  const renderBackgroundImage = () => {
    return (
      <View style={{ position: "absolute", height: "100%", width: "100%" }}>
        <Image source={require("src/assets/images/loginback.png")} style={{ height: "100%", width: "100%" }} />
        <View style={styles.backgroundOpacity} />
      </View>
    );
  };

  const renderBackgroundVideo = () => {
    return (
      <View style={{ position: "absolute", height: "100%", width: "100%" }}>
        {renderBackgroundImage()}
        <Video
          repeat={true}
          muted={true}
          resizeMode={"cover"}
          source={require("src/assets/videos/back.mp4")}
          style={styles.backdropVideo}
        />
        <View style={styles.backgroundOpacity} />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Image source={require("src/assets/images/logo.png")} style={{ height: 140, width: 90 }} />
          <Text style={styles.title}>SIGN IN</Text>
          <Text style={styles.description}>{`START SHARING \n ALL YOUR GAMING EXPERIENCE`}</Text>
        </View>
        <TouchableOpacity style={styles.videoButton} onPress={() => setShowVideo(!showVideo)}>
          <View style={styles.circle} />
          {showVideo ? <VideoImg /> : <NoVideoImg />}
        </TouchableOpacity>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <View style={{ width: "100%", marginTop: 50, marginBottom: 30 }}>
        <Button title={"Sign in"} onPress={() => navigation.navigate(routeNames.ProfileScreen)} />
        <Button
          title={"Register"}
          style={{ marginTop: 10 }}
          backgroundColor={colors.grey50}
          onPress={() => navigation.navigate(routeNames.RegisterScreen)}
        />
        <TouchableOpacity style={{ marginTop: 12 }}>
          <Text style={styles.forgotTitle}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showVideo ? renderBackgroundVideo() : renderBackgroundImage()}

      <KeyboardAvoidingView>
        <ScrollView style={{}} contentContainerStyle={{ alignItems: "center", paddingHorizontal: 22 }}>
          {renderHeader()}
          <View style={{ width: "100%", marginTop: 30 }}>
            <Input
              placeholder={"Username or Email"}
              value={value}
              onChangeText={text => setValue(text)}
              LeftIcon={() => <ProfileImg width={15} height={16} style={styles.icon} />}
            />
            <Input
              placeholder={"Password"}
              styleContent={{ marginTop: 10 }}
              value={value}
              onChangeText={text => setValue(text)}
              LeftIcon={() => <LockImg width={14} height={16} style={styles.icon} />}
            />
          </View>
          {renderButtons()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
