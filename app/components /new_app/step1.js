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

function Step1(props) {
  //   const [fname, setFname] = useState(
  //     props.default ? props.default.fname : undefined,
  //   );

  const genderArr = [
    {label: 'Male', value: 0},
    {label: 'Female', value: 1},
  ];

  const maritalArr = [
    {label: 'Married', value: 0},
    {label: 'Single', value: 1},
  ];

  const childrenArr = [
    {label: '0', value: 0},
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5+', value: 5},
  ];

  return (
    <View style={{backgroundColor: '#fff'}}>
      <InputTextfield
        value={props.default ? props.default.fname : ''}
        onChangeText={fname => props.onChange({fname})} //setFname({fname})}
        placeholder="First name"
      />
      <InputTextfield
        value={props.default ? props.default.lname : ''}
        onChangeText={lname => props.onChange({lname})}
        placeholder="Last name"
      />
      <InputTextfield
        value={props.default ? props.default.email : ''}
        onChangeText={email => props.onChange({email})}
        placeholder="Email address"
      />
      <InputTextfield
        placeholder="Mobile number"
        value={props.default ? props.default.mobile : ''}
        onChangeText={mobile => props.onChange({mobile})}
      />
      <CustomRadio
        select={getRadioIndex(
          genderArr,
          props.default ? props.default.gender : genderArr[0].label,
        )}
        onSelected={index => {
          const gender = getRadioLabel(genderArr, index);
          props.onChange({gender});
        }}
        title="Gender"
        data={genderArr}
      />
      <InputTextfield
        placeholder="Date of Birth (MM/DD/YYYY)"
        value={props.default ? props.default.dob : ''}
        onChangeText={dob => props.onChange({dob})}
      />
      <CustomRadio
        title="Marital Status"
        select={getRadioIndex(
          maritalArr,
          props.default ? props.default.marital : maritalArr[0].label,
        )}
        onSelected={index => {
          const marital = getRadioLabel(maritalArr, index);
          props.onChange({marital});
        }}
        data={maritalArr}
      />
      <DropdownComponent
        label="Number of Children?"
        data={childrenArr}
        val={parseInt(props.default ? props.default.children : -1)}
        onChange={index => {
          const children = getRadioLabel(childrenArr, index);
          props.onChange({children});
        }}
      />
      <TouchableHighlight
        style={CommonStyle.actionButton}
        onPress={() => {
          //   props.onNext({step0: true});

          if (!props.default.fname) {
            alert('Please enter First name');
          } else if (!props.default.lname || props.default.lname.length == 0) {
            alert('Please enter Last name');
          } else if (!validateEmail(props.default.email)) {
            alert('Please enter valid email address');
          } else if (!props.default.mobile || props.default.mobile.length < 8) {
            alert('Please enter valid mobile number');
          } else if (!props.default.dob || props.default.dob.length != 10) {
            alert('Please enter valid date of birth (MM/DD/YYYY)');
          } else if (!props.default.children || props.default.children < 0) {
            alert('Please enter select number of children');
          } else {
            props.onNext({step0: true});
          }

          //   data['ad'] = 'da';
          //   alert(JSON.stringify(data));
          //   props.onPress({fname, lname, email});
        }}>
        <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
          NEXT
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default Step1;
