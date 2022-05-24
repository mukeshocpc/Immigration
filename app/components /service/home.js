const axios = require('axios');

import customAxios from './axios'


const createApplication = async (payload) => {
    //sample
    // console.log(payload, `/login/user`)
    let response = await customAxios.post(`login/create`, payload)
    return response.data

}


export { createApplication }