import { Button } from "@/components/ui";
import { usePayee, usePaymentAccount, useTransaction } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const transaction = useTransaction();
  const payee = usePayee();

  return (
    <View className="flex-1 items-center gap-y-10 bg-white px-4 py-10">
      <Image source={require("@assets/images/send.png")} style={styles.image} />
      <Text className="py-5 text-3xl font-semibold">Success</Text>
      <Text className="text-center text-sm">
        Your payment of{" "}
        <Text className="font-semibold">{`${transaction?.amount}`}</Text> to{" "}
        <Text className="font-semibold">{`${transaction?.payeeName}`}</Text> has
        been sent.
        {payee?.newEntry && "The payee details have been saved."}
      </Text>
      <View className="flex-row items-center gap-x-2 rounded-xl bg-gray-100 px-4 py-5">
        <Ionicons name="time-outline" size={20} color="black" />
        <Text className="text-sm">
          This payment should be received within two hours.
        </Text>
      </View>
      <View className="flex-1" />
      <View className="w-full gap-y-3 border-t border-gray-200 py-5">
        <Link href="/coming-soon" asChild>
          <Button label="Make another payment" size="lg" />
        </Link>
        <Link href="/confirmation" asChild>
          <Button
            label="View payment confirmation"
            variant="outline"
            size="lg"
          />
        </Link>
        <Link href="/coming-soon" asChild>
          <Button
            label="Go to your transactions"
            variant="link"
            className="underline"
          />
        </Link>
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
