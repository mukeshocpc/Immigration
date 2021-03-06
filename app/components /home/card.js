import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Platform
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import LinearGradient from 'react-native-linear-gradient';



export default CardView = (props) => {
    let { title, subTitle, color, backgroundColor, icon, onPress, notification } = props
    return (
        <View style={[styles.main, { padding: 10 }]}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={backgroundColor} style={[styles.linearGradient, styles.section1]}>
                {icon}
            </LinearGradient>
            <Pressable style={styles.section2} onPress={onPress}>
                <Text style={styles.section2_txt}>{title}</Text>
                <View style={styles.section2_sub}>
                    <Text style={styles.section2_sub_text}>{subTitle}</Text>
                    <Icon name="arrowright" size={30} color={color} />
                </View>

            </Pressable>
            {notification && notification > 0 && <View style={styles.notificationView}>
                <Text style={{ color: 'white', fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}>
                    {notification}
                </Text>
            </View>}
        </View>)
};

const styles = StyleSheet.create({
    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    main: {
        padding: 10,
        backgroundColor: 'white',
        height: 150,
        flexDirection: 'row',
        position: 'relative',
        alignContent: 'center',
        marginHorizontal: 20,
        marginTop: 10
    },
    section1: {
        backgroundColor: '#25708C',
        width: '90%',
        height: "100%",
        borderBottomLeftRadius: 10,
        borderTopStartRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section2: {
        backgroundColor: 'white',
        width: '60%',
        height: 110,
        position: 'absolute',
        justifyContent: 'space-around',
        right: 0,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#DEDEDE',
        borderWidth: 1.5,
        padding: 10
    },
    section2_sub: {

        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    section2_sub_text: {
        // marginVertical: 10,
        flexBasis: "70%",
        fontSize: 16,
        fontWeight: '300',
        //  marginLeft: 10,
        textAlign: 'left',
    },
    section2_txt: {
        fontSize: 22,
        fontWeight: Platform.OS == 'android' ? 'bold' : '600',
        color: "#000",
        marginLeft: 5,
        textAlign: 'left',
    }
    , notificationView: {
        backgroundColor: 'red',
        position: 'absolute',
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}


);