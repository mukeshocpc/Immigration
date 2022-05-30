import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { ChatIcon } from '@utils/icons';
import { getApplications } from '@services/home';
import moment from 'moment';



class MyApplications extends Component {
  state = {
    deals: []
  };

  componentDidMount() {
    this.getApplications();
  }

  renderItem = ({ item, index }) => (
    <View
      style={{
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        padding: 10,
        // paddingHorizontal: 10,
        borderColor: '#000000',
        //borderBottomWidth: index == 0 ? 0 : 0.2,
        borderTopWidth: 0.2,
        paddingVertical: 10,

      }}>
      <View
        style={{
          flexDirection: 'column',
          // marginLeft: 20,
          marginRight: 5,
          justifyContent: 'space-between',
          width: '75%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 5,
            justifyContent: 'space-between',
            width: '75%',
          }}>
          <Text style={{ fontWeight: '600' }}>{item.name.toUpperCase()}</Text>
          <Text style={{ fontWeight: '600' }}>Pending</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 5,
            justifyContent: 'flex-start',
            width: '75%',
          }}>
          <Text style={{ fontWeight: '300' }}>Case <Text style={{ color: 'blue', fontWeight: '500' }}> #100</Text></Text>
          <Text style={{ fontWeight: '300' }}> on {moment().format("MM/DD/YYYY")}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 20,
          marginRight: 5,
          width: '25%',
        }}>

        <ChatIcon width={50} height={50} color={'#015F97'} />
        {/* <Text style={{fontSize: 12, paddingVertical: 5}}>{item.sub}</Text> */}
      </View>
    </View>
  );

  getApplications = async () => {
    try {
      let response = await getApplications();
      this.setState({ deals: response.data.deals });
      console.log('getApplications - ', response);
    } catch (error) {
      console.log('getApplications error - ', error);
    }
  };

  render() {
    let { deals } = this.state;
    return (
      <View style={styles.body}>
        <View
          style={{
            height: '2%',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>

        </View>

        <FlatList
          data={deals}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default MyApplications;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
});
