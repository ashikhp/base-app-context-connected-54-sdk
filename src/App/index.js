import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from '../Screens/HomeStack';
import { DrawerContent } from '../Screens/DrawerContent';

const Drawer = createDrawerNavigator();

const Main = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          width: 285
        }
      }} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="HomeDrawer"
          component={HomeStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;