import React, {Component} from 'react';
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

class NewApplication extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.tab}>
          <SegmentedControlTab
            tabStyle={{height: 34}}
            values={['Personal Info', 'General Info', 'Financial Info']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        {renderIf(this.state.selectedIndex == 0)(
          <ScrollView
            bounces={false}
            contentContainerStyle={{height: '130%'}}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.form}>
              <InputTextfield placeholder="First name" />
              <InputTextfield placeholder="Last name" />
              <InputTextfield placeholder="Email address" />
              <InputTextfield placeholder="Mobile number" />
              <CustomRadio
                title="Gender"
                data={[
                  {label: 'Male', value: 0},
                  {label: 'Female', value: 1},
                ]}
              />
              <InputTextfield placeholder="Date of Birth (MM/DD/YYYY)" />
              <CustomRadio
                title="Marital Status"
                data={[
                  {label: 'Married', value: 0},
                  {label: 'Single', value: 1},
                ]}
              />
              <DropdownComponent
                label="Number of Children?"
                onSelected={value => console.log('dropdown - ', value)}
                data={[
                  {label: '0', value: '0'},
                  {label: '1', value: '1'},
                  {label: '2', value: '2'},
                  {label: '3', value: '3'},
                  {label: '4', value: '4'},
                  {label: '5+', value: '5'},
                ]}
              />
            </View>
            <TouchableHighlight style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>
                NEXT
              </Text>
            </TouchableHighlight>
          </ScrollView>,
        )}
      </SafeAreaView>
    );
  }
}

const InputTextfield = ({placeholder, value}) => {
  return (
    <View style={InputTextfieldStyle.containerStyle}>
      <TextInput
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
});
