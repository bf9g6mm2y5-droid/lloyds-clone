import { FlatList } from "react-native";
import BaseListItem from "./BaseListItem";
import { sampleTransactionSectionList } from "@/constants";

const TransactionList = () => {
  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 100 }}
      data={sampleTransactionSectionList[0].data}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => <BaseListItem transaction={item} />}
    />
  );
};

export default TransactionList;
