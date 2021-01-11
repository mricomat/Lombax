import React, { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CommonActions, StackActions, useNavigationState } from "@react-navigation/native";
import moment from "moment";

import { colors, fontStyle } from "src/assets";
import AvatarList from "src/components/avatarsList";
import Button from "src/components/buttons";
import RegisterHeader from "src/components/headers/registerHeader";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getCoverUrl } from "src/utils/image";
import { register, uploadRegisterImages } from "src/services/auth";

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
    marginTop: 50,
    justifyContent: "space-between",
  },
  titleName: {
    color: colors.white,
    ...fontStyle.headerTitle,
  },
  titleUsername: {
    color: colors.grey30,
    ...fontStyle.menuLabel,
    marginTop: 6,
  },
  titleSection: {
    color: colors.white,
    ...fontStyle.headerTitle,
    fontSize: 14,
    marginTop: 20,
    paddingHorizontal: 22,
  },
  addTouchable: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey50,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
    marginEnd: 12,
  },
  contentContainerScroll: {
    paddingBottom: 110,
    paddingTop: 90,
  },
});

const RegisterAvatar = ({ route }) => {
  const user = route.params && route.params.user;
  const [showError, setShowError] = useState<boolean>(false);
  const [avatarIndex, setAvatarIndex] = useState<number>(1);
  const [backgroundIndex, setBackgroundIndex] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(false);

  const [avatarList, setAvatarList] = useState([
    { id: "", isSelector: true },
    { id: "c63afe7f70badf0ec7f7e3261e586b62" },
    { id: "82974682899dba3fe17cd3a9cfe6e99b" },
    { id: "c08b5668ef21597f6955c41d96ed9f06" },
    { id: "47e345f99afb7043a4d535185eb8955e" },
    { id: "9428588fd3e454665eb2daf7ff83b76b" },
  ]);
  const [backgroundList, setBackgroundList] = useState([
    { id: "", type: "background", isSelector: true },
    { id: "61772a334bb80e1d5b49e7b87a1eae1f" },
    { id: "82974682899dba3fe17cd3a9cfe6e99b" },
    { id: "c08b5668ef21597f6955c41d96ed9f06" },
    { id: "47e345f99afb7043a4d535185eb8955e" },
    { id: "9428588fd3e454665eb2daf7ff83b76b" },
  ]);

  const [background, setBackground] = useState({ uri: getCoverUrl("82974682899dba3fe17cd3a9cfe6e99b") });
  const [avatar, setAvatar] = useState({ uri: getCoverUrl("c63afe7f70badf0ec7f7e3261e586b62") });
  const routes = useNavigationState(state => state);
  const scrollY = useRef(new Animated.Value(0)).current;
  console.log(routes);
  const navigation = useNavigation();

  const renderAvatarContainer = () => {
    return (
      <View style={{}}>
        <View style={{ height: 90 }} />
        <ScrollView
          style={{}}
          contentContainerStyle={styles.contentContainerScroll}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        >
          <View style={{ alignItems: "center", paddingHorizontal: 22 }}>
            <Text style={styles.titleName}>Martin Rico</Text>
            <Text style={styles.titleUsername}>mrico</Text>
            {renderAvatar()}
            <Text style={[styles.titleUsername, { marginTop: 14 }]}>Interested in</Text>
            <Text style={[styles.titleName, { fontSize: 14, marginTop: 4 }]}>{"Action   Shooter   Platforms"}</Text>
          </View>

          <Text style={styles.titleSection}>{"Select your avatar"}</Text>
          <AvatarList
            data={avatarList}
            onPressItem={(item, index) => {
              setAvatar({ uri: item });
              setAvatarIndex(index);
            }}
            setAvatarSelector={item => {
              const newItems = avatarList;
              newItems[0] = { ...newItems[0], uri: item.uri, data: item };
              setAvatarList([...newItems]);
              setAvatar({ uri: item.uri });
            }}
          />
          <Text style={styles.titleSection}>{"Select your background"}</Text>
          <AvatarList
            data={backgroundList}
            onPressItem={(item, index) => {
              setBackground({ uri: item });
              setBackgroundIndex(index);
            }}
            setAvatarSelector={item => {
              const newItems = backgroundList;
              newItems[0] = { ...newItems[0], uri: item.uri, data: item };
              setBackgroundList([...newItems]);
              setBackground({ uri: item.uri });
            }}
            indexStart={2}
          />

          <View style={styles.buttonContainer}>
            <Button title={"Register"} onPress={() => registerService()} loading={isLoading} disabled={isLoading} />
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderAvatar = () => {
    return (
      <TouchableOpacity style={[styles.addTouchable, { marginEnd: 0, marginTop: 14 }]}>
        <Image style={[styles.addTouchable, { marginEnd: 0 }]} source={avatar} />
      </TouchableOpacity>
    );
  };

  const registerService = async () => {
    setIsLoading(true);
    let data = new FormData();
    let imagesId: string[] = [];
    let newAvatar = false;
    let newBackground = false;

    if (avatarIndex === 0 || backgroundIndex === 0) {
      if (avatarIndex === 0) {
        const avatarFile = avatarList[0].data;
        const avatar: any = {
          uri: avatarFile.uri,
          type: avatarFile.type,
          name: avatarFile.filename,
          data: avatarFile.data,
        };
        data.append("file", avatar);
        newAvatar = true;
      }

      if (backgroundIndex === 0) {
        const backgroundFile = backgroundList[0].data;
        const background: any = {
          uri: backgroundFile.uri,
          type: backgroundFile.type,
          name: backgroundFile.filename,
          data: backgroundFile.data,
        };
        data.append("file", background);
        newBackground = true;
      }

      const res = await uploadRegisterImages(data);
      if (!res.error) {
        imagesId = res.data.imagesId;
      }
    }
    const coverId = newAvatar ? imagesId[0] : avatarList[avatarIndex].id;
    const backgroundId = newBackground ? (newAvatar ? imagesId[1] : imagesId[0]) : backgroundList[backgroundIndex].id;

    const resRegister = await register({
      ...user,
      birth: moment(user.birth).unix(),
      coverId,
      backgroundId: backgroundId,
    });
    if (!resRegister.error) {
      navigation.dispatch(CommonActions.navigate("HomeTab", { name: "Profile" }));
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <RegisterHeader
        title={"Welcome to Lombax"}
        onBackPress={() => navigation.goBack()}
        scrollY={scrollY}
        styleComponent={{ position: "absolute", alignSelf: "center", width: "100%" }}
        titleDes={"Build your own profile to connect with friends"}
        stepInfo={"Step 3: Select yout avatar and background"}
        step={2}
        showError={showError}
        background={background}
      />

      {renderAvatarContainer()}
    </View>
  );
};

export default RegisterAvatar;
