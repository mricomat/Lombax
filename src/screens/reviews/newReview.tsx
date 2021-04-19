import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import lodash from "lodash";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import GameImg from "src/assets/icons/game";
import Button from "src/components/buttons";
import Header from "src/components/headers";
import Input from "src/components/inputs/simple";
import CalendarModal from "src/components/modals/calendar";
import TapRating from "src/components/tabRating";
import { useForm } from "src/hooks/use-form";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import IGame, { GameStatus } from "src/types/api";
import { defReview } from "src/utils/defForm";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";
import { ReviewValidation } from "src/utils/validation";
import { postReview } from "src/services/reviews";
import useRootContext from "src/hooks/use-context";
import AbandonedImg from "src/assets/icons/abandoned.svg";
import BeatenImg from "src/assets/icons/beaten.svg";
import CompletedImg from "src/assets/icons/completed.svg";
import { GameStatus as GameTypes } from "src/types/api";

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
    opacity: 0.7,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  cover: {
    borderRadius: 10,
    height: 170,
    width: 130,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
  dateGame: {
    marginStart: 12,
    ...fontStyle.titleMed,
    color: colors.grey60,
  },
  selectedBack: {
    width: 62,
    height: 62,
    backgroundColor: colors.disabled,
    opacity: 0.15,
    position: "absolute",
    borderRadius: 100,
    alignSelf: "center",
  },
  itemTitle: {
    ...fontStyle.titleMed,
    color: colors.white,
    alignSelf: "center",
    marginTop: 15,
  },
  adviceTitle: {
    ...fontStyle.titleMed,
    color: colors.grey30,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 18,
    paddingHorizontal: 10,
  },
  statesContainer: {
    flexDirection: "row",
    marginTop: 35,
    justifyContent: "space-between",
    alignSelf: "center",
    width: "75%",
  },
});

