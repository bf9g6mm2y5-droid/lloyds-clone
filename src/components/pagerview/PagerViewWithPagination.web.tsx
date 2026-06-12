import { PropsWithChildren, useRef, useState } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import Pagination from "./Pagination";
import { cn } from "@/libs/utils";
import Animated, { useSharedValue } from "react-native-reanimated";

type LCPagerViewWithPaginationProps = {
  numberOfPages: number;
  pagination?: boolean;
  pagerStyle?: StyleProp<ViewStyle>;
  className?: string;
  paginationClassName?: string;
  onPageSelected?: (position: number) => void;
  onPageScrollStateChanged?: (state: "idle" | "dragging" | "settling") => void;
};

const LCPagerViewWithPagination = ({
  children,
  pagination = true,
  numberOfPages,
  pagerStyle,
  className,
  paginationClassName,
  onPageSelected,
}: PropsWithChildren<LCPagerViewWithPaginationProps>) => {
  const scrollPosition = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View
      className={cn(className)}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          if (containerWidth > 0) {
            const offset = e.nativeEvent.contentOffset.x / containerWidth;
            scrollPosition.value = offset;
          }
        }}
        onMomentumScrollEnd={(e) => {
          if (containerWidth > 0) {
            const page = Math.round(
              e.nativeEvent.contentOffset.x / containerWidth,
            );
            onPageSelected?.(page);
          }
        }}
        scrollEventThrottle={16}
        style={[{ flex: 1, width: "100%" }, pagerStyle as any]}
      >
        {children}
      </ScrollView>
      {pagination && (
        <Pagination
          position={scrollPosition}
          numberOfPages={numberOfPages}
          className={paginationClassName}
        />
      )}
    </View>
  );
};

export default LCPagerViewWithPagination;
