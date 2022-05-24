const axios = require('axios');
const BASE_URL = "api url"
// let data = await getData('user')
const customAxios = axios.create({
    baseURL: BASE_URL,

});




export default customAxios