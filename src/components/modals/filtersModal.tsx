import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewProps, ScrollView } from "react-native";
import Modal from "react-native-modal";
import CheckBox from "@react-native-community/checkbox";
import { colors, dimensions, fontStyle } from "src/assets";
import CrossImg from "src/assets/icons/cross";
import Button from "src/components/buttons";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...fontStyle.headerTitle,
    color: colors.white,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 32,
    height: 32,
    position: "absolute",
  },
  circleContainer: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
    position: "absolute",
    right: 15,
  },
  titleSection: {
    ...fontStyle.titleMed,
    color: colors.white,
  },
  marketStyle: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.blue100,
    height: 13,
    width: 13,
  },
  rangeText: {
    ...fontStyle.menuLabel,
    color: colors.white,
  },
  buttonContainer: {
    backgroundColor: colors.grey50,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginEnd: 16,
  },
});

export interface IFiltersModal extends ViewProps {
  showModal?: boolean;
  apllyFilters: () => void;
  setShowModal: (isShown: boolean) => void;
}

const FiltersModal: FC<IFiltersModal> = ({ showModal, apllyFilters, setShowModal }) => {
  const [rangeBox, setRangeBox] = useState(false);
  const [yearsValues, setYearsValues] = useState([1958, 2010]);
  const [ratingValues, setRatingValues] = useState([0, 5]);
  const [modes, setModes] = useState<string[]>([]);
  const [perspectives, setPerspectives] = useState<string[]>([]);

  const renderContent = () => {
    return (
      <View style={{ marginTop: 20 }}>
        {renderRangeYears()}
        {renderRatings()}
        {renderModes()}
        {renderFooter()}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 40 }}>
        <Button title={"Reset filters"} backgroundColor={colors.white} color={colors.black} />
        <Button title={"Apply filters"} style={{ marginTop: 14 }} />
      </View>
    );
  };

  const renderRangeYears = () => {
    return (
      <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.titleSection}>Range of years</Text>
          <CheckBox
            disabled={false}
            value={rangeBox}
            onValueChange={newValue => {
              setRangeBox(newValue);
            }}
            onCheckColor={colors.white}
            onFillColor={colors.blue100}
            onTintColor={colors.blue100}
            tintColor={colors.blue100}
            tintColors={{ true: colors.blue100, false: colors.blue100 }}
            style={{ transform: [{ scale: 0.8 }] }}
          />
        </View>
        <MultiSlider
          values={yearsValues}
          sliderLength={350}
          min={1958}
          max={2021}
          step={1}
          onValuesChange={values => setYearsValues(values)}
          allowOverlap={false}
          containerStyle={{ paddingHorizontal: 6 }}
          trackStyle={{ backgroundColor: colors.white, borderRadius: 10, height: 3 }}
          selectedStyle={{ backgroundColor: colors.blue100 }}
          markerStyle={styles.marketStyle}
        />
        <Text style={styles.rangeText}>
          Between <Text style={{ ...fontStyle.titleBold, fontSize: 14 }}>{yearsValues[0]}</Text> and{" "}
          <Text style={{ ...fontStyle.titleBold, fontSize: 14 }}>{yearsValues[1]}</Text>
        </Text>
      </>
    );
  };

  const renderRatings = () => {
    return (
      <>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}>
          <Text style={styles.titleSection}>Range of years</Text>
          <CheckBox
            disabled={false}
            value={rangeBox}
            onValueChange={newValue => {
              setRangeBox(newValue);
            }}
            onCheckColor={colors.white}
            onFillColor={colors.blue100}
            onTintColor={colors.blue100}
            tintColor={colors.blue100}
            tintColors={{ true: colors.blue100, false: colors.blue100 }}
            style={{ transform: [{ scale: 0.8 }] }}
          />
        </View>
        <MultiSlider
          values={ratingValues}
          sliderLength={350}
          min={0}
          max={10}
          step={1}
          onValuesChange={values => setRatingValues(values)}
          allowOverlap={false}
          containerStyle={{ paddingHorizontal: 6 }}
          trackStyle={{ backgroundColor: colors.white, borderRadius: 10, height: 3 }}
          selectedStyle={{ backgroundColor: colors.blue100 }}
          markerStyle={styles.marketStyle}
        />
        <Text style={styles.rangeText}>
          Between <Text style={{ ...fontStyle.titleBold, fontSize: 14 }}>{ratingValues[0]}</Text> and{" "}
          <Text style={{ ...fontStyle.titleBold, fontSize: 14 }}>{ratingValues[1]}</Text>
        </Text>
      </>
    );
  };

  const renderModes = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={styles.titleSection}>Modes</Text>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {renderButtonItem("Battle Royale", true)}
          {renderButtonItem("Co-operative", true)}
          {renderButtonItem("MMO", true)}
        </View>
        <View style={{ flexDirection: "row", marginTop: 12, marginBottom: 20 }}>
          {renderButtonItem("Multiplayer", true)}
          {renderButtonItem("Single player", true)}
          {renderButtonItem("Split screen", true)}
        </View>
        <Text style={styles.titleSection}>Perspectives</Text>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {renderButtonItem("Auditory")}
          {renderButtonItem("Bird view")}
          {renderButtonItem("First person")}
        </View>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {renderButtonItem("Side view")}
          {renderButtonItem("Text")}
          {renderButtonItem("Virtual Reality")}
        </View>
      </View>
    );
  };

  const renderButtonItem = (title: string, isMode: boolean = false) => {
    const dataList = isMode ? modes : perspectives;
    const exist = dataList.find(item => item === title);
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: exist ? colors.blue100 : colors.grey50 }]}
        onPress={() => {
          if (isMode) {
            exist ? setModes([...modes.filter(item => item !== title)]) : setModes([...modes, title]);
          } else {
            exist
              ? setPerspectives([...perspectives.filter(item => item !== title)])
              : setPerspectives([...perspectives, title]);
          }
        }}
      >
        <Text style={{ ...fontStyle.titleMed, color: colors.white }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={showModal} backdropOpacity={1} style={{ flex: 1, margin: 0, backgroundColor: colors.grey80 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity style={[styles.circleContainer, { marginEnd: 5 }]} onPress={() => setShowModal(false)}>
          <View style={styles.circle} />
          <CrossImg fill={colors.white} width={12} height={13} style={{ marginBottom: 1 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 30 }}>
        {renderContent()}
      </ScrollView>
    </Modal>
  );
};

export default FiltersModal;
