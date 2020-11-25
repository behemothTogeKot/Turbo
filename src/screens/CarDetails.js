import React, { useState, useEffect, useMemo, useRef } from "react";

import {
    ScrollView,
    View,
    Text,
    SafeAreaView,
    useWindowDimensions,
    Image,
    ActivityIndicator,
    Animated,
    StyleSheet,
    Linking,
} from "react-native";
import {
    Icon,
    ExchangeIcon,
    DetailsItem,
    DetailsText,
    DetailsContact,
} from "../components";
import { prettifyDate, Red, Lightgray } from "../utils";

const style = StyleSheet.create({
    flexOne: { flex: 1 },
    loadingIndicatorStyles: {
        backgroundColor: "#fff",

        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        bottom: 300,
    },
    imageSectionHeight: {
        height: 300,
    },
    scrollviewContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    datesInfoSection: {
        position: "absolute",
        backgroundColor: "rgba(232,232,232,0.7)",
        borderRadius: 10,
        bottom: 10,
        padding: 10,
    },
    detailsContact: {
        backgroundColor: "orange",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
const allowedCategories = {
    price: "Цена",
    category: "Категория",
    color: "Цвет",
    engine_volume: "Объем двигателя",
    fuel_type: "Топливо",
    gear: "Привод",
    name: "Модель",
    region: "Расположение",
    transmission: "Коробка передач",
};

const prettifyData = (data) => {
    const reduceDetails = (accumulator, currentValue) => {
        return {
            ...accumulator,
            ...{
                [currentValue]: data[currentValue]?.name || data[currentValue],
            },
        };
    };
    return Object.keys(data).reduce(reduceDetails, {});
};

const CarDetails = ({ route: { params } }) => {
    /* standing alone properties for use */
    const { contact, barter, photos } = params;

    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const animatedHeight = useRef(new Animated.Value(300)).current;
    /*
        lightweighted car object params
        with prettifyData we're removing useless for this component fields 
        and creating new Array instead of object so it might be filtered
        later or used with map method
    */
    const details = useMemo(() => prettifyData(params), [params]);

    const bumped = useMemo(
        () => `Размещено ${prettifyDate(details.bumped_at)}`,
        [details]
    );
    const updated = useMemo(
        () => `Обновлено ${prettifyDate(details.updated_at)}`,
        [details]
    );
    /*
        to avoid copypasting we're filtering some categories that has to be showed
        with the same UI, in some cases adding measure for the value String, 
        or changing value in case of necessity in regards of needs
    */
    const filteredDetails = useMemo(
        () =>
            Object.keys(allowedCategories).map((key) => {
                let value = details[key];
                if (key === "engine_volume") {
                    value = `${details[key] / 1000} L`;
                }
                if (key === "price") {
                    value = `${details[key]} ${details.currency.toUpperCase()}`;
                }

                return [allowedCategories[key], value, key];
            }),
        [details]
    );
    const windowWidth = useWindowDimensions().width;

    const hideLoadingIndicator = () => {
        Animated.sequence([
            Animated.timing(animatedOpacity, {
                toValue: 0,
                delay: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(animatedHeight, {
                toValue: 0,
                delay: 1000,
                useNativeDriver: false,
            }),
        ]).start();
    };
    const onLoadEnd = (index) => index === 0 && hideLoadingIndicator();

    const callToNumber = (number) => {
        Linking.openURL(`tel:${number}`);
    };
    return (
        <SafeAreaView style={[style.flexOne, { backgroundColor: Lightgray }]}>
            <View style={{ flex: 1 }}>
                <View style={style.imageSectionHeight}>
                    <View
                        style={[
                            style.imageSectionHeight,
                            style.scrollviewContainer,
                        ]}
                    >
                        <ScrollView
                            horizontal
                            contentContainerStyle={style.imageSectionHeight}
                        >
                            {photos.map((uri, index) => (
                                <View key={uri} style={{ width: windowWidth }}>
                                    <Image
                                        onLoadEnd={() => {
                                            onLoadEnd(index);
                                        }}
                                        source={{ uri }}
                                        style={{
                                            flex: 1,
                                            resizeMode: "cover",
                                        }}
                                    />
                                </View>
                            ))}
                        </ScrollView>

                        {barter && (
                            <ExchangeIcon style={{ bottom: 5, left: 10 }} />
                        )}
                        <View style={style.datesInfoSection}>
                            <DetailsText text={bumped} bold />
                            <DetailsText text={updated} bold />
                        </View>
                    </View>
                    <Animated.View
                        style={[
                            style.loadingIndicatorStyles,
                            {
                                height: animatedHeight,
                                opacity: animatedOpacity,
                            },
                        ]}
                    >
                        <ActivityIndicator size="large" color={Red} />
                    </Animated.View>
                </View>
                <ScrollView
                    style={style.flexOne}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {filteredDetails.map((content, index) => {
                        return (
                            <DetailsItem
                                key={content[0]}
                                content={content}
                                index={index}
                            />
                        );
                    })}
                    <DetailsItem
                        content={[, Object.values(details.extras)]}
                        index={filteredDetails.length}
                        title={"top"}
                    />
                    <DetailsItem
                        content={["Описание", details.description]}
                        title={"top"}
                        border={false}
                    />
                    <View style={style.detailsContact}>
                        <DetailsContact
                            text={contact.name}
                            icon="user"
                            border
                        />
                        {contact.phones &&
                            contact.phones.map((phone, index) => (
                                <DetailsContact
                                    onPress={() => callToNumber(phone)}
                                    key={phone}
                                    text={phone}
                                    icon="phone"
                                    border={contact.phones.length !== index + 1}
                                />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default CarDetails;
