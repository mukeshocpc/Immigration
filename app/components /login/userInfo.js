import React, { useState, useRef } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';


export default UserInfo = (props) => {
    const [value, setValue] = useState("");
    const [fname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const phoneInput = useRef(null);


    return (
        <View style={{ alignSelf: 'center', alignSelf: 'center', paddingHorizontal: 20, flex: 1, width: "95%", backgroundColor: '#fff' }}>
            <Text style={styles.sectionTitle}>Your Details</Text>
            <Text style={styles.sectionDescription}>Please enter below details to create your immigration account with us</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={fname}
                placeholder="First Name"
                placeholderTextColor="#252847"

            />
            <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastname}
                placeholder="Last Name"
                placeholderTextColor="#252847"

            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor="#252847"

            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submit}
                onPress={() => {
                    const checkValid = fname.length > 0 && lastname.length > 0 && email.length > 0;
                    if (checkValid) {
                        props.onPress({ fname, lastname, email })

                    } else {
                        alert("Invalid User Info")
                    }

                }}>
                <Text style={{ fontSize: 20, alignSelf: 'center', color: '#fff' }}>Complete Signup</Text>
            </TouchableOpacity>
        </View >

    )
}

const styles = StyleSheet.create({

    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    submit: {
        marginTop: 20,
        borderRadius: 50,
        lineHeight: 20,
        // marginHorizontal: 50,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#8992A9',
    },
    sectionTitle: {
        lineHeight: 22,
        width: '80%',
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 20,
        textAlign: 'center',
        marginVertical: 10,
        color: "#000",
    },
    sectionDescription: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '400',
        alignSelf: 'center',
        color: "#77798D",
    },
    input: {
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: '#F2F3F6',
        paddingHorizontal: 30,
        paddingVertical: 25,
        placeholderTextColor: "#252847",
        lineHeight: 20,
        borderRadius: 50,
        fontSize: 16
        // fontWeight: 500



    }
});
