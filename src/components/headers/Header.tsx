import { Text, View } from "react-native";

import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Href, Link, useRouter } from "expo-router";
import { cn } from "@/libs/utils";
import { Button } from "../ui";

type HeaderProps = {
  showMessage?: boolean;
  showUser?: boolean;
  showSupport?: boolean;
  showClose?: boolean;
  showBack?: boolean;
  showCall?: boolean;
  textCenter?: boolean;
  dismissTo?: Href;
  title?: string;
  className?: string;
  useSafeArea?: boolean;
} & NativeStackHeaderProps;

const Header = ({
  showMessage = false,
  showUser = false,
  showSupport = false,
  showClose = false,
  showBack = false,
  showCall = false,
  textCenter = false,
  title: titleFromProps,
  dismissTo,
  route,
  options,
  className,
  useSafeArea = true,
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();

  const router = useRouter();

  const routeName = route.name;
  let title = titleFromProps ? titleFromProps : options.title || routeName;

  const renderIcon = ({
    icon: IconComponent,
    name,
    size = 22,
    action,
  }: {
    icon: any;
    name: string;
    size?: number;
    action?: () => void;
  }) => (
    <Button variant="ghost" size="icon" onPress={action}>
      <IconComponent name={name} size={size} color="black" />
    </Button>
  );

  return (
    <View
      className={cn(
        "flex flex-row items-center justify-between gap-x-3 px-2 pb-2",
        className,
      )}
      style={{ paddingTop: useSafeArea ? top : 16 }}
    >
      <View className="gap-x-5">
        {showBack &&
          renderIcon({
            icon: Ionicons,
            name: "arrow-back",
            action: () => router.back(),
          })}

        {showMessage && renderIcon({ icon: Feather, name: "mail" })}
      </View>

      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        numberOfLines={1}
        className={cn(
          "flex-1 text-lg font-semibold",
          textCenter ? "text-center" : "text-left",
        )}
      >
        {title}
      </Text>

      {/* <View className="flex-1" /> */}
      <View className="flex-row gap-x-5">
        {(!showClose && !showSupport && !showUser && !showCall) && (
          <View className="w-6" />
        )}

        {showClose &&
          renderIcon({
            icon: AntDesign,
            name: "close",
            action: () =>
              router.canDismiss() &&
              (dismissTo ? router.dismissTo(dismissTo) : router.dismiss()),
          })}

        {showSupport && (
          <Link href="/support" asChild>
            {renderIcon({
              icon: AntDesign,
              name: "questioncircleo",
            })}
          </Link>
        )}

        {showUser && (
          <Link href="/profile" asChild>
            {renderIcon({ icon: FontAwesome5, name: "user-cog" })}
          </Link>
        )}

        {showCall &&
          renderIcon({
            icon: Ionicons,
            name: "call",
          })}
      </View>
    </View>
  );
};

export default Header;
