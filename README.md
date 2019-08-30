# axios-facker

> mock any request you want

axios-facker is based on axios, it helps you to replace a request baseURL with a mock url in your project 

## Install

```bash
npm install axios-facker --save-dev
```

## Usage

```js
import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';

if (process.env.NODE_ENV === 'development') {
  const createAxiosFacker = require('axios-facker');
  const options = {
    fackerUrl: 'https://api.mock.com'
  };

  createAxiosFacker(options)(axios);
}

// axios will request `https://api.mock.com/user`
axios.get('/user');
```

when fetch a request, the request baseURL will be replaced by `https://api.mock.com`.

## Options

### fackerUrl

### enabled

### include

### exclude

## License

[MIT](https://github.com/maiwenan/axios-facker/blob/master/README.md)