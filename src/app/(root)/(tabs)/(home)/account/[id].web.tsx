import { AccountSummary } from "@/components/Transactions";
import { AnimatedHeader } from "@/components/headers";
import { useAccountQuery } from "@/hooks";
import { useLoadingScreen } from "@/store";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const Page = () => {
  const { id, name: accountName } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();

  const { setLoading } = useLoadingScreen();
  const { data, isLoading } = useAccountQuery(id);
  const scrollOffset = useSharedValue(0);
  const threshold = useSharedValue(0);

  useEffect(() => {
    setLoading(isLoading || !data);
  }, [data, isLoading, setLoading]);

  const [activeMonth, setActiveMonth] = useState(0);

  if (isLoading || !data) return null;

  const { account, timeline } = data;
  if (!account || !timeline) return null;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: accountName,
          header: (props) => (
            <AnimatedHeader
              balance={account.balance}
              scrollOffset={scrollOffset}
              threshold={threshold}
              {...props}
            />
          ),
        }}
      />

      <ScrollView>
        <AccountSummary {...account} />

        {/* Month tab bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-b border-gray-200 bg-white"
        >
          {timeline.map((month, index) => (
            <Pressable
              key={month}
              onPress={() => setActiveMonth(index)}
              className="px-5 py-4"
              style={{
                borderBottomWidth: activeMonth === index ? 2 : 0,
                borderBottomColor: "#000",
              }}
            >
              <Text
                className={
                  activeMonth === index ? "font-semibold" : "text-gray-500"
                }
              >
                {month}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Content for selected month */}
        <FlatList
          scrollEnabled={false}
          data={Array.from({ length: 20 }, (_, i) => i)}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <View className="bg-white px-3 py-5">
              <Text>
                {timeline[activeMonth]} {item}
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Page;
