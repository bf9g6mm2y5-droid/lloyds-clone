import { ReactElement, useCallback, useEffect, useState } from "react";
import { ColorValue, LayoutChangeEvent, LayoutRectangle, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type SkeletonProps = {
  backgroundColor?: ColorValue;
  highlight?: string;
  children: ReactElement;
  width?: number;
  height?: number;
};

const SkeletonLoader = ({
  backgroundColor = "#dbdbdb",
  children,
  width: customWidth,
  height: customHeight,
}: SkeletonProps) => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 600 }),
        withTiming(1, { duration: 600 }),
      ),
      Infinity,
    );
  }, [opacity]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  }, []);

  if (!layout) {
    return <View onLayout={onLayout}>{children}</View>;
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          backgroundColor: backgroundColor as string,
          height: customHeight ?? layout.height,
          width: customWidth ?? layout.width,
          borderRadius: 4,
          overflow: "hidden",
        },
      ]}
    />
  );
};

export { SkeletonLoader };
