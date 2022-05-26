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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {step1} from 'react-native/Libraries/Animated/Easing';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

class NewApplication extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      step0: false,
      step1: false,
      step2: false,
      // fname: 'milan',
      // data: {},
    };
  }

  handleIndexChange = index => {
    // if (index == 1 && this.state.step0 == false) {
    //   alert('Please fill in all the personal detail');
    //   return;
    // }

    // if (index == 2 && this.state.step1 == false) {
    //   alert('Please fill in all the general details');
    //   return;
    // }

    this.setState({
      selectedIndex: index,
    });
  };

  onCreateApp = async () => {
    let data = await createApplication({});
    if (data.status == 200) {
      alert('Apllication created sucessfully');
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.tab}>
          <SegmentedControlTab
            tabStyle={{height: 34}}
            values={['Personal Info', 'General Info', 'Financial Info']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        <ScrollView
          bounces={true}
          contentContainerStyle={{height: '190%'}}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {this.state.selectedIndex == 0 && (
            <Step1
              default={this.state}
              // renderData={'aads'}
              onChange={state => {
                this.setState(state);
                // alert(JSON.stringify(this.state));
              }}
              onNext={step0 => {
                this.setState(step0);
                // alert(JSON.stringify(this.state));
                this.state.selectedIndex = 1;
                // let data1 = this.state.data;
                // this.setState({data: {...data}}); // 1 // loadash
                // this.setState({data: [...data1]}); // 2
                // alert(JSON.stringify(data));
                // this.setState(state);
                // alert(JSON.stringify(this.state));
              }}></Step1>
          )}
          {this.state.selectedIndex == 1 && (
            <Step2
              default={this.state}
              onChange={state => {
                this.setState(state);
                // alert(JSON.stringify(this.state));
              }}
              onNext={step1 => {
                this.setState(step1);
                // alert(JSON.stringify(this.state));
                this.state.selectedIndex = 2;
              }}></Step2>
          )}
          {this.state.selectedIndex == 2 && (
            <Step3
              default={this.state}
              onChange={state => {
                this.setState(state);
              }}
              onNext={step2 => {
                this.setState(step2);
                // alert(JSON.stringify(this.state));
                // this.state.selectedIndex = 2;
                alert('All Done');
              }}></Step3>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default NewApplication;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
});
