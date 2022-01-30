import React, { FC } from 'react';
import { GestureResponderEvent, Text, View } from "react-native";
import { styles } from "./styles";
import ListSvg from '../../icons/list.svg';
import SettingsSvg from '../../icons/settings.svg';
import AboutSvg from '../../icons/about.svg';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

interface TabBarItemProps {
  label: string,
  onPress: (event: GestureResponderEvent) => void,
  active?: boolean,
  icon: FC,
}

const IconRouteMap: {[key: string]: FC} = {
  "Settings": SettingsSvg,
  "List": ListSvg,
  "About": AboutSvg,
}


const TabBarItem: FC<TabBarItemProps> = ({active, label, icon, onPress}) => {
  const insets = useSafeAreaInsets();
  const IconComponent = icon;

  const color = active ? 'rgb(0,122,255)' : '#000';
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, {
      marginBottom: -insets.bottom / 2,
    }]}>
      <IconComponent fill={color} />
      <Text style={{ color }}>{label}</Text>
    </TouchableOpacity>
  )
}

export const TabBar:FC<BottomTabBarProps> = ({ navigation, state, descriptors, insets }) => {
  return (
    <View style={[styles.container, {
      paddingBottom: insets.bottom,
      height: 60 + insets.bottom / 2,
    }]}>
      {state.routes.map((route, index) => (
        <TabBarItem
          key={route.name}
          label={route.name}
          active={index === state.index}
          onPress={() => navigation.navigate(route.name)}
          icon={IconRouteMap[route.name] || ListSvg}
        />
      ))}
    </View>
  )
}
