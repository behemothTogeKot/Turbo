import React from "react";
import RNVIcon from "react-native-vector-icons/FontAwesome";
RNVIcon.loadFont();

/**
 * Icon render component
 * Created to avoid permanently importing Icon module
 * and for performing font load
 * supports such props as size (Number), name (String), color (string), style (Object)
 **/
const Icon = ({ size, name, color, style }) => {
	const iconProps = { size, name, color, style };
	return <RNVIcon {...iconProps} />;
};

export default Icon;
