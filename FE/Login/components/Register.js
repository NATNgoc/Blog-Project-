import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Welcome from './Welcome';
import CustomTextInput from './CustomTextInput';

const Register = () => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };

  if (isClick) {
    return <Welcome />;
  }

  return (
    <View style={styles.container}>
    
    <View style={styles.backImage}>
      <TouchableOpacity onPress={handleClick}>
        <Image source={require('../assets/Arrow.png')} />
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
  blogdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogdText: {
    color: '#181717',
    fontSize: 50,
    fontFamily: 'Lora',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  dotText: {
    color: '#EA3D3D',
    fontSize: 50,
    fontFamily: 'Lora',
    fontWeight: '700',
    marginLeft: -6,
    marginRight: 2,
    wordWrap: 'break-word',
  },
  bloggingPartnerText: {
    left: 1,
    color: '#3C3939',
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  forgotText: {
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'underline',
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
  footerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Nunito',
    fontWeight: '700',
    textDecorationLine: 'underline',
    wordWrap: 'break-word',
  },
  blackText: {
    color: 'black',
  },
  blueText: {
    color: '#003B95',
  },
});
