import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

const CreatePost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Create Post</Text>

      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.horizontalLine} />
      </View>

        <View style={styles.profile}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/avtpost.png')} />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontWeight: 'bold' }}>Robin Hood</Text>
              <Text style={{ color: '#536471' }}>@mrhood</Text>
            </View>
          </View>
          <Image source={require('../assets/more.png')} />
        </View>
        <View style={styles.content}>
          <TextInput style={styles.titlePost} placeholder="Title"  multiline={true} />
          <TextInput placeholder="Add your description here..."  multiline={true} />
        </View>     

      <View style={styles.footer}>
        <View style={styles.horizontalLineFooter} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcon name="camera" size={27} color="#00000" />
            <EvilIcon name="paperclip" size={27} color="#00000" />
            <EvilIcon name="image" size={27} color="#00000" />
            <EvilIcon name="location" size={27} color="#00000" />
            <IonIcon name="mic-outline" size={22} color="#00000" />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: '#FFFF' }}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 10,
    marginHorizontal: 8,
    backgroundColor: 'C8C8C8',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
    marginLeft: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 37,
    marginVertical: 15,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
    marginBottom: 15,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 7,
  },
  content: {
    marginLeft: 48,
  },
  titlePost: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  horizontalLineFooter: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  button: {
    width: 63,
    height: 25,
    borderRadius: 11,
    backgroundColor: '#3671FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
     
  },
});
