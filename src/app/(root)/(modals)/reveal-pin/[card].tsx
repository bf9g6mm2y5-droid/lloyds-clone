import LCBankCard from "@/components/cards/BankCard";
import { Header } from "@/components/headers";
import { sampleBankCards } from "@/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const bankCards = sampleBankCards;
export default function ViewPINModal() {
  const { card: indexAsString } = useLocalSearchParams<{ card: string }>();
  const selectedIndex = Number(indexAsString);

  const router = useRouter();

  const reveal = useSharedValue(false);
  const animatedRevealStyle = useAnimatedStyle(() => {
    const opacity = withTiming(reveal.value ? 0 : 1);

    return { opacity };
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.dismiss();
      router.navigate({
        pathname: "/view-pin",
        params: {
          timeout: String(true),
        },
      });
    }, 10000); // times out after 10 seconds

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <View className="mb-10 flex-1 px-4 py-5">
      <Stack.Screen
        options={{
          title: "View PIN",
          headerStyle: { backgroundColor: "red" },
          header: (props) => (
            <Header useSafeArea={false} showClose title="View PIN" {...props} />
          ),
        }}
      />

      <View className="mb-16 flex-1">
        <LCBankCard {...bankCards[selectedIndex]} className="h-fit" />

        <View className="flex-1" />

        {/* Revealing component */}
        <View className="my-5 self-center overflow-hidden rounded-xl bg-gray-400 px-7 py-5">
          <Text className="text-center text-2xl font-semibold tracking-widest">
            0000
          </Text>
          <Animated.View
            style={animatedRevealStyle}
            className="absolute inset-0 z-10 bg-gray-700"
          />
        </View>

        <Pressable
          onPressIn={() => (reveal.value = true)}
          onPressOut={() => (reveal.value = false)}
          className="items-center rounded-xl bg-black py-4"
        >
          <Text className="text-xl font-semibold tracking-wider text-white">
            Reveal PIN
          </Text>
        </Pressable>

        <Text className="mx-auto mt-4 w-3/4 text-center text-sm">
          Tap and hold to reveal. You can change your PIN at any Lloyds
          Cashpoint®️.
        </Text>
      </View>
    </View>
  );
}
