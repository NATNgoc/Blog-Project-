import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainBottom from './MainBottom'
import CustomDrawer from './CustomDrawer'
import AuthStack from './AuthStack'
import Post from '../presentitional/Post'
import ProfileUser from '../presentitional/ProfileUser'
import ProfileOthers from '../presentitional/ProfileOthers'
import SettingStack from './SettingStack'

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
        name="SettingStack"
        component={SettingStack}  
      />
      <Drawer.Screen
        name="ProfileUser"
        component={ProfileUser}  
      />
      <Drawer.Screen
        name="ProfileOthers"
        component={ProfileOthers}  
      />
      <Drawer.Screen
        name="AuthStack"
        component={AuthStack}  
      />
      
    </Drawer.Navigator>
  );
}
