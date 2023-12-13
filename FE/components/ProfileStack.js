import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileUser from '../presentitional/ProfileUser';
import ProfileOthers from '../presentitional/ProfileOthers';
import Post from '../presentitional/Post';
import Follow from '../presentitional/Follow';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileOthers"
        component={ProfileOthers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Follow"
        component={Follow}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
