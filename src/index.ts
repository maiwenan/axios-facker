
import { AxiosStatic } from 'axios';
import {
  FackerConfig,
  FackerRplacer,
  RequestConf
} from './global';
import helpers from './helpers';
import checkUtils from './checkUtils';

const urljoin = require('url-join');

function replaceUrl(url: string, fackerUrl: string | FackerRplacer, baseUrl: string) {
  checkUtils.checkReplacer(fackerUrl, baseUrl);

  if (typeof fackerUrl === 'function') {
    return fackerUrl(url);
  } else {
    if (/^(http|https):\/\//.test(url)) {
      return url.replace(baseUrl, fackerUrl);
    } else {
      return urljoin(fackerUrl, url);
    }
  }
}

function match(url: string, config: FackerConfig): boolean {
  if (config.include) {
    return helpers.matchOne(url, config.include);
  }
  if (config.exclude) {
    return !helpers.matchOne(url, config.exclude);
  }
  return true;
}

export default function createAxiosFacker(config: FackerConfig) {
  return (axios: AxiosStatic) => {
    config = Object.assign({
      enabled: true
    }, config);

    checkUtils.checkConfig(config);
    if (!config.enabled) {
      return;
    }
    axios.interceptors.request.use((conf: RequestConf) => {
      const { fackerUrl } = config;
      const { baseURL } = axios.defaults;
      const { url } = conf;
      const isMatch = match(url, config);

      if (isMatch) {
        conf.url = replaceUrl(url, fackerUrl, baseURL);
      }
      return conf;
    });
  };
};
