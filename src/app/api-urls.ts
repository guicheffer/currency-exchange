import { Env } from './configs';

export type DefaultApiUrlsType = {
  [key in string | Env]: any | Env | string | DefaultApiUrlsType;
}

export default {
  fakeApi: 'http://currency-exchange-fake-api.guicheffer.me/',
  proxyApi: {
    // TODO: Roll this back for development reasons
    development: 'http://localhost:3001/',
    production: 'http://currency-exchange-fake-api.guicheffer.me/',
  }
} as DefaultApiUrlsType;
