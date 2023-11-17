// Register.js
import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomTextInput from './CustomTextInput';
import handleRegister from '../presentational/handleRegister';
import Login from './Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: 'center',
    backgroundima: '#EFEFEF',
  },
  backImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-start',
  },
  button: {
    width: 270,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#181717',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});

const Register = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };

  if (isClick) {
    return <Login />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <TouchableOpacity onPress={handleClick}>
          <Image source={require('../assets/Arrow.svg')} />
        </TouchableOpacity>
      </View>

      <View>
        <CustomTextInput placeholder="Fullname" />
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />
      <Image source={require('../assets/Auth.svg')} />
    </View>
  );
};

export default Register;
