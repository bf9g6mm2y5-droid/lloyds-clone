import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingScreen = () => {
  return (
    <View
      className="z-10 flex-1 items-center justify-center"
      style={{
        backgroundColor: "#0000004e",
        ...StyleSheet.absoluteFillObject,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export const NewPayeeLoadingScreen = () => {
  return <View />;
};
