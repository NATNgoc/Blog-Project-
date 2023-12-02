import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MainBottom from './MainBottom';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="MainBottom"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />} 
      >
      <Drawer.Screen
        name="Home"
        component={MainBottom}
        
      />
      <Drawer.Screen name="Add new article" />
      <Drawer.Screen name="Your Blogs" />
      <Drawer.Screen name="Your Activities" />
      <Drawer.Screen name="Your Favorites" />
      <Drawer.Screen name="Setting" />
      <Drawer.Screen name="Log out" />
    </Drawer.Navigator>
  );
}
