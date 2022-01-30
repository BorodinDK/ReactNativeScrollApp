import React, { FC, useCallback, useState } from "react";
import { styles } from "./styles";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ListItem } from "../ListItem";

interface ScreenListProps {
  data: string[],
  title: string,
}

export const ScreenList:FC<ScreenListProps> = ({ data, title }) => {
  const HEADER_MARGIN = 25;
  const HORIZONTAL_PADDING = 16;

  const [titleSize, setTitleSize] = useState({
    width: 0,
    height: 0
  });
  const [screenWidth, setScreenWidth] = useState(0);

  const scrollOffset = useSharedValue(0);
  const showBottomBorder = useSharedValue(true);

  const scrollHandler = useAnimatedScrollHandler(({  layoutMeasurement, contentOffset, contentSize }) => {
    scrollOffset.value = contentOffset.y;
    showBottomBorder.value = layoutMeasurement.height + contentOffset.y < contentSize.height;
  });

  const computedOffsetStyle = useAnimatedStyle(() => {
    const offsetX = interpolate(
      scrollOffset.value,
      [0, HEADER_MARGIN],
      [0, (screenWidth - HORIZONTAL_PADDING*2) / 2 - titleSize.width / 2],
      { extrapolateRight: Extrapolation.CLAMP }
    );

    const offsetY = interpolate(
      scrollOffset.value,
      [0, HEADER_MARGIN],
      [0, -8],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [
        { translateY: Math.max(offsetY, -scrollOffset.value) },
        { translateX: Math.max(offsetX, 0) }
      ]
    };
  }, [screenWidth, titleSize]);

  const computedTitleSizeStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [0, HEADER_MARGIN],
      [1, .5],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const notLinearScale = Math.min(Math.sqrt(scale), scale);

    const offsetX = (titleSize.width - (titleSize.width * notLinearScale)) / -2 / notLinearScale;
    const offsetY = (titleSize.height - (titleSize.height * notLinearScale)) / -2 / notLinearScale;

    return {
      transform: [
        { scale: notLinearScale },
        { translateX: Math.max(offsetX, 0) },
        { translateY: -Math.max(offsetY, 0) },
      ],
    };
  }, [titleSize]);

  const computedHeaderBorderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, HEADER_MARGIN],
      [0, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    )
  }));

  const computedBottomBorderStyle = useAnimatedStyle(() => ({
    opacity: withSpring(showBottomBorder.value ? 1 : 0),
  }));

  const insets = useSafeAreaInsets();

  const getItemLayout = useCallback((data, index) => (
    { length: 50, offset: 50 * index, index }
  ), []);

  const keyExtractor = useCallback(item => item, []);

  const renderItem = useCallback((item) => (
    <ListItem id={(item.index + 1).toString()} text={item.item} />
  ), []);

  return (
    <View style={styles.container}
      onLayout={e => setScreenWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.header, {
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }]}>
        <Animated.View style={[styles.titleView, computedOffsetStyle ]}>
          <Animated.View style={computedTitleSizeStyle}>
            <Animated.Text
              style={[ styles.title ]}
              onLayout={e => setTitleSize({
                ...e.nativeEvent.layout,
                // width: e.nativeEvent.layout.width + HORIZONTAL_PADDING * 2,
              })}
            >{title}</Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[
          styles.headerBorder,
          computedHeaderBorderStyle,
          { marginHorizontal: -HORIZONTAL_PADDING },
        ]} />
      </Animated.View>
      <FlatList
        getItemLayout={getItemLayout}
        renderScrollComponent={(props) => (
          <Animated.ScrollView
            {...props}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: HEADER_MARGIN,
            }}
          />
        )
      } data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
      <Animated.View style={[
        styles.headerBorder,
        computedBottomBorderStyle,
      ]} />
    </View>
  )
}
