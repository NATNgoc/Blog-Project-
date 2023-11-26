import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>

        <TouchableOpacity>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
        <Image source={require('../assets/Post/Bookmark.png')} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>title</Text>
        <View style={styles.comment}>
          <Image source={require('../assets/Post/comment.png')} />
          <Text style={{ color: '#C8C8C8' }}>216 cmt</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Image source={require('../assets/Post/avt.png')} />
        <Text style={{ marginLeft: 7 }}>Username</Text>
        <Text style={styles.date}>Date</Text>
      </View>

      <View style={styles.horizontalLine} />

      <View>
      <Text style={styles.contentContainer}>Content</Text>
      </View>

    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'C8C8C8',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
  },
  header: {
    flexDirection: 'row',
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  comment: {
    marginLeft: 'auto',
    alignItems: 'center',
    color: '#C8C8C8',
  },
  info: {
    flexDirection: 'row',
  },
  date: {
    marginLeft: 'auto',
    color: '#C8C8C8',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
  },
  contentContainer: {
    marginTop: 20,
  },
});
