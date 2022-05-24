import React, { Component, useState, useMemo } from 'react';
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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CustomRadio from './custom_radio';
import DropdownComponent from './dropdown';
import Dropdown from './dropdown';
import renderIf from '../../common/renderIf';
import countryList from 'react-select-country-list';

import { createApplication } from '@services/auth'

class NewApplication extends Component {
  genderArr = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
  ];

  maritalArr = [
    { label: 'Married', value: 0 },
    { label: 'Single', value: 1 },
  ];

  yesNoArr = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  countryArr = countryList().getData();

  educationArr = [
    { label: 'Elementary School', value: 'Elementary School' },
    { label: 'High School', value: 'High School' },
    { label: 'Associate Degree', value: 'Associate Degree' },
    { label: 'Bachelor', value: 'Bachelor' },
    { label: "Master's", value: "Master's" },
    { label: 'PhD', value: 'PhD' },
  ];

  studyAarr = [
    { label: 'Arts', value: 'Arts' },
    { label: 'Performing arts', value: 'Performing arts' },
    { label: 'Visual arts', value: 'Visual arts' },
    { label: 'History', value: 'History' },
    { label: 'Languages and literature', value: 'Languages and literature' },
    { label: 'Law', value: 'Law' },
    { label: 'Philosophy', value: 'Philosophy' },
    { label: 'Theology', value: 'Theology' },
    { label: 'Anthropology', value: 'Anthropology' },
    { label: 'Archaeology', value: 'Archaeology' },
    { label: 'Business', value: 'Business' },
    { label: 'Economics', value: 'Economics' },
    { label: 'Human geography', value: 'Human geography' },
    { label: 'Political science', value: 'Political science' },
    { label: 'Psychology', value: 'Psychology' },
    { label: 'Sociology', value: 'Sociology' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Earth sciences', value: 'Earth sciences' },
    { label: 'Space sciences', value: 'Space sciences' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Statistics', value: 'Statistics' },
    { label: 'Engineering and technology', value: 'Engineering and technology' },
    { label: 'Medicine and health', value: 'Medicine and health' },
  ];

  expArr = [
    { label: '1-5 Years', value: '1-5 Years' },
    { label: '5-10 Years', value: '5-10 Years' },
    { label: '10-15 Years', value: '10-15 Years' },
    { label: '15+ Years', value: '15+ Years' },
  ];

  citizenOfArr = [
    { label: 'No', value: 'No' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'USA & Canada', value: 'USA & Canada' },
  ];

  investArr = [
    { label: "I can't invest", value: "I can't invest" },
    { label: 'Between $100k to $250k', value: 'Between $100k to $250k' },
    { label: 'Between $250k to $500k', value: 'Between $250k to $500k' },
    { label: 'More than $500k', value: 'More than $500k' },
  ];

  data = {};
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      gender: 0,
      marital: 0,
      children: 0,
      data: {},
      fname: undefined,
      lname: undefined,
      email: undefined,
      mobile: undefined,
      dob: undefined,
      citizenship1: undefined,
      citizenship2: undefined,
      residence1: undefined,
      residence2: undefined,
      education: undefined,
      study: undefined,
      occupation: undefined,
      experience: undefined,
      ielts: 'Yes',
      ielts_score: undefined,
      mgmtExprience: 'Yes',
      schengenVisa: 'Yes',
      citizenOf: undefined,
      tuitionFee: 'Yes',
      accomplishments: 'Yes',
      investAmt: undefined,
      assetAmt: undefined,
      notes: undefined,
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  getRadioItem = (arr, value) => {
    const ex = arr.filter(function (item) {
      return item.value == value;
    });
    return ex[0].label;
  };



  onCreateApp = async () => {
    let data = await createApplication({})
    if (data.status == 200) {
      alert("Apllication created sucessfully")
    }
  }

  render() {
    let {
      fname,
      lname,
      email,
      mobile,
      gender,
      dob,
      children,
      citizenship1,
      citizenship2,
      residence1,
      residence2,
      education,
      experience,
      occupation,
      study,
      ielts,
      ielts_score,
      mgmtExprience,
      schengenVisa,
      citizenOf,
      tuitionFee,
      accomplishments,
      investAmt,
      assetAmt,
      notes,
    } = this.state;

    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.tab}>
          <SegmentedControlTab
            tabStyle={{ height: 34 }}
            values={['Personal Info', 'General Info', 'Financial Info']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        {renderIf(this.state.selectedIndex == 0)(
          <ScrollView
            bounces={true}
            contentContainerStyle={{ height: '100%' }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.form}>
              <InputTextfield
                value={this.state.fname}
                callback={fname => this.setState({ fname })}
                placeholder="First name"
              />
              <InputTextfield
                placeholder="Last name"
                callback={lname => this.setState({ lname })}
              />
              <InputTextfield
                placeholder="Email address"
                callback={email => this.setState({ email })}
              />
              <InputTextfield
                placeholder="Mobile number"
                callback={mobile => this.setState({ mobile })}
              />
              <CustomRadio
                onSelected={gender => this.setState({ gender })}
                title="Gender"
                data={this.genderArr}
              />
              <InputTextfield
                placeholder="Date of Birth (MM/DD/YYYY)"
                callback={dob => this.setState({ dob })}
              />
              <CustomRadio
                title="Marital Status"
                onSelected={marital => this.setState({ marital })}
                data={this.maritalArr}
              />
              <DropdownComponent
                label="Number of Children?"
                data={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                  { label: '5+', value: 5 },
                ]}
                callback={children => this.setState({ children })}
              />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.data['cf_first_name'] = this.state.fname;
                this.data['cf_last_name'] = this.state.lname;
                this.data['cf_email'] = this.state.email;
                this.data['cf_mobile'] = this.state.mobile;
                this.data['cf_gender'] = this.getRadioItem(
                  this.genderArr,
                  this.state.gender,
                );
                this.data['cf_date_of_birth'] = this.state.dob;
                this.data['cf_marital_status'] = this.getRadioItem(
                  this.maritalArr,
                  this.state.marital,
                );
                this.data['cf_number_of_children'] = this.state.children;
                // alert(JSON.stringify(this.data));
                this.handleIndexChange(1);
              }}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                NEXT
              </Text>
            </TouchableHighlight>
          </ScrollView>,
        )}
        {renderIf(this.state.selectedIndex == 1)(
          <ScrollView
            bounces={true}
            contentContainerStyle={{ height: '190%' }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <DropdownComponent
              search={true}
              label="Country of Citizenship (1): *"
              data={this.countryArr}
              callback={citizenship1 => this.setState({ citizenship1 })}
            />
            <DropdownComponent
              search={true}
              label="Country of Residence (1): *"
              data={this.countryArr}
              callback={residence1 => this.setState({ residence1 })}
            />
            <DropdownComponent
              search={true}
              label="Country of Citizenship (2): *"
              data={this.countryArr}
              callback={citizenship2 => this.setState({ citizenship2 })}
            />
            <DropdownComponent
              search={true}
              label="Country of Residence (2): *"
              data={this.countryArr}
              callback={residence2 => this.setState({ residence2 })}
            />
            <DropdownComponent
              label="Highest Level of Education: *"
              data={this.educationArr}
              callback={education => this.setState({ education })}
            />
            <DropdownComponent
              label="Field of Study: *"
              data={this.studyAarr}
              callback={study => this.setState({ study })}
            />
            <InputTextfield
              placeholder="Current Occupation: *"
              callback={occupation => this.setState({ occupation })}
            />
            <DropdownComponent
              label="Years of Work Experience: *"
              data={this.expArr}
              callback={experience => this.setState({ experience })}
            />
            <CustomRadio
              title="Do you have IELTS? *"
              onSelected={marital => this.setState({ marital })}
              data={this.yesNoArr}
            />
            <InputTextfield
              placeholder="What is your IELTS score? *"
              callback={occupation => this.setState({ occupation })}
            />
            <CustomRadio
              title="Do you have any management or business ownership experience? *"
              onSelected={marital => this.setState({ marital })}
              data={this.yesNoArr}
            />
            <CustomRadio
              title="Do you have or have you had Schengen Visa? *"
              onSelected={marital => this.setState({ marital })}
              data={this.yesNoArr}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.data['cf_country_of_citizenship_1'] =
                  this.state.citizenship1;
                this.data['cf_country_of_citizenship_2'] =
                  this.state.citizenship2;
                this.data['cf_country_of_residence_1'] = this.state.residence1;
                this.data['cf_country_of_residence_2'] = this.state.residence2;
                this.data['cf_highest_level_of_education'] =
                  this.state.education;
                this.data['cf_field_of_study'] = this.state.study;
                this.data['cf_current_occupation'] = this.state.occupation;
                this.data['cf_years_of_work_experience'] =
                  this.state.experience;
                this.data['cf_do_you_have_ielts'] = this.state.ielts;
                this.data['cf_what_is_your_ielts_score'] =
                  this.state.ielts_score;
                this.data[
                  'cf_do_you_have_any_management_or_business_ownership_experience'
                ] = this.state.mgmtExprience;
                this.data['cf_do_you_have_or_have_you_had_schengen_visa'] =
                  this.state.schengenVisa;

                alert(JSON.stringify(this.data));
                this.handleIndexChange(2);
              }}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                NEXT
              </Text>
            </TouchableHighlight>
          </ScrollView>,
        )}
        {renderIf(this.state.selectedIndex == 2)(
          <ScrollView
            bounces={true}
            contentContainerStyle={{ height: '190%' }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.legendContainer}>
              <Text>
                Do you have an immediate family member (parents, spouse,
                siblings) who is a permanent resident or citizen of USA or
                Canada? *
              </Text>
              <DropdownComponent
                label=""
                data={this.citizenOfArr}
                callback={citizenOf => this.setState({ citizenOf })}
              />
            </View>
            <CustomRadio
              title="Are you able to pay $10,000 to $15,000 on tuition fees? *"
              onSelected={tuitionFee => this.setState({ tuitionFee })}
              data={this.yesNoArr}
            />
            <CustomRadio
              title="Have you had accomplishments in Sports, Business, Science, or Arts? *"
              onSelected={accomplishments => this.setState({ accomplishments })}
              data={this.yesNoArr}
            />
            <View style={styles.legendContainer}>
              <Text>How much can you invest in US Dollars? *</Text>
              <DropdownComponent
                label=""
                data={this.investArr}
                callback={investAmt => this.setState({ investAmt })}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text>
                How much is your total value of all your assets in US dollar? *
              </Text>
              <InputTextfield
                callback={assetAmt => this.setState({ assetAmt })}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text>
                If there is anything else that you would like to let us know
                please put here.
              </Text>

              <TextInput
                onChangeText={text => this.setState({ notes })}
                placeholder="Notes"
                multiline={true}
                style={InputTextfieldStyle.textAreaStyle}
              />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                this.data[
                  'cf_do_you_have_an_immediate_family_member_parents_spouse_siblings_who_is_a_permanent_resident_or_citizen_of_usa_or_canada'
                ] = this.state.citizenOf;
                this.data[
                  'cf_have_you_had_accomplishments_in_sports_business_science_or_arts'
                ] = this.state.accomplishments;
                this.data[
                  'cf_are_you_able_to_pay_10000_to_15000_on_tuition_fees'
                ] = this.state.tuitionFee;
                this.data['cf_how_much_can_you_invest_in_us_dollars'] =
                  this.state.investAmt;
                this.data[
                  'cf_how_much_is_your_total_value_of_all_your_assets_in_us_dollar'
                ] = this.state.assetAmt;
                this.data['cf_notes'] = this.state.notes;
                alert(JSON.stringify(this.data));
              }}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                SUBMIT
              </Text>
            </TouchableHighlight>
          </ScrollView>,
        )}
      </SafeAreaView>
    );
  }
}

const InputTextfield = ({ placeholder, value, callback }) => {
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

export default NewApplication;

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    padding: 15,
    color: '#FFF',
    backgroundColor: '#3A909E',
    height: 50,
    margin: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    margin: 15,
  },
  legendContainer: {
    margin: 15,
    marginBottom: 0,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F1F3F6',
    padding: 15,
    fontSize: 15,
  },
});
