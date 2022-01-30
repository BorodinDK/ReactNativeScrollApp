import React, { FC } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBar } from "./components/TabBar";
import { ListScreen } from "./screens/ListScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { AboutScreen } from "./screens/AboutScreen";

// type RootStackParamList = {
//   List: undefined;
//   ListItem: {word: string};
//   Other: undefined;
//   About: undefined;
// };

const App:FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName={"List"} tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="List" component={ListScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
