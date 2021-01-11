import React, { FC, useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle, FlatList, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/min/locales";
import Modal from "react-native-modal";

import { colors, fontStyle, dimensions, fonts } from "../../assets/index";
import { getLangFile } from "src/utils/text";
import useRootContext from "src/hooks/use-context";
// import BigArrowRight from "src/assets/icons/big_arrow_right.svg";
// import BigArrowLeft from "src/assets/icons/big_arrow_left.svg";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Button from "src/components/buttons";
import { formatString, dateToString } from "src/utils/time";

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  content: {
    margin: 0,
    paddingTop: 59,
    width: "100%",
    height: "100%",
    backgroundColor: colors.grey80,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 65,
    paddingHorizontal: 16,
    marginBottom: 19,
  },
  year: {
    ...fontStyle.smallTitle,
    color: colors.blue100,
    textDecorationLine: "underline",
  },
  month: {
    ...fontStyle.midTitle,
    fontFamily: fonts.robotoMedium,
    color: colors.white,
    textTransform: "capitalize",
    marginTop: 2,
    marginBottom: 26,
  },
  yearsContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "63%",
    marginTop: 95,
    alignSelf: "center",
    backgroundColor: colors.grey80,
  },
  yearItem: {
    width: "20%",
    paddingVertical: "4%",
    alignItems: "center",
    backgroundColor: colors.grey80,
  },
  yearTouchable: {},
  textYear: {
    ...fontStyle.titleMed,
    fontFamily: fonts.robotoRegular,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    color: colors.white,
  },
  active: {
    backgroundColor: colors.blue100,
    color: colors.white,
  },
});

export interface IHeaderProps {
  titleStyle?: TextStyle | TextStyle;
  componentStyle?: ViewStyle | ViewStyle[];
  minDate?: string;
  maxDate?: string;
  current?: string;
  startDate?: string;
  isVisible?: boolean;
  hasBackdrop?: boolean;
  onBackPress?: () => void;
  onAcceptPress?: (date: string) => void;
  onChange?: (date: string) => void;
}

const CalendarModal: FC<IHeaderProps> = props => {
  const {
    langState: [lang],
  } = useRootContext();
  const langFile = getLangFile(lang);

  LocaleConfig.locales["es"] = langFile.calendarObject;
  LocaleConfig.defaultLocale = "es";
  moment.locale(lang);

  const {
    componentStyle = {},
    titleStyle = {},
    isVisible = false,
    onBackPress,
    onAcceptPress,
    hasBackdrop,
    maxDate,
    minDate,
    onChange,
    startDate,
    ...params
  } = props;

  const [current, setCurrent] = useState(startDate ? startDate : moment().subtract(18, "years").format("YYYY-MM-DD"));
  const [showYears, setShowYears] = useState(false);
  const [yearSelected, setYearSelected] = useState(0);
  const [yearValues, setYearValues] = useState([]);
  const input = useRef(null);

  useEffect(() => {
    fillYears();
  }, []);

  useEffect(() => {
    if (yearSelected !== 0) {
      const newDate = moment(current, "YYYY-MM-DD").set("year", yearSelected).format("YYYY-MM-DD");
      setCurrent(newDate);
      if (input.current) {
        input.current.pressDay(newDate);
      }
    }
  }, [yearSelected]);

  const fillYears = () => {
    const startYear = parseInt(moment().subtract(18, "years").format("YYYY"));
    const finishYear = startYear - 100;
    for (let i = startYear; i > finishYear; i--) {
      yearValues.push(i);
      setYearValues(yearValues);
    }
  };

  const renderYears = () => {
    return (
      <View style={styles.yearsContainer}>
        <Text
          style={{ ...fontStyle.titleMed, alignSelf: "center", marginTop: 4, marginBottom: 24, color: colors.white }}
        >
          {"Select the year you want"}
        </Text>
        <FlatList
          data={yearValues}
          renderItem={renderItemYears}
          showsVerticalScrollIndicator={false}
          keyExtractor={value => value + Math.random() * 1000}
          style={{ flex: 1, alignSelf: "center" }}
          numColumns={5}
        />
      </View>
    );
  };

  const renderItemYears = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.yearItem}
        onPress={() => {
          setYearSelected(item);
        }}
      >
        <Text style={[styles.textYear, yearSelected === item && styles.active]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderCalendar = () => {
    return (
      <Calendar
        ref={input}
        style={{ backgroundColor: colors.grey80 }}
        current={current}
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={({ timestamp }: any) => {
          setCurrent(moment(timestamp).format("YYYY-MM-DD"));
        }}
        markedDates={{ [moment(current).format("YYYY-MM-DD")]: { selected: true } }}
        firstDay={1}
        // renderArrow={direction => {
        //   return direction === "left" ? <BigArrowLeft /> : <BigArrowRight />;
        // }}
        renderHeader={(date: any) => {
          return (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setShowYears(!showYears);
                }}
              >
                <Text style={styles.year}>{dateToString(date, formatString.yyyy)}</Text>
              </TouchableOpacity>
              <Text style={styles.month}>{dateToString(date, formatString.MMMM)}</Text>
            </View>
          );
        }}
        theme={{
          backgroundColor: colors.grey80,
          calendarBackground: colors.grey80,
          selectedDayBackgroundColor: colors.blue100,
          selectedDayTextColor: "#ffffff",
          textDayFontFamily: "Roboto-Regular",
          dayTextColor: colors.white,
          textDayFontSize: 14,
          arrowColor: colors.white,
          textDayHeaderColor: colors.blue100,
          textDayHeaderFontFamily: "Roboto-Regular",
          textDayHeaderFontSize: 13,
          textSectionTitleColor: colors.blue100,
        }}
      />
    );
  };

  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      hasBackdrop={hasBackdrop}
      onBackButtonPress={() => onBackPress()}
      {...params}
    >
      <View style={[styles.content, { ...componentStyle }]}>
        <View>{renderCalendar()}</View>
        {showYears && renderYears()}
        <View style={styles.buttonsContainer}>
          <Button
            title={"Select"}
            onPress={() => {
              showYears ? setShowYears(false) : onAcceptPress(current);
            }}
          />
          <Button
            style={{ marginTop: 24 }}
            backgroundColor={colors.grey50}
            title={"Cancel"}
            onPress={() => onBackPress()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
