import { TopBarItem } from "@/components";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TopTabsLayout() {
  return (
    <TopTabs
      initialRouteName="index"
      tabBar={(props) => <TopBarItem {...props} />}
    >
      <TopTabs.Screen name="summary" options={{ title: "Summary" }} />
      <TopTabs.Screen
        name="index"
        options={{
          title: "Everyday",
        }}
      />
      <TopTabs.Screen
        name="save-invest"
        options={{
          title: "Save & Invest",
        }}
      />
      <TopTabs.Screen
        name="borrow"
        options={{
          title: "Borrow",
        }}
      />
      <TopTabs.Screen
        name="insure"
        options={{
          title: "Insure",
        }}
      />
    </TopTabs>
  );
}
