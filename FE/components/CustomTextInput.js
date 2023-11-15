
import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, icon, value, handleTextChange }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#000',
    marginVertical: 10,
    paddingBottom: 3,
  },
 
  input: {
    height: 50,
    width: 300,
    paddingStart: 10,
  },
});

export default CustomTextInput;
