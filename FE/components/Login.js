import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Welcome from './Welcome';
import CustomTextInput from './CustomTextInput';
import { Svg, Path } from 'react-native-svg';
import handleLogin from '../presentational/handleLogin';

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

const Login = () => {
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
          <Image
            source={require('../assets/Arrow.svg')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.blogdContainer}>
        <Text>
          <Text style={styles.blogdText}>BLOGD</Text>
          <Text style={styles.dotText}>.</Text>
        </Text>
      </View>
      <Text style={styles.bloggingPartnerText}>Personal Blogging Partner</Text>
      <View>
        <CustomTextInput placeholder="Email" />

        <CustomTextInput placeholder="Password" />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />

      <Image source={require('../assets/Auth.svg')} />

      <TouchableOpacity style={styles.footerContainer}>
        <View>
          <Text style={[styles.text, styles.blackText]}>
            Don't have an account?
            <Text style={[styles.text, styles.blueText]}> Register</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
