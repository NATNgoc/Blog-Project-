import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';

const LoginContainer = () => {
  const navigation = useNavigation();

  const handleOnPressBack = () => {
    navigation.navigate('Welcome');
  };

  const handleOnPressCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <Login
      handleOnPressBack={handleOnPressBack}
      handleOnPressCreateAccount={handleOnPressCreateAccount}
    />
  );
};

export default LoginContainer;