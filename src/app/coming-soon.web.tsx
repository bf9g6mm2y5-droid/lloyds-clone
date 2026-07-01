import { Button } from "@/components/ui";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ComingSoonPage() {
  return (
    <View className="flex-1 items-center justify-center gap-y-5 bg-white">
      <Image
        source={require("@assets/images/logo.png")}
        style={{ width: 100, height: 100, aspectRatio: 1, marginBottom: 10 }}
      />
      <ComingSoonText />
      <Text className="text-center italic">
        This is a demo app, there are some features yet to be implemented
      </Text>
      <Link href="/(root)/(tabs)/(home)/(tabs)" asChild>
        <Button
          label="Go Home"
          size="lg"
          className="mx-10 flex-row-reverse items-center justify-between self-stretch bg-green-600 active:bg-green-600"
        >
          <Text className="text-lg font-semibold text-white">{"/ >"}</Text>
        </Button>
      </Link>
    </View>
  );
}

const ComingSoonText = () => {
  return (
    <View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 56,
          fontWeight: "900",
          textTransform: "uppercase",
          textAlign: "center",
          backgroundImage: "linear-gradient(135deg, #16a34a, #20252b, #16a34a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        } as any}
      >
        Coming Soon
      </Text>
    </View>
  );
};
