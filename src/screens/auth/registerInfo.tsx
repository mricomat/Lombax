import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import "moment/min/locales";

import { colors } from "src/assets";
import Button from "src/components/buttons";
import RegisterHeader from "src/components/headers/registerHeader";
import Input from "src/components/inputs/simple";
import CalendarModal from "src/components/modals/calendar";
import { useForm } from "src/hooks/use-form";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { defInfoRegister } from "src/utils/defForm";
import { InfoRegisterValidation } from "src/utils/validation";
import { registerCheck } from "src/services/auth";
import useRootContext from "src/hooks/use-context";
import { getLangFile } from "src/utils/text";

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
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const langFile = getLangFile(lang);
  moment.locale(lang);

  const { values, errors, setErrors, messages, setMessages, updateForm, onSubmitForm } = useForm(
    defInfoRegister,
    InfoRegisterValidation,
    async () => {
      const { data } = await registerCheck(values.email, values.username);
      if (data.isValid) {
        navigation.navigate(routeNames.RegisterInterests, { user: values });
      } else {
        const newErrors = errors;
        const newMessages = messages;
        if (data.username) {
          newErrors.username = true;
          newMessages.username = "Username already taken";
        }
        if (data.email) {
          newErrors.email = true;
          newMessages.email = "Email already taken";
        }
        setErrors(newErrors);
        setMessages(messages);
      }
      setIsLoading(false);
    }
  );

  useEffect(() => {
    Object.keys(errors).some(k => {
      if (errors[k]) {
        setIsLoading(false);
      }
    });
  }, [errors]);

  const renderCalendarModal = () => {
    return (
      <CalendarModal
        isVisible={showCalendarModal}
        onBackPress={() => setShowCalendarModal(false)}
        onAcceptPress={(date: string) => {
          updateForm({ birth: moment(date).format("DD/MM/YYYY") });
          setShowCalendarModal(false);
        }}
        hasBackdrop
        maxDate={moment().subtract(18, "years").format("YYYY-MM-DD")}
        onChange={date => updateForm({ birth: date })}
      />
    );
  };

  const renderInfo = () => {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <Animated.ScrollView
            style={{}}
            scrollEventThrottle={2}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
            contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 22, paddingTop: 15 }}
            showsVerticalScrollIndicator={false}
          >
            <Input
              placeholder={"Name *"}
              value={values.name}
              isError={errors.name}
              autoFocus={false}
              onChangeText={name => updateForm({ name })}
              errorText={messages.name}
            />
            <Input
              placeholder={"Last name"}
              value={values.lastName}
              isError={errors.lastName}
              autoFocus={false}
              onChangeText={lastName => updateForm({ lastName })}
              errorText={messages.lastName}
              styleContent={{ marginTop: 20 }}
            />
            <Input
              placeholder={"Username *"}
              value={values.username}
              isError={errors.username}
              autoFocus={false}
              onChangeText={username => updateForm({ username })}
              errorText={messages.username}
              styleContent={{ marginTop: 20 }}
            />
            <Input
              placeholder={"Email *"}
              value={values.email}
              isError={errors.email}
              autoFocus={false}
              onChangeText={email => updateForm({ email })}
              errorText={messages.email}
              styleContent={{ marginTop: 20 }}
            />

            <Input
              placeholder={"Birth *"}
              value={values.birth}
              isError={errors.birth}
              autoFocus={false}
              isCalendar={true}
              onChangeText={birth => updateForm({ birth })}
              errorText={messages.birth}
              styleContent={{ marginTop: 20 }}
              onPressCalendar={() => setShowCalendarModal(true)}
            />
            <Input
              placeholder={"Password *"}
              value={values.password}
              isError={errors.password}
              onChangeText={password => updateForm({ password })}
              errorText={messages.password === langFile.Matches ? langFile.passwordFormat : messages.password}
              autoFocus={false}
              autoCapitalize="none"
              secureTextEntry={true}
              styleContent={{ marginTop: 20 }}
            />
            <Input
              placeholder={"Brief description or quote"}
              value={values.description}
              isError={errors.description}
              autoFocus={false}
              isDescription
              descriptionHeigth={180}
              onChangeText={description => updateForm({ description })}
              errorText={messages.description}
              styleContent={{ marginTop: 20 }}
            />
            <Button
              title={"Next"}
              onPress={() => {
                setIsLoading(true);
                onSubmitForm();
              }}
              style={{ marginTop: 40 }}
              loading={isLoading}
              disabled={isLoading}
            />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <RegisterHeader
        title={"Welcome to Lombax"}
        onBackPress={() => navigation.goBack()}
        scrollY={scrollY}
        titleDes={"Start sharing all your gaming experience"}
        stepInfo={"Step 1: Fill all this information"}
        step={0}
      />
      {renderInfo()}
      {renderCalendarModal()}
    </View>
  );
};

export default RegisterScreen;
