import React, { useState, useRef } from 'react';

import PhoneInput from "react-native-phone-number-input";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


export default InputPhone = (props) => {
    const [value, setValue] = useState(props.defaultValue);
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);

    return (
        <View style={{ alignSelf: 'center', alignSelf: 'center', paddingHorizontal: 20, flex: 1, width: "95%" }}>
            <Text style={styles.sectionTitle}>Get Started with Immigration App</Text>
            <Text style={styles.sectionDescription}>Enter your mobile number to login or signup</Text>
            <PhoneInput
                containerStyle={{ borderRadius: 10, borderColor: "#000", marginTop: 20, alignSelf: 'center' }}
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submit}
                onPress={() => {
                    const checkValid = phoneInput.current?.isValidNumber(value);
                    if (checkValid) {
                        props.onPress(formattedValue)
                    } else {
                        alert("Invalid phone number")
                    }

                }}>
                <Text style={{ fontSize: 20, alignSelf: 'center', color: '#fff' }}> Login</Text>
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
        marginTop: 40,
        borderRadius: 10,
        // marginHorizontal: 50,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#8992A9',
    },
    sectionTitle: {
        width: '80%',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 20,
        textAlign: 'center',
        marginVertical: 10,
        color: "#000",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: '400',
        alignSelf: 'center',
        color: "#000",
    }
});
