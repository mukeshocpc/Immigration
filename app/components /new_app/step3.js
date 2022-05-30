import React, {Component, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Button,
  TouchableHighlight,
} from 'react-native';
import CustomRadio from './custom_radio';
import DropdownComponent from './dropdown';
import Dropdown from './dropdown';
import InputTextfield from './input_textfield';
import CommonStyle from '../../common/style';
import {getRadioLabel, getRadioIndex, validateEmail} from '../../common/util';
import countryList from 'react-select-country-list';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';

function Step3(props) {
  const yesNoArr = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ];

  const citizenOfArr = [
    {label: 'No', value: 'No'},
    {label: 'USA', value: 'USA'},
    {label: 'Canada', value: 'Canada'},
    {label: 'USA & Canada', value: 'USA & Canada'},
  ];

  const investArr = [
    {label: "I can't invest", value: "I can't invest"},
    {label: 'Between $100k to $250k', value: 'Between $100k to $250k'},
    {label: 'Between $250k to $500k', value: 'Between $250k to $500k'},
    {label: 'More than $500k', value: 'More than $500k'},
  ];

  // alert(props.default.citizenship1);
  // alert(JSON.stringify(countryArr));
  // alert(getRadioIndex(countryArr, props.default.citizenship1));
  return (
    <View style={{backgroundColor: '#fff'}}>
      <View style={CommonStyle.legendContainer}>
        <Text>
          Do you have an immediate family member (parents, spouse, siblings) who
          is a permanent resident or citizen of USA or Canada? *
        </Text>
        <DropdownComponent
          label=""
          data={citizenOfArr}
          val={props.default ? props.default.citizenOf : undefined}
          onChange={index => {
            const citizenOf = getRadioLabel(citizenOfArr, index);
            props.onChange({citizenOf});
          }}
        />
      </View>
      <CustomRadio
        title="Are you able to pay $10,000 to $15,000 on tuition fees? *"
        data={yesNoArr}
        select={getRadioIndex(
          yesNoArr,
          props.default ? props.default.tuitionFee : yesNoArr[0].label,
        )}
        onSelected={index => {
          const tuitionFee = getRadioLabel(yesNoArr, index);
          props.onChange({tuitionFee});
        }}
      />
      <CustomRadio
        title="Have you had accomplishments in Sports, Business, Science, or Arts? *"
        data={yesNoArr}
        select={getRadioIndex(
          yesNoArr,
          props.default ? props.default.accomplishments : yesNoArr[0].label,
        )}
        onSelected={index => {
          const accomplishments = getRadioLabel(yesNoArr, index);
          props.onChange({accomplishments});
        }}
      />
      <View style={CommonStyle.legendContainer}>
        <Text>How much can you invest in US Dollars? *</Text>
        <DropdownComponent
          label=""
          data={investArr}
          val={props.default ? props.default.investAmt : undefined}
          onChange={index => {
            const investAmt = getRadioLabel(investArr, index);
            props.onChange({investAmt});
          }}
        />
      </View>
      <View style={CommonStyle.legendContainer}>
        <Text>
          How much is your total value of all your assets in US dollar? *
        </Text>

        <InputTextfield
          value={props.default ? props.default.assetAmt : ''}
          onChangeText={assetAmt => props.onChange({assetAmt})}
        />
      </View>
      <View style={CommonStyle.legendContainer}>
        <Text>
          If there is anything else that you would like to let us know please
          put here.
        </Text>
        <TextInput
          placeholder="Notes"
          multiline={true}
          style={CommonStyle.textAreaStyle}
          value={props.default ? props.default.notes : ''}
          onChangeText={notes => props.onChange({notes})}
        />
      </View>
      <TouchableHighlight
        style={CommonStyle.actionButton}
        onPress={() => {
          if (
            !props.default.citizenOf ||
            !props.default.assetAmt ||
            !props.default.investAmt ||
            props.default.investAmt.length == 0 ||
            !props.default.assetAmt ||
            props.default.assetAmt.length == 0
          ) {
            alert('Please fill all required details');
          } else {
            props.onNext({step1: true});
          }
        }}>
        <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
          NEXT
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default Step3;
