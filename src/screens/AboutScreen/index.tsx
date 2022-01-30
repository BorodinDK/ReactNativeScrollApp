import React, { FC } from 'react';
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AboutScreen:FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Text style={{ padding: 16 }}>About text</Text>
    </View>
  );
}
