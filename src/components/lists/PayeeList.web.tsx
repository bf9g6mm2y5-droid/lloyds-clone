import { Payee, GetPayees } from "@/schema";
import { usePayeeSearch, usePaymentActions } from "@/store";
import { Link } from "expo-router";
import { memo, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui";
import { Feather } from "@expo/vector-icons";
import { groupedAlphabetically } from "@/libs/utils";

type PayeeOrLabel = Payee | string;

type PayeeListProps = {
  payees: GetPayees["payees"];
  hasNextPage: boolean;
  isFetching: boolean;
} & Pick<FlatListProps<PayeeOrLabel>, "onEndReached" | "refreshing">;

const PayeeList = ({
  payees,
  hasNextPage,
  isFetching,
  ...props
}: PayeeListProps) => {
  const { bottom } = useSafeAreaInsets();
  const searchText = usePayeeSearch();
  const filteredPayee = useMemo(
    () => groupedAlphabetically(payees, (payee) => payee.name, searchText),
    [payees, searchText],
  );

  return (
    <FlatList
      overScrollMode="never"
      bounces={false}
      contentContainerStyle={{ paddingBottom: bottom }}
      data={filteredPayee}
      keyExtractor={(item, index) =>
        typeof item === "string" ? item + index : item.id
      }
      renderItem={(props) => <PayeeListItem {...props} />}
      onEndReachedThreshold={0.2}
      ListFooterComponent={() => (
        <View>
          {hasNextPage && isFetching && <ActivityIndicator size="large" />}
          {!hasNextPage && !isFetching && <PayeeEmptyView />}
        </View>
      )}
      ListFooterComponentStyle={{ paddingVertical: 16 }}
      ListEmptyComponent={() => <PayeeEmptyView />}
      {...props}
    />
  );
};

export default PayeeList;

const PayeeListItem = memo(
  ({ item }: { item: PayeeOrLabel; index: number }) => {
    const searchText = usePayeeSearch();
    const { setPayee } = usePaymentActions();

    if (typeof item === "string") {
      return <Text className="px-4 py-4 font-semibold">{item}</Text>;
    } else {
      let indx = -1;
      let length = 0;

      if (searchText.length > 0) {
        indx = item.name.toLowerCase().indexOf(searchText);
        length = searchText.length;
      }

      return (
        <Link href={`/(root)/(modals)/(payment)/payment-details`} asChild>
          <Pressable
            onPress={setPayee.bind(null, item)}
            className="elevation-sm flex-row items-center gap-x-4 bg-white px-4 py-5 shadow-sm shadow-slate-700/10 active:bg-gray-200"
          >
            <Feather name="user" size={28} color="#1b1b1b" />
            <View className="flex-1 flex-col gap-y-1">
              {indx < 0 ? (
                <Text className="font-semibold">{item.name}</Text>
              ) : (
                <Text className="font-semibold uppercase">
                  {item.name.substring(0, indx)}
                  <Text className="text-green-500">
                    {item.name.substring(indx, indx + length)}
                  </Text>
                  {item.name.substring(indx + length)}
                </Text>
              )}
              <Text className="text-sm text-gray-600">
                {item.sortCode} / {item.accountNumber}
              </Text>
            </View>
            <Button variant="ghost" size="icon" className="mr-3">
              <Feather name="more-horizontal" size={28} color="black" />
            </Button>
          </Pressable>
        </Link>
      );
    }
  },
);

PayeeListItem.displayName = "PayeeListItem";

export const PayeeEmptyView = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-sm">No payees found</Text>
      <Link href="/add-payee" asChild>
        <Button label="Add a new one" variant="link" />
      </Link>
    </View>
  );
};
