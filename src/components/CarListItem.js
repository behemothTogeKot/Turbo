import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "./Icon";
import ExchangeIcon from "./ExchangeIcon";
import { prettifyDate, Red, Gray, Lightgray } from "../utils";

const style = StyleSheet.create({
  carItem: {
    width: "48%",
    height: 250,
    marginTop: 5,
    borderColor: Gray,
    borderWidth: 2,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "row",
    height: 170,
    justifyContent: "space-between",
  },
  price: { justifyContent: "flex-end" },
  priceText: {
    backgroundColor: Red,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  indicatorView: {
    backgroundColor: "#fff",
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  infoSection: {
    height: 80,
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});

/**
 * Components requires "car" Object
 * Component are pressable, onPress will be fired on tap
 **/
const CarListItem = ({ car, onPress, vip = false }) => {
  const { name, price, photo, currency, updated_at, region, barter } = car;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const prettifiedDate = useMemo(() => prettifyDate(updated_at), [updated_at]);
  /**
   * Image will appear only on load
   * Until loading is going the fallback with activity indicator will appear
   **/
  const showPhoto = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity onPress={onPress} style={[style.carItem]}>
      <ImageBackground
        onLoadEnd={showPhoto}
        source={{ uri: photo }}
        style={style.imageBackground}
      >
        <View style={style.price}>
          <Text style={style.priceText}>
            {`${price} ${currency.toUpperCase()}`}
          </Text>
        </View>
        <View style={{ marginRight: 10 }}>
          {vip && <Icon name="bookmark" size={40} color={Red} />}
        </View>
        {barter && <ExchangeIcon style={{ top: 5, left: 10 }} />}
      </ImageBackground>

      <Animated.View
        style={[style.indicatorView, { opacity: animatedOpacity }]}
      >
        <ActivityIndicator size="large" color={Red} />
      </Animated.View>

      <View style={style.infoSection}>
        <Text>{name}</Text>
        <Text>Находится в: {region?.name}</Text>

        <Text style={{ fontSize: 12, color: Gray }}>
          Обновлено: {prettifiedDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CarListItem;
