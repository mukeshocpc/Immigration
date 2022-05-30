import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

import {NotifcationIcon} from '@utils/icons';
import {getApplications} from '../service/Home';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '#103 Chat Support',
    sub: 'We need more details for your application.Lets discuss',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '#103 Chat Support',
    sub: 'We need more details for your application.Lets discuss',
  },
];

class MyApplications extends Component {
  componentDidMount() {
    this.getApplications();
  }

  renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        padding: 10,
        marginHorizontal: 10,
        borderBottomColor: '#000000',
        borderBottomWidth: index == 0 ? 0 : 0.2,
        borderTopWidth: 0.2,
        paddingVertical: 10,
      }}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
          borderColor: '#000',
          borderWidth: 1,
        }}
        source={{uri: 'https://picsum.photos/200'}}
      />
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 20,
          marginRight: 5,
          width: '75%',
        }}>
        <Text style={{fontWeight: '600'}}>{item.title}</Text>
        <Text style={{fontSize: 12, paddingVertical: 5}}>{item.sub}</Text>
      </View>
    </View>
  );

  getApplications = async () => {
    try {
      let response = await getApplications();
      console.log('getApplications - ', response);
    } catch (error) {
      console.log('getApplications error - ', error);
    }
  };

  render() {
    return (
      <View style={styles.body}>
        <View
          style={{
            height: '20%',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <NotifcationIcon width={100} height={100} color={'#015F97'} />
          <Text style={{fontWeight: '700', fontSize: 20}}>My Applications</Text>
        </View>

        <FlatList
          data={DATA}
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
