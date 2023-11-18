import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();
const AppNavigator = () => {
   return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;