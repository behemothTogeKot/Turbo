/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import "react-native-gesture-handler";
import { Red } from "./src/utils";

/*
  used to be able to see requests/responses in debugger tab at browser
*/
if (__DEV__) {
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Red} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
};

export default App;
