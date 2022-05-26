const axios = require('axios');
const BASE_URL = 'https://ocpcmarketingimmigration.myfreshworks.com';
// let data = await getData('user')
const customAxios = axios.create({
  baseURL: BASE_URL,
  //   Headers:
});
customAxios.defaults.headers.common['Authorization'] =
  'Token token=vVgu_SdLzsk9dwnlJ0GktQ';

export default customAxios;
