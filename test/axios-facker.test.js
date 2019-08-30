const axios = require('axios');
const createAxiosFacker = require('../src/index').default;

let xhr = null;

describe('axios-facker test cases', () => {
  beforeEach(() => {
    xhr = axios.create({
      baseURL: 'https://api.example.com'
    });
  });

  test('fackerUrl must be a string or function', () => {
    const init = () => {
      createAxiosFacker({
        fackerUrl: {}
      })(xhr);
    };

    expect(init).toThrow();
  });

  test('axios-facker init successful', () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com'
    })(xhr);
    expect(xhr.interceptors.request.handlers.length).toBe(1)
  });

  test('when axios.defaults.baseUrl is empty, fackerUrl must be a function', async () => {
    createAxiosFacker({
      fackerUrl: 'https://ddd.xxx.com'
    })(axios);

    const e = await axios.get('/user/12345').catch(e => {
      return e;
    });

    expect(e.message).toBe('when axios.defaults.baseUrl is empty, fackerUrl must be a function.');
  });

  test('string: replace request url with fackerUrl', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com'
    })(xhr);

    const e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/user/12345');
  });

  test('string: replace request full url with fackerUrl', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com'
    })(xhr);

    const e = await xhr.get('https://api.example.com/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/user/12345');
  });

  test('function: replace request url with fackerUrl', async () => {
    createAxiosFacker({
      fackerUrl: url => 'http://xxx.test.com/user'
    })(xhr);

    const e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('http://xxx.test.com/user');
  });

  test('disabled axios-facker', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      enabled: false
    })(xhr);

    const e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/user/12345');
  });

  test('include--string: filter does not matched request', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      include: '/user/'
    })(xhr);

    let e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/user/12345');

    e = await xhr.get('/api/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/api/12345');
  });

  test('include--regexp: filter does not matched request', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      include: /\/user\//
    })(xhr);

    let e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/user/12345');

    e = await xhr.get('/api/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/api/12345');
  });

  test('include--function: filter does not matched request', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      include: url => false
    })(xhr);

    let e = await xhr.get('/api/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/api/12345');
  });

  test('include--array: filter does not matched request', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      include: [ /\/user\// ]
    })(xhr);

    let e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/user/12345');

    e = await xhr.get('/api/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/api/12345');
  });

  test('exclude: filter matched request', async () => {
    createAxiosFacker({
      fackerUrl: 'https://api.test.com',
      exclude: /\/user\//
    })(xhr);

    let e = await xhr.get('/user/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.example.com/user/12345');

    e = await xhr.get('/api/12345').catch(e => {
      return e;
    });
    expect(e.config.url).toBe('https://api.test.com/api/12345');
  });
});