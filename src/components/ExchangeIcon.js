import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "./Icon";

const styles = StyleSheet.create({
	defaultStyles: (size) => ({
		position: "absolute",
		width: size + 10,
		height: size + 10,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		paddingVertical: 5,
		borderRadius: size + 10,
	}),
});

/**
 * absolut positioned simple component for barter flag rendering
 * support custom styling by passing style(Object) prop
 * and custom icon size (Number)
 * View that creating circle aroung the icon are also dependent on icon size (size += 10)
 **/
const ExchangeIcon = ({ style, size = 20 }) => {
	return (
		<View style={[styles.defaultStyles(size), style]}>
			<Icon name="exchange" color="#fff" size={size} />
		</View>
	);
};

export default ExchangeIcon;
