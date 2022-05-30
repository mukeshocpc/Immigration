import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const InputTextfield = ({placeholder, value, onChangeText, onFocus}) => {
  return (
    <View style={InputTextfieldStyle.containerStyle}>
      <TextInput
        defaultValue={value}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        onFocus={onFocus}
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
};
