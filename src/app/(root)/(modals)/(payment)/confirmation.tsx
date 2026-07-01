import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/libs/utils";
import { usePaymentAccount, useTransaction } from "@/store";

export default function Page() {
  const transaction = useTransaction();
  const account = usePaymentAccount();

  return (
    <View className="flex-1 px-4 py-8 pb-10">
      <View className="items-center py-5">
        <Image
          source={require("@assets/images/send.png")}
          style={styles.image}
        />
        <Text className="font-bold">Payment sent</Text>
      </View>

      <View className="gap-y-6 rounded-xl bg-white px-4 py-10">
        <View className="flex-row items-baseline gap-x-2">
          <Text className="w-1/4 text-sm font-light">From:</Text>
          <Text className="w-3/4 font-semibold">{account?.accountName}</Text>
        </View>
        <View className="flex-row items-baseline gap-x-2">
          <Text className="w-1/4 text-sm font-light">To:</Text>
          <View className="flex-col gap-y-1">
            <Text className="w-3/4 font-semibold">
              {transaction?.payeeName}
            </Text>
            <Text className="text-sm font-light text-gray-700">
              01-23-45 | ****0000
            </Text>
          </View>
        </View>
        <View className="flex-row items-baseline gap-x-2">
          <Text className="w-1/4 text-sm font-light">Amount:</Text>
          <Text className="w-3/4 font-semibold">{formatCurrency(Math.abs(transaction?.amount ?? 0))}</Text>
        </View>
        <View className="flex-row items-baseline gap-x-2">
          <Text className="w-1/4 text-sm font-light">On:</Text>
          <Text className="w-3/4 font-semibold">20 Feb 2023</Text>
        </View>
      </View>

      <View className="flex-1" />
      <View>
        <Button label="Share or save" size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
