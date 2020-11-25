import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "./Icon";

const style = StyleSheet.create({
	headerView: {
		height: 80,
		backgroundColor: "red",
		alignItems: "flex-end",
		justifyContent: "space-between",
		paddingBottom: 10,
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	titleView: {
		flex: 1,

		alignItems: "center",
		paddingRight: 20,
	},
	titleText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
});
/**
 * component for rendering header of all of the existing pages
 * getting params from React Navigation package
 * in case of route name rendering it
 * in other case "Cars" sign will appear as we're actually have no any other routes
 **/
const Header = ({
	scene: {
		route: { params: { name = false } = {} },
	},
}) => {
	const { goBack } = useNavigation();

	return (
		<View style={style.headerView}>
			<Pressable
				style={{
					width: 20,
					opacity: +!!name,
				}}
				hitSlop={40}
				onPress={() => {
					goBack();
				}}
			>
				<Icon name="arrow-left" color="#fff" size={20} />
			</Pressable>
			<View style={style.titleView}>
				<Text style={style.titleText}>{name || "Автомобили"}</Text>
			</View>
		</View>
	);
};
export default Header;
