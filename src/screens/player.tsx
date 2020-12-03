import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import YouTube from "react-native-youtube";

import colors from "src/assets/colors";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.background,
  },
});

const PlayerScreen = ({ route }) => {
  const idVideo = route.params.id;
  useEffect(() => {}, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.grey50 }}>
      <YouTube
        apiKey="AIzaSyAUSNAYreW6N5hrdyjEltRxUEWHdl-oBCM"
        videoId={idVideo}
        fullscreen={false}
        play={true}
        onChangeFullscreen={e => {}}
        onError={e => console.log("ERROR", e)}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PlayerScreen;
