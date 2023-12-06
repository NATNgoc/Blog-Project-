import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MainBottom from './MainBottom';
import CustomDrawer from './CustomDrawer';
import AuthStack from './AuthStack';
import Post from '../presentitional/Post';
import Setting from '../presentitional/Setting';
import ProfileUser from '../presentitional/ProfileUser';
import ProfileOthers from '../presentitional/ProfileOthers';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />} 
      >
      <Drawer.Screen
        name="MainBottom"
        component={MainBottom}  
      />
      <Drawer.Screen
        name="Post"
        component={Post}  
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}  
      />
      <Drawer.Screen
        name="ProfileUser"
        component={ProfileUser}  
      />
      <Drawer.Screen
        name="ProfileOthers"
        component={ProfileOthers}  
      />
    </Drawer.Navigator>
  );
}
