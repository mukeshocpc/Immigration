import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default class clsLegendRadio extends React.Component {
  constructor(props) {
    super(props);
    this.selected = 0;
  }

  render() {
    return (
      <View style={style.containerStyle}>
        <Text>{this.props.title}</Text>
        <RadioForm formHorizontal={true} labelHorizontal={true}>
          {this.props.data.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                isSelected={i === this.selected}
                index={i}
                borderWidth={1}
                buttonSize={10}
                buttonStyle={{}}
                onPress={value => {
                  this.props.onSelected(value);
                  this.selected = i;
                  this.setState({value: value});
                }}
                buttonWrapStyle={{marginTop: 14}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                onPress={value => {
                  this.props.onSelected(value);
                  this.selected = i;
                  this.setState({value: value});
                }}
                labelHorizontal={true}
                labelWrapStyle={{
                  marginTop: 14,
                  marginLeft: -2,
                  marginRight: 20,
                }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    );
  }
}

const style = {
  containerStyle: {
    margin: 15,
    marginBottom: 0,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F1F3F6',
    padding: 15,
    fontSize: 15,
  },
};
