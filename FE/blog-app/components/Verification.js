import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Verification = () => {
  const navigation = useNavigation();

  const handleOnPressBack = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <TouchableOpacity onPress={handleOnPressBack}>
          <Image
            source={require('../assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>Verification code</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} maxLength={1} />
          <TextInput style={styles.input} maxLength={1} />
          <TextInput style={styles.input} maxLength={1} />
          <TextInput style={styles.input} maxLength={1} />
          <TextInput style={styles.input} maxLength={1} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Verify Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  button: {
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#181717',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  input: {
    height: 38,
    width: 42,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: 'white',
    marginRight: 10,
    textAlign: 'center',
  },
});
