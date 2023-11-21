//Danh Hoàng Khải-21522181
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../presentitional/Home';
import Search from '../presentitional/Search';
import Favorites from '../presentitional/Favorities';
import Setting from '../presentitional/Setting';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  return <IonIcon name={name} size={25} color={focused ? '#0081F1' : '#000'} />;
};
const homeScreenOptions = (headerShown, name) => {
  return {
    headerShown: headerShown,
    tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
  };
};

const MainBottom = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={homeScreenOptions(false, 'home')}
      />

      <Bottom.Screen
        name="Search"
        component={Search}
        options={homeScreenOptions(false, 'search')}
      />
      <Bottom.Screen
        name="Favorites"
        component={Favorites}
        options={{ ...homeScreenOptions(false, 'bookmark'), tabBarBadge: 3 }}
      />

      <Bottom.Screen
        name="Setting"
        component={Setting}
        options={homeScreenOptions(false, 'settings')}
      />
    </Bottom.Navigator>
  );
};
export default MainBottom;
