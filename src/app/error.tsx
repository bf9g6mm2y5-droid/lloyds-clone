import { Button } from "@/components/ui";
import { useAuth } from "@/store";
import { Link } from "expo-router";
import { Text, View } from "react-native";

// TODO: Add a custom error page
export default function Page() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-red-700">
      <Text className="text-center text-7xl font-black uppercase text-white">
        Error
      </Text>
      <Text className="mb-10 font-semibold text-gray-200">
        Something went wrong!
      </Text>
      <Link asChild href="/(root)/(tabs)/(home)/(tabs)">
        <Button
          label="Go Home"
          size="lg"
          className="mx-10 self-stretch text-center"
          onPress={logout}
        />
      </Link>
    </View>
  );
}
