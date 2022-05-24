import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const InputTextfield = ({placeholder, value, callback}) => {
  return (
    <View style={InputTextfieldStyle.containerStyle}>
      <TextInput
        text={value}
        onChangeText={text => callback(text)}
        placeholder={placeholder}
        style={InputTextfieldStyle.textStyle}
      />
    </View>
  );
};

export default InputTextfield;

const InputTextfieldStyle = {
  containerStyle: {
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
  },
  textStyle: {
    color: '#000',
    borderRadius: 25,
    backgroundColor: '#F1F3F6',
    padding: 15,
    height: 50,
    fontSize: 15,
    margin: 0,
  },
  textAreaStyle: {
    color: '#000',
    borderRadius: 25,
    backgroundColor: '#F1F3F6',
    padding: 15,
    height: 140,
    fontSize: 15,
    margin: 0,
    marginTop: 10,
    textAlignVertical: 'top',
  },
};
