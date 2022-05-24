import React, { useState, useEffect } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

let timer = () => { };
export default OTPView = (props) => {
    const [code, setCode] = useState();
    const [timeLeft, setTimeLeft] = useState(30);

    const startTimer = () => {
        timer = setTimeout(() => {
            if (timeLeft <= 0) {
                clearTimeout(timer);
                return false;
            }
            setTimeLeft(timeLeft - 1);
        }, 1000)
    }

    useEffect(() => {
        startTimer();
        return () => clearTimeout(timer);
    });

    const start = () => {
        setTimeLeft(30);
        clearTimeout(timer);
        startTimer();
    }


    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(timerId);
        };
    }, []);



    return (
        <View style={{ alignSelf: 'center', alignSelf: 'center', paddingHorizontal: 20, flex: 1, width: "95%" }}>
            <Text style={styles.sectionTitle}>Verfiy</Text>
            <Text style={styles.sectionDescription}>Please enter the OTP we've sent to your mobile</Text>
            <OTPInputView
                style={{ width: '80%', height: 100, alignSelf: 'center', }}
                pinCount={4}
                //code={code}
                onCodeChanged={code => { setCode({ code }) }}
                autoFocusOnLoad
                codeInputFieldStyle={{ borderColor: '#016CAB', color: "#000" }}
                codeInputHighlightStyle={{ borderColor: 'green', color: "#000" }}
                onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ marginTop: 0, fontSize: 14, alignSelf: 'center', color: '#77798D' }}> Didn't get a text ?</Text>
                <TouchableOpacity
                    disabled={timeLeft != 0}
                    onPress={start}>
                    <Text style={{ fontSize: 16, alignSelf: 'center', color: 'blue' }}> {timeLeft == 0 ? "Resend" : `Resend in (${timeLeft})`}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submit}
                onPress={() => {
                    if (code) {
                        props.onPress(code)
                    } else {
                        alert("Invalid OTP")
                    }

                }}>
                <Text style={{ fontSize: 20, alignSelf: 'center', color: '#fff' }}> NEXT</Text>
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
