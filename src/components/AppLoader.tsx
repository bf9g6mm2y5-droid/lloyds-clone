import { useEffect } from "react";
import { SplashScreen } from "./ui";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { useAssets } from "expo-asset";

export default function AppLoader() {
  const [loaded, fontError] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [assets, assetsError] = useAssets([
    require("@assets/images/splash-icon.png"),
  ]);

  useEffect(() => {
    if (fontError) throw fontError;

    if (assetsError) throw assetsError;
  }, [assetsError, fontError]);

  if (!loaded || !assets) {
    return null;
  }

  return <SplashScreen imageUri={assets[0].uri} />;
}
