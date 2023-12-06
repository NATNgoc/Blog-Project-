import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Setting = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
       <Button
        title="GO TO DETAILS"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;