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

function Step2(props) {
  const yesNoArr = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ];

  const countryArr = countryList().getData();
  // alert(countryArr);
  const educationArr = [
    {label: 'Elementary School', value: 'Elementary School'},
    {label: 'High School', value: 'High School'},
    {label: 'Associate Degree', value: 'Associate Degree'},
    {label: 'Bachelor', value: 'Bachelor'},
    {label: "Master's", value: "Master's"},
    {label: 'PhD', value: 'PhD'},
  ];

  const studyAarr = [
    {label: 'Arts', value: 'Arts'},
    {label: 'Performing arts', value: 'Performing arts'},
    {label: 'Visual arts', value: 'Visual arts'},
    {label: 'History', value: 'History'},
    {label: 'Languages and literature', value: 'Languages and literature'},
    {label: 'Law', value: 'Law'},
    {label: 'Philosophy', value: 'Philosophy'},
    {label: 'Theology', value: 'Theology'},
    {label: 'Anthropology', value: 'Anthropology'},
    {label: 'Archaeology', value: 'Archaeology'},
    {label: 'Business', value: 'Business'},
    {label: 'Economics', value: 'Economics'},
    {label: 'Human geography', value: 'Human geography'},
    {label: 'Political science', value: 'Political science'},
    {label: 'Psychology', value: 'Psychology'},
    {label: 'Sociology', value: 'Sociology'},
    {label: 'Biology', value: 'Biology'},
    {label: 'Chemistry', value: 'Chemistry'},
    {label: 'Earth sciences', value: 'Earth sciences'},
    {label: 'Space sciences', value: 'Space sciences'},
    {label: 'Physics', value: 'Physics'},
    {label: 'Computer Science', value: 'Computer Science'},
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'Statistics', value: 'Statistics'},
    {label: 'Engineering and technology', value: 'Engineering and technology'},
    {label: 'Medicine and health', value: 'Medicine and health'},
  ];

  const expArr = [
    {label: '1-5 Years', value: '1-5 Years'},
    {label: '5-10 Years', value: '5-10 Years'},
    {label: '10-15 Years', value: '10-15 Years'},
    {label: '15+ Years', value: '15+ Years'},
  ];
  return (
    <View style={{backgroundColor: '#fff'}}>
      <DropdownComponent
        search={true}
        label="Country of Citizenship (1): *"
        data={countryArr}
        val={
          props.default.citizenship1
            ? countryArr[getRadioIndex(countryArr, props.default.citizenship1)]
                .value
            : ''
        }
        onChange={index => {
          const citizenship1 = getRadioLabel(countryArr, index);
          props.onChange({citizenship1});
        }}
      />
      <DropdownComponent
        search={true}
        label="Country of Residence (1): *"
        data={countryArr}
        val={
          props.default.residence1
            ? countryArr[getRadioIndex(countryArr, props.default.residence1)]
                .value
            : undefined
        }
        onChange={index => {
          const residence1 = getRadioLabel(countryArr, index);
          props.onChange({residence1});
        }}
      />
      <DropdownComponent
        search={true}
        label="Country of Citizenship (2):"
        data={countryArr}
        val={
          props.default.citizenship2
            ? countryArr[getRadioIndex(countryArr, props.default.citizenship2)]
                .value
            : undefined
        }
        onChange={index => {
          const citizenship2 = getRadioLabel(countryArr, index);
          props.onChange({citizenship2});
        }}
      />
      <DropdownComponent
        search={true}
        label="Country of Residence (2):"
        data={countryArr}
        val={
          props.default.residence2
            ? countryArr[getRadioIndex(countryArr, props.default.residence2)]
                .value
            : undefined
        }
        onChange={index => {
          const residence2 = getRadioLabel(countryArr, index);
          props.onChange({residence2});
        }}
      />
      <DropdownComponent
        label="Highest Level of Education: *"
        data={educationArr}
        val={props.default ? props.default.education : undefined}
        onChange={index => {
          const education = getRadioLabel(educationArr, index);
          props.onChange({education});
        }}
      />
      <DropdownComponent
        label="Field of Study: *"
        data={studyAarr}
        val={props.default ? props.default.study : undefined}
        onChange={index => {
          const study = getRadioLabel(studyAarr, index);
          props.onChange({study});
        }}
      />
      <InputTextfield
        placeholder="Current Occupation: *"
        value={props.default ? props.default.occupation : ''}
        onChangeText={occupation => props.onChange({occupation})}
      />
      <DropdownComponent
        label="Years of Work Experience: *"
        data={expArr}
        val={props.default ? props.default.experience : undefined}
        onChange={index => {
          const experience = getRadioLabel(expArr, index);
          props.onChange({experience});
        }}
      />
      <CustomRadio
        title="Do you have IELTS? *"
        data={yesNoArr}
        select={getRadioIndex(
          yesNoArr,
          props.default ? props.default.ielts : yesNoArr[1].label,
        )}
        onSelected={index => {
          const ielts = getRadioLabel(yesNoArr, index);
          props.onChange({ielts});
        }}
      />
      {props.default.ielts == 'Yes' && (
        <InputTextfield
          placeholder="What is your IELTS score? *"
          value={props.default ? props.default.ielts_score : ''}
          onChangeText={ielts_score => props.onChange({ielts_score})}
        />
      )}
      <CustomRadio
        title="Do you have any management or business ownership experience? *"
        data={yesNoArr}
        select={getRadioIndex(
          yesNoArr,
          props.default ? props.default.mgmtExp : yesNoArr[0].label,
        )}
        onSelected={index => {
          const mgmtExp = getRadioLabel(yesNoArr, index);
          props.onChange({mgmtExp});
        }}
      />
      <CustomRadio
        title="Do you have or have you had Schengen Visa? *"
        data={yesNoArr}
        select={getRadioIndex(
          yesNoArr,
          props.default ? props.default.schengenVisa : yesNoArr[0].label,
        )}
        onSelected={index => {
          const schengenVisa = getRadioLabel(yesNoArr, index);
          props.onChange({schengenVisa});
        }}
      />
      <TouchableHighlight
        style={CommonStyle.actionButton}
        onPress={() => {
          if (!props.default.citizenship1) {
            alert('Please select country of citizenship');
          } else if (!props.default.residence1) {
            alert('Please select country of residence');
          } else if (!props.default.education) {
            alert('Please select level of education');
          } else if (!props.default.study) {
            alert('Please select field of study');
          } else if (
            !props.default.occupation ||
            props.default.occupation.length == 0
          ) {
            alert('Please enter current occupation');
          } else if (!props.default.experience) {
            alert('Please select years of work experience');
          } else {
          }
        }}>
        <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
          NEXT
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default Step2;
