const axios = require('axios');

import customAxios from './axios'


const doLogin = async (payload) => {
    //sample
    // console.log(payload, `/login/user`)
    // payload.fcmToken = ""
    // let token = await getData('fcmToken')
    // if (token && token.fcmToken)
    //     payload.fcmToken = token.fcmToken
    // let response = await customAxios.post(`login/user`, payload)
    // return response.data

}


export { doLogin }