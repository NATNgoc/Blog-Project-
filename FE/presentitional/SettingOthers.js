import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import {Picker} from "@react-native-picker/picker"

const HandleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View>
      <Switch
        trackColor={{ false: '#C0C0C0', true: '#A9A9A9' }}
        thumbColor={isEnabled ? '#309CFF' : '#f4f3f4'}   
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const SettingOthers = ({ navigation }) => {

   const [Enable , setEnable]  = useState(); 
   
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SmallRectangle.png')}
        style={styles.layer}
      />

      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Others</Text>
      </View>

      <View style={styles.tabList}>
        <View style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Dark Mode</Text>
            <HandleSwitch />
        </View>

         <View style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Language</Text>
             <Picker 
          selectedValue={Enable} 
          style={styles.picker} 
          onValueChange={(itemValue) => setEnable(itemValue)} 
        > 
          <Picker.Item label="English" value="en" /> 
          <Picker.Item label="Vietnamese" value="vi" /> 
          <Picker.Item label="France" value="fr" /> 
          <Picker.Item label="Espanol" value="es" />          
        </Picker> 
        </View>

         <View style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Region</Text>
            <Picker 
          selectedValue={Enable} 
          style={styles.picker} 
          onValueChange={(itemValue) => setEnable(itemValue)} 
        > 
          <Picker.Item label="VietNam" value="vi" /> 
          <Picker.Item label="US" value="en" /> 
          <Picker.Item label="UK" value="en" /> 
          <Picker.Item label="France" value="fr" /> 
          <Picker.Item label="Spain" value="es" />          
        </Picker> 
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
  },
  homeHeader: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  layer: {
    position: 'absolute',
    width: '100%',
    height: '15.5%', //10.2
  },
  commonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: '88%', 
    marginBottom: 25,
  },
  tabList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 90,
  },
  colorText: {
    fontWeight: '645',
  },
  backImage: {
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 3,
  },
  picker: {
    width: 80,
    fontSize: 11,
    borderRadius: 10,
  },
});

export default SettingOthers;
