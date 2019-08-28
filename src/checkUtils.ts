import {
  FackerConfig,
  FackerRplacer
} from './interfaces';

export default {
  checkConfig(config: FackerConfig) {
    const {
      fackerUrl
    } = config;

    if (!fackerUrl || (typeof fackerUrl !== 'string' && typeof fackerUrl !== 'function')) {
      throw new Error('AxiosFacker config fackerUrl is required, and must be a string or function');
    }
  },

  checkReplacer(fackerUrl: string | FackerRplacer, baseUrl: string) {
    if (!baseUrl && typeof fackerUrl === 'string') {
      throw new Error('when axios.defaults.baseUrl is empty, fackerUrl must be a function.');
    }
  }
}