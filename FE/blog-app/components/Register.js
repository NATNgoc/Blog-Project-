import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from './CustomTextInput';

const Register = () => {
  const navigation = useNavigation();

  const handleOnPressBack = () => {
    navigation.navigate('Welcome');
  };

  const handleOnPressRegister = () => {
    navigation.navigate('Verification');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <TouchableOpacity onPress={handleOnPressBack}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <View>
        <CustomTextInput placeholder="Fullname" />

        <CustomTextInput placeholder="Email" />

        <CustomTextInput placeholder="Password" />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOnPressRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.textInLine}>Or</Text>
        <View style={styles.horizontalLine} />
      </View>

      <Image source={require('../assets/Auth.png')} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  backImage: {
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 3,
    marginBottom: 70,
  },
  lineContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  horizontalLine: {
    width: 100,
    height: 1,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  textInLine: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  button: {
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 25,
  },
  buttonText: {
    color: '#181717',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
