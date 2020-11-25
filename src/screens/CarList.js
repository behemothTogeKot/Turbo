import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  Animated,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { getCars } from "../axios";
import { CarListItem } from "../components";
import { Red } from "../utils";

const style = StyleSheet.create({
  scrollView: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexOne: { flex: 1 },
  loadingIndicator: {
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Separator = ({ text }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        height: 40,
        backgroundColor: "#E8E8E8",
        width: "100%",
        padding: 10,
        margin: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
const CarList = ({ navigation, route }) => {
  /*variable used for refreshControl to show/hide top activity indicator*/
  const [refreshing, setRefreshing] = useState(false);
  const windowHeight = useWindowDimensions().height;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const [ads, setAds] = useState([]);
  const [vips, setVips] = useState([]);
  const [cursor, setCursor] = useState(null);
  /*variable used for refreshControl to show/hide bottom activity indicator*/
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      getItems({ cursor });
    }
  }, [isLoading]);

  useEffect(() => {
    getItems();
  }, []);

  const clearIndicators = () => {
    setIsLoading(false);
    setRefreshing(false);
  };

  const onPress = (carData) => {
    navigation.navigate({ name: "CarDetails", params: carData });
  };

  const onSuccess = (response) => {
    const {
      data: { ads, vips, ads_count },
    } = response;
    setCursor(ads[ads.length - 1]?.cursor);
    setAds((prevAds) => (cursor ? [...prevAds, ...ads] : ads));
    setVips(vips);
    if (cursor) {
      animateLoader(0);
      return;
    }
    clearIndicators();
    return response;
  };

  const onError = (error) => {
    clearIndicators();
  };
  /*
    fired on component mounting with useEffect
    in case of cursor arg existing firing the animateLoader method
    by this hiding bottom loading indicator
    also used for refreshing of car list in case of pull-to-refresh
  */
  const getItems = (params = {}) => {
    const { cursor = false } = params;
    return getCars(params).then(onSuccess).catch(onError);
  };
  /* fired on pull-to-refresh*/
  const onRefresh = () => {
    setRefreshing(true);
    getItems();
  };
  /* handle bottom activityLoader appearing/disappearing*/
  const animateLoader = (value, callback) => {
    Animated.timing(animatedOpacity, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setIsLoading(!!value);
      if (callback) {
        callback();
      }
    });
  };
  /**
   * fired on the scroll end, onMomentumScrollEnd was used for firing
   * exactly when the scroll ends to avoid multiple request of cars list
   **/
  const onScrollEnd = ({ nativeEvent }) => {
    if (isLoading) return;

    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const closeToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (closeToBottom) {
      animateLoader(1);
    }
  };
  /* handling the activityLoader bottom height, dependent on animatedOpacity*/
  const animatedHeight = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  return (
    <SafeAreaView style={[style.flexOne, { backgroundColor: Red }]}>
      <ScrollView
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollEnd}
        refreshControl={
          <RefreshControl
            tintColor={"#fff"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={style.flexOne}
        contentContainerStyle={style.scrollView}
      >
        {!vips.length && !ads.length && (
          <View
            style={{
              justifyContent: "center",
              paddingBottom: 80,
              height: windowHeight,
              transform: [{ scale: 1.3 }],
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <Separator text={"Vip"} />
        {vips.map((item) => (
          <CarListItem
            key={item.id}
            car={item}
            onPress={() => {
              onPress(item);
            }}
            vip
          />
        ))}
        <Separator text={"Standard"} />
        {ads.map((item) => (
          <CarListItem
            key={item.id}
            car={item}
            onPress={() => {
              onPress(item);
            }}
          />
        ))}
        <Animated.View
          style={[
            style.loadingIndicator,
            { height: animatedHeight, opacity: animatedOpacity },
          ]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CarList;
