import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ProfileOthers from './ProfileOthers';
import EditPost from './EditPost';

const Post = ({ navigation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
  const closeSheetAnimation = useRef(new Animated.Value(1)).current;

  const handleBottomSheet = () => {
    setIsVisible(!isVisible);
    Animated.parallel([
      Animated.timing(bottomSheetAnimation, {
        toValue: isVisible ? 0 : 1,
        duration: 300,
      }),
      Animated.timing(closeSheetAnimation, {
        toValue: isVisible ? 0 : 1,
        duration: 300,
      }),
    ]).start(() => {
      bottomSheetAnimation.setValue(isVisible ? 0 : 1);
      closeSheetAnimation.setValue(isVisible ? 0 : 1);
    });
  };

  const bottomSheetTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const closeSheetTranslateY = closeSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const [isLikedCmt, setIsLikedCmt] = useState(false);
  const handleHeartCmtPress = () => {
    setIsLikedCmt(!isLikedCmt);
  };

  const [isFav, setIsFav] = useState(false);
  const handleFavPress = () => {
    setIsFav(!isFav);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(EditPost)}>
          <Image source={require('../assets/Post/Bookmark.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>
          Please Start Writing Better Git Commits
        </Text>
      </View>

      <View style={styles.info}>
        <TouchableOpacity onPress={() => navigation.navigate(ProfileOthers)}>
          <Image source={require('../assets/Post/avt.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(ProfileOthers)}>
          <Text style={{ marginLeft: 7 }}>Travis Aaron</Text>
        </TouchableOpacity>
        <Text style={styles.date}>2022, July 29</Text>
        <View style={styles.reaction}>
          <TouchableOpacity onPress={handleBottomSheet}>
            <FontAwesome name="comment-o" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHeartPress}>
            {isLiked ? (
              <FontAwesome
                name="heart"
                size={24}
                style={{ marginHorizontal: 10, color: '#EA3D3D' }}
              />
            ) : (
              <FontAwesome
                name="heart-o"
                size={24}
                style={{ marginHorizontal: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View>
        <Text style={styles.contentContainer}>
          I recently read a helpful article on Hashnode by Simon Egersand titled
          "Write Git Commit Messages Your Colleagues Will Love," and it inspired
          me to dive a little deeper into understanding what makes a Git commit
          good or bad. You're probably thinking to yourself, "my commits are
          just fine, thank you." But are they really? Let's take a closer look.
          Why Are Good Commits Important? Git commits are like little snapshots
          of your code. They let you and others see what changes were made, and
          when. They also let you roll back those changes when something
          inevitably goes wrong. That's why it's important to make sure your git
          commits are as clear and concise as possible. Otherwise, you run the
          risk of confusing yourself and others down the road. The Problem With
          Your Current Commits There are three main problems I find with many
          commits: They're not informative enough. They're not helpful to
          others. You're putting too many changes in one commit. Not Enough
          Information These commits are essentially worthless. You know the ones
          I'm talking about - they just say "updated" or "fixed bug".
        </Text>
      </View>

      {isVisible && (
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [
                { translateY: bottomSheetTranslateY },
                { translateY: closeSheetTranslateY },
              ],
            },
          ]}>
          <Text style={styles.comment}>Comments</Text>

          <View style={styles.line} />

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
          <Text style={styles.content}>
            On a first-time visit to New Orleans, there's so much to see and do.
          </Text>
          <View style={styles.reactCmt}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={handleHeartCmtPress}>
                {isLikedCmt ? (
                  <IonIcon
                    name="heart"
                    size={24}
                    style={{ color: '#EA3D3D' }}
                  />
                ) : (
                  <IonIcon name="heart-outline" size={24} />
                )}
              </TouchableOpacity>
              <Text style={{ marginLeft: 3 }}>123</Text>
            </View>

            <View style={{ flexDirection: 'row', marginRight: 100 }}>
              <IonIcon
                name="chatbox-outline"
                size={24}
                style={{ marginRight: 5 }}
              />
              <Text>23</Text>
            </View>

            <TouchableOpacity onPress={handleFavPress}>
              {isFav ? (
                <IonIcon
                  name="bookmark"
                  size={24}
                  style={{ color: '#EA3D3D' }}
                />
              ) : (
                <IonIcon name="bookmark-outline" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.horizontalLineFooter} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={styles.postContainer}>
                <Image source={require('../assets/avtpost.png')} />
                <TextInput
                  style={styles.inputSeach}
                  placeholder="What’s Happening?"
                  multiline={true}
                />
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={{ color: '#FFFF' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 70,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginBottom: 7,
  },
  reaction: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginBottom: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  date: {
    marginLeft: 20,
    color: '#C8C8C8',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
    marginHorizontal: 15,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 500, //585
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  comment: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    alignSelf: 'center',
    marginTop: 7,
  },
  line: {
    width: '85%',
    height: 1,
    marginTop: 7,
    backgroundColor: '#000000',
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 17,
    marginTop: 13,
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  reactCmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 17,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  horizontalLineFooter: {
    alignSelf: 'center',
    width: '95%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 28,
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
  inputSeach: {
    marginLeft: 7,
    width: 200,
  },
});
