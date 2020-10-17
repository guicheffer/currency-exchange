export type DefaultTranslationsType = {
  [key: string]: string;
}

export default {
  BALANCE_EXCEEDED: 'exceeds balance',
  BALANCE: 'Balance',
  CONFIRM_EXCHANGE: '💰 Do you confirm the exchange?',
  EXCHANGE_ACTION: 'Exchange',
  MINIMUM_EXPECTED: 'minimum amount is',
  NAV_LABEL: 'Switch Currencies + Check current FX rate',
  RATE_ERROR: 'Forex rates are outdated, please try again later.',
  RATE_TEXT_BASE_AMOUNT: '1', // yes, i know this will most likely never change, please hate me :P
  RATE_TEXT_COMPARISON_SYMBOL: '=',
  RATE_TEXT_SYMBOL: '↗',
  SWITCH_HELP_TEXT: 'Switch currencies',
  SWITCH_TEXT_SYMBOL: '↕',
} as DefaultTranslationsType;
