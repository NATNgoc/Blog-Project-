import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../presentitional/Home';
import MainBottom from './MainBottom'
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Add new article" />
        <Drawer.Screen name="Your Blogs" />
        <Drawer.Screen name="Your Activities" />
        <Drawer.Screen name="Your Favorites" />
        <Drawer.Screen name="Setting" />
        <Drawer.Screen name="Log out" />
      </Drawer.Navigator>
  );
}