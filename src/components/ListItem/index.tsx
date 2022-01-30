import React, { FC } from 'react';
import { styles } from "./styles";
import { View, Text } from 'react-native';

interface ListItemProps {
  id: string,
  text: string,
}
export const ListItem:FC<ListItemProps> = ({ id, text}) => (
  <View style={styles.container}>
    <Text style={styles.id}>#{id}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
)
