import { Image } from "expo-image";
import * as ExpoSplashScreen from "expo-splash-screen";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useCallback, useState } from "react";
import { useAuth } from "@/store";
import { Redirect } from "expo-router";
import { useAccountsQuery } from "@/hooks";

export const SplashScreen = ({ imageUri }: { imageUri: string }) => {
  const [isAppReady, setAppReady] = useState(false);

  const { authenticated } = useAuth();

  const {
    userQuery: { error, status },
  } = useAccountsQuery({ user: { enabled: authenticated } });

  const onImageLoaded = useCallback(async () => {
    try {
      await ExpoSplashScreen.hideAsync();
    } finally {
      setAppReady(true);
    }
  }, []);

  if (error) {
    console.log(error);
  }

  return (
    <View className="flex-1">
      {error && <Redirect href="/error" />}
      {!error && isAppReady &&
        (authenticated ? (
          status === "success" && <Redirect href="/(root)/(tabs)" />
        ) : (
          <Redirect href="/(auth)" />
        ))}

      <View className="flex-1 items-center justify-center gap-y-2 bg-[#12b77b]">
        <Image
          style={styles.image}
          source={imageUri}
          contentFit="contain"
          onLoad={onImageLoaded}
        />

        <View className="absolute bottom-1/4">
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
