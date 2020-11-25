import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "../components";
import { CarList, CarDetails } from "../screens";

const Stack = createStackNavigator();
const navigatorProps = {
	initialRouteName: "CarList",

	screenOptions: {
		header: ({ navigation, scene }) => {
			const headerProps = {
				navigation,
				scene,
			};
			return <Header {...headerProps} />;
		},
	},
};
export const Routes = () => {
	return (
		<Stack.Navigator {...navigatorProps}>
			<Stack.Screen name="CarList" component={CarList} />
			<Stack.Screen name="CarDetails" component={CarDetails} />
		</Stack.Navigator>
	);
};
