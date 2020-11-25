import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { Gray, Lightgray, Red } from "../utils";

const style = StyleSheet.create({
	detailsText: {
		fontSize: 14,
	},
	detailsItem: (border) => ({
		minHeight: 60,
		width: "100%",
		borderBottomWidth: border ? 2 : 0,
		borderColor: Gray,
		padding: 10,
	}),
	conditionalStyles: ({ title, index }) => ({
		backgroundColor: (index + 1) % 2 !== 0 ? Lightgray : "#fff",
		alignItems: title === "center" ? "center" : "flex-start",
		flexDirection: title === "center" ? "row" : "column",
	}),
	detailsContact: (border) => ({
		flexDirection: "row",
		alignItems: "center",
		height: 40,
		padding: 10,
		borderColor: Lightgray,
		borderBottomWidth: +border,
	}),
});

/**
 * Simple component for styled text (String) rendering
 * Supports fontWeight setting by passing bold param (Boolean)
 **/
export const DetailsText = ({ text, bold = false }) => (
	<Text style={[style.detailsText, { fontWeight: bold ? "bold" : "normal" }]}>
		{text}
	</Text>
);

/**
 * Component that rendering only allowed categories
 * content should be Array with at least two items inside
 * they are category name and corresponding value
 * supports borderBottom  enabling by passing border (Boolean) param
 * supports setting of the background in regards of current item index (Number) in list
 **/
export const DetailsItem = ({
	content,
	index,
	title = "center",
	border = true,
}) => {
	const [category, value] = content;
	return (
		<View
			style={[
				style.detailsItem(border),
				style.conditionalStyles({ title, index }),
			]}
		>
			{category && (
				<View
					style={{
						width: "50%",
					}}
				>
					<DetailsText bold text={category} />
				</View>
			)}
			{!Array.isArray(value) ? (
				<DetailsText text={value} />
			) : (
				value.map((i) => (
					<View
						key={i.name}
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Icon name="circle" color="#000" size={5} />
						<DetailsText text={` ${i.name}`} />
					</View>
				))
			)}
		</View>
	);
};

/**
 * contact items component for car details page
 * pressable in case of necessity, onPress event will be fired
 * if there is no onPress prop then TouchableOpacity will be disabled
 * supports passing of onPress (Function) prop, icon name (String), border(Boolean) appearing
 **/
export const DetailsContact = ({ text, icon, border = true, onPress }) => {
	return (
		<TouchableOpacity
			disabled={!onPress}
			onPress={onPress}
			style={style.detailsContact(border)}
		>
			<Icon
				name={icon}
				size={20}
				color={Red}
				style={{ marginRight: 5 }}
			/>
			<DetailsText text={text} bold />
		</TouchableOpacity>
	);
};
export default DetailsItem;
