const axios = require('axios');
const createAxiosFacker = require('../dist/axios-facker.cjs').default;

axios.defaults.baseURL = 'https://api.example.com';

createAxiosFacker({
  fackerUrl: 'https://api.test.com'
})(axios);

axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
  }).catch(e => {
    console.log(e.config.url);
  });