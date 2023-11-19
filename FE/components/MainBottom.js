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
        name="Categories"
        component={Categories}
        options={homeScreenOptions(false, 'grid')}
      />
      <Bottom.Screen
        name="Favourites"
        component={Favourites}
        options={{ ...homeScreenOptions(false, 'heart'), tabBarBadge: 3 }}
      />

      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={homeScreenOptions(false, 'person')}
      />
    </Bottom.Navigator>
  );
};
//Danh Hoàng Khải-21522181
export default MainBottom;