const NewReviewScreen: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [game, setGame] = useState<IGame>((route.params && route.params.game) || {});
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [rating, setRating] = useState((route.params && route.params.rating) || 0);
  const [gameFeel, setGameFeel] = useState(route.params && route.params.gameFeel);
  const [selected, setSelected] = useState(GameStatus.Beaten);

  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height * 0.6, 80],
    extrapolate: "clamp",
  });

  const { values, errors, setErrors, messages, setMessages, updateForm, onSubmitForm } = useForm(
    defReview,
    ReviewValidation,
    async () => {
      const result = await postReview(
        {
          userId: user.id,
          game,
          summary: values.review,
          rating,
          dateFinished: moment(values.date).unix(),
          timeToBeat: values.timeToBeat,
        },
        selected,
        true
      );
      if (!result.error) {
        const review = result.data.review;
        const diary = result.data.diary;
        const gameFeelRes = result.data.gameFeel;

        let newDiaries = [{ ...diary, gameFeel: gameFeelRes, review }, ...user.diary];
        let gamesCount = user.counts.gamesCount;

        route.params.setRatingReview(review);
        route.params.setGameFeel(gameFeelRes);

        let newGameFeels = [...user.gameFeels];

        if (gameFeel) {
          // remove gameFeel user
          const index = user.gameFeels.indexOf(gameFeelRes._id);
          if (index > -1) {
            newGameFeels.splice(index, 1);
          }
        } else {
          gamesCount = gamesCount + 1;
        }

        newGameFeels = [gameFeelRes, ...newGameFeels];

        setUser({
          ...user,
          diary: [...newDiaries],
          reviews: [diary.review, ...user.reviews],
          gameFeels: [...newGameFeels],
          counts: {
            ...user.counts,
            reviewsCount: user.counts.reviewsCount + 1,
            diaryCounts: user.counts.diaryCounts + 1,
          },
        });

        navigation.goBack();
      }
      setIsLoading(false);
    }
  );

  useEffect(() => {
    const gameFeel = route.params && route.params.gameFeel;
    if (gameFeel && (gameFeel.gameStatus !== GameStatus.Playing || gameFeel.gameStatus !== GameStatus.WantPlay)) {
      setSelected(gameFeel.gameStatus);
    }
  }, []);

  useEffect(() => {
    Object.keys(errors).some(k => {
      if (errors[k]) {
        setIsLoading(false);
      }
    });
  }, [errors]);

  const renderBackground = () => {
    const uri = getImageUrl(game.screenshots && game.screenshots[0].image_id, "t_screenshot_big");
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
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 14 }}>
          <Header
            title={"New Review"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderCover = () => {
    const uri = getImageUrl(game.cover && game.cover.image_id, "t_cover_big");
    return <Image source={{ uri }} style={styles.cover} resizeMode={"contain"} />;
  };

  const renderCalendarModal = () => {
    return (
      <CalendarModal
        isVisible={showCalendarModal}
        onBackPress={() => setShowCalendarModal(false)}
        onAcceptPress={(date: string) => {
          updateForm({ date: moment(date).format("DD/MM/YYYY") });
          setShowCalendarModal(false);
        }}
        startDate={moment().format("YYYY-MM-DD")}
        hasBackdrop
        maxDate={moment().format("YYYY-MM-DD")}
        minDate={moment().subtract(50, "years").format("YYYY-MM-DD")}
        onChange={date => updateForm({ date })}
      />
    );
  };

  const renderInfo = () => {
    return (
      <View style={{ flex: 1, marginEnd: 30 }}>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.title}>
            {game.name}
            {"   "}
            {game.first_release_date && (
              <Text style={styles.dateGame}>{moment.unix(game.first_release_date).format("YYYY")}</Text>
            )}
          </Text>
          <Input
            value={values.date}
            placeholder={"Date finished *"}
            styleContent={{ marginTop: 16 }}
            isCalendar={true}
            errorText={messages.date}
            isError={errors.date}
            onChangeText={date => updateForm({ date })}
            onPressCalendar={() => setShowCalendarModal(true)}
          />
          <Input
            value={values.timeToBeat}
            onChangeText={timeToBeat => updateForm({ timeToBeat })}
            placeholder={"Time to beat - hours"}
            styleContent={{ marginTop: 14 }}
            RightIcon={GameImg}
            errorText={messages.timeToBeat}
            isError={errors.timeToBeat}
          />
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
            <TapRating
              showRating={false}
              defaultRating={rating}
              onFinishRating={(i, index, isSame) => {
                // TODO REFACTOR DELETE
                let rating = 0;
                if (i === index && index == isSame) {
                  rating = index;
                } else if (index === i && isSame === -2) {
                  rating = index + 1 - 0.5;
                } else if (index !== i && isSame === -2) {
                  rating = index + 1;
                } else if (i == -1) {
                  rating = index + 1;
                }
                setRating(rating);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderStates = () => {
    return (
      <>
        <View style={styles.statesContainer}>
          <TouchableOpacity style={{}} onPress={() => setSelected(GameTypes.Beaten)}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {selected === GameTypes.Beaten && <View style={styles.selectedBack} />}
              <BeatenImg width={48} height={42} />
            </View>
            <Text style={styles.itemTitle}>Beaten</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => setSelected(GameTypes.Completed)}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {selected === GameTypes.Completed && <View style={styles.selectedBack} />}
              <CompletedImg width={45} height={43} />
            </View>
            <Text style={styles.itemTitle}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => setSelected(GameTypes.Abandoned)}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: -10 }}>
              {selected === GameTypes.Abandoned && <View style={styles.selectedBack} />}
              <AbandonedImg width={43} height={49} style={{ marginTop: 4 }} />
            </View>
            <Text style={styles.itemTitle}>Abandoned</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.adviceTitle}>
          For the best experience we recomend have played at least 8 hours before review a current Game
        </Text>
      </>
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, paddingHorizontal: 22 }}>
            {renderInfo()}
            {renderCover()}
          </View>
          <View style={{ paddingHorizontal: 22, flex: 1 }}>
            {renderStates()}
            <Input
              styleContent={{ marginTop: 25 }}
              value={values.review}
              onChangeText={review => updateForm({ review })}
              placeholder={"Add Review *"}
              isDescription={true}
              errorText={messages.review}
              isError={errors.review}
            />
            <Button
              title={"Publish"}
              style={{ marginTop: 40, marginBottom: 20 }}
              loading={isLoading}
              disabled={isLoading}
              onPress={() => {
                setIsLoading(true);
                onSubmitForm();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderCalendarModal()}
    </View>
  );
};

export default NewReviewScreen;
