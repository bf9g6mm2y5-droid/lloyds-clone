import {
  AccountMain,
  AdvertBanner,
  HorizontalCard,
  OtherAccountCard,
} from "@/components/cards";
import { useAccountsQuery } from "@/hooks";
import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const EverydayScreen = () => {
  const { userQuery } = useAccountsQuery();

  if (userQuery.isPending || userQuery.isError) {
    // TODO: Add error toast message
    return null;
  }

  const count = userQuery.data.accounts.length;
  return (
    <ScrollView
      automaticallyAdjustContentInsets
      contentContainerClassName="gap-y-4 p-5"
    >
      <Text className="text-lg font-semibold">Current accounts</Text>

      <Accounts id={userQuery.data.id} count={count} />

      {/* add other accounts */}
      <OtherAccountCard />

      <AdvertBanner
        title="Check your credit score"
        description="Congratulations - you've been registered for Your Credit Score for a year"
        icon={require("@assets/images/icon.png")}
        action="Check your Score"
      />

      <HorizontalCard
        badge
        title="Everyday offers"
        caption="Activate your offers to earn cashback"
        href="/_sitemap" // TODO: Add link
      />
      <HorizontalCard
        title="Manage cards"
        caption="View PIN, freeze card and more."
        href="/(root)/(tabs)/(cards)"
      />
      <Text className="text-lg font-semibold">More for you</Text>
      {/* 2 * 2 Grid */}
      <View className="flex-wrap gap-y-4">
        <View className="flex-row gap-x-4">
          <GridItem
            label="Add account"
            caption="View your account with other banks"
            icon={require("@assets/images/icon.png")}
            href="/"
          />

          <GridItem
            label="Your credit score"
            caption="Check your credit score and track your progress"
            icon={require("@assets/images/icon.png")}
            href="/"
          />
        </View>

        <View className="flex-row gap-x-4">
          <GridItem
            label="Travel hub"
            caption="Going abroad? Take advantage of all the travel services we offer"
            icon={require("@assets/images/icon.png")}
            href="/"
          />

          <GridItem
            label="Prevent fraud"
            caption="Find out how to stay safe from scams"
            icon={require("@assets/images/icon.png")}
            href="/"
          />
        </View>
      </View>

      {/* Benefits */}
      <AdvertBanner
        title="Benefits to lighten the load"
        description={`£23 billion of government support is unclaimed each year. \nUse our benefits calculator to check if you're missing out.`}
        icon={require("@assets/images/icon.png")}
        action="Check your eligibility"
        className="bg-white"
      />

      {/* Share feedback */}
      <Text className="mt-5 text-center text-sm">
        Like the new Everyday space?
      </Text>
      <Pressable className="items-center rounded-xl bg-black py-5">
        <Text className="font-bold text-white">Share feedback</Text>
      </Pressable>

      {/* All caught up */}
    </ScrollView>
  );
};

export default EverydayScreen;

type GridItemProps = {
  label: string;
  caption: string;
  icon: any;
  href: Href;
};

const GridItem = ({ label, caption, icon, href }: GridItemProps) => {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-1 gap-y-3 rounded-xl bg-white px-4 py-5 active:bg-gray-50">
        <Image source={icon} style={{ width: 32, height: 32 }} />
        <Text className="flex-1 text-sm text-gray-500">{caption}</Text>
        <Text className="text-sm font-semibold">{label}</Text>
      </Pressable>
    </Link>
  );
};

const Accounts = ({ id, count }: { id: string; count: number }) => {
  const { accountsQuery } = useAccountsQuery({
    id,
  });

  if (accountsQuery.isPending || accountsQuery.isError) {
    return Array.from({ length: count }).map((_, index) => (
      <AccountMain.Skeleton key={index} />
    ));
  }

  return (
    <>
      {accountsQuery.data?.map((account) => (
        <AccountMain.Card key={account.id} {...account} />
      ))}
    </>
  );
};
