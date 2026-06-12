import TransactionsSectionList from "./SectionList";
import { TransactionSection } from "@/types";
import { SharedValue } from "react-native-reanimated";

type TransactionsViewPagerProps = {
  timeline: string[];
  sections: TransactionSection[];
  threshold: number;
  offset: SharedValue<number>;
  selectedPage: (value: number) => void;
  activePage: number;
  position: (value: number) => void;
};

const TransactionsViewPager = ({
  sections,
}: TransactionsViewPagerProps) => {
  return (
    <TransactionsSectionList
      sections={sections}
      bounces={false}
    />
  );
};

export default TransactionsViewPager;
