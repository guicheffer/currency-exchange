import { Env } from "./configs";

export type DefaultApiUrlsType = {
  [key in string | Env]: any | Env | string | DefaultApiUrlsType;
}

export default {
  fakeApi: 'http://currency-exchange-fake-api.guicheffer.me/',
  proxyApi: {
    development: 'http://localhost:3001/',
    prod: 'http://currency-exchange-api.guicheffer.me/',
    production: 'http://currency-exchange-api.guicheffer.me/',
  }
} as DefaultApiUrlsType;
