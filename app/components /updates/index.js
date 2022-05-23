import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { UpdateIcon } from '@utils/icons'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'This is the interesting headline of ',
        sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'This is the interesting headline of ',
        sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    },

];





const renderItem = ({ item, index }) => (
    <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        //  paddingHorizontal: 5,
        padding: 20,
        marginHorizontal: 10,
        borderColor: '#000000',
        borderRadius: 10,
        borderWidth: .2,
        paddingVertical: 10
    }}>

        <View style={{ flexDirection: 'row', width: '75%' }}>
            <Text style={{
                fontWeight: '700',
                fontSize: 12,
                color: '#A4243B',
                backgroundColor: '#F6EAEC',
                borderRadius: 15,
                width: 30,
                //height: 30,
                textAlign: 'center',
                paddingVertical: 5,
                marginBottom: 5
            }}>SCU</Text>
            <Text style={{
                color: '#77798D',
                fontSize: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 5,
            }}> . 2hr Ago</Text>
        </View>
        <Text style={{ fontWeight: '700', fontSize: 18 }}>{item.title}</Text>
        <Text style={{ fontSize: 16, lineHeight: 22, paddingVertical: 5 }}>{item.sub}</Text>

    </View>
);
export default Updates = () => {
    return (
        <View style={styles.body}>
            <View style={{
                height: '20%',
                flexDirection: 'column', alignContent: 'center', justifyContent: 'space-around', alignItems: 'center'
            }}>
                <UpdateIcon width={100} height={100} color={"#FF5B31"} />
                <Text style={{ fontWeight: '700', fontSize: 20 }}>Latest Updates</Text>
            </View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: "#FFF",
    }
});


