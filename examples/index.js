const axios = require('axios');
const createAxiosFacker = require('../dist/axios-facker.cjs').default;

axios.defaults.baseURL = 'https://api.example.com';

createAxiosFacker({
  fackerUrl: 'https://api.test.com'
})(axios);

axios.get('/user/12345').catch(e => {
  console.log(`fackerUrl is a string, and the result is : `, e.config.url);
});

axios.get('https://api.example.com/user/12345').catch(e => {
  console.log(`request url is fullpath, and the result is : `, e.config.url);
});

const http = axios.create({
  baseURL: 'https://api.example.com'
});

createAxiosFacker({
  fackerUrl: url => 'https://xxx.test.com/api/user'
})(http);

http.get('/user/12345').catch(e => {
  console.log(e.config.url);
});