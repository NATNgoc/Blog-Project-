import React from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../assets/Home/gg_menu-left.png')} />
      </TouchableOpacity>
        <Image source={require('../assets/Home/Notification.png')} />
      </View>

      <View style={styles.searchFilter}>
      <View style={styles.search}>
      <TextInput style={styles.inputSeach}
          placeholder="Search"
  
          // value={email}
          // handleTextChange={(text) => setEmail(text)}
        />
      
      </View>

      <View style={styles.filter}>
       <Image source={require('../assets/Home/Filter.png')} />

      </View>

      </View>

      <View style={styles.postTopic}>
      </View>

       <View style={styles.post}>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'C8C8C8',
  },

  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 50,
  
  },

  searchFilter: {
    flexDirection:'row',
    justifyContent: 'space-between',
     width:'90%',
  },

  search: {
    justifyContent:'center',
    backgroundColor:'#CCCBCB',
    marginTop: 20,
    height: 40,
    width:'75%',
    height: 42,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
  },

  inputSeach:{
  fontFamily: 'Montserrat',
  lineHeight: 22,
  fontSize: 17,


  },

  filter: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 20,
    width: 51,
    height: 42,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4,

  },

  postTopic:{
  

  },

  post: {

  },
});

export default Home;