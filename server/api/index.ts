import * as Koa from 'koa';
import * as Router from 'koa-router';
import fetch from 'node-fetch';

import { getRandomArbitrary } from '../utils/random-arbitrary/random-arbitrary';
import CURRENCIES from '../../src/app/currencies';

const app = new Koa();
const router = new Router();

/**
 * 🙃 WTFCK* IS THIS?
 *
 * TL;DR;
 * This is basically a proxy api for generate random numbers (close to the daily rates)
 * coming from the choosen API for currency rates.
 *
 * Full explanation:
 *
 * Yes, I apoligize for keeping almost everything belonging to the "custom" api in this file.
 * That's because I wanted to be fast plus the fact I was too lazy since this part of the task wasn't very needed.
 *
 * At the end of the day, this will emulate the idea of bringing different values every second.
 *
 * Haha, once again, sorry for that! :(
 *
 */

type Rates = {
  [CurrencyIso in string]: number;
};

interface LatestCurrencies {
  base: string;
  rates: Rates;
}

// This is essentially all the allowed currencies with its pockets (coming from the app's config)
const allowedCurrencies: string [] = Object.keys(CURRENCIES).map((iso: string) => CURRENCIES[iso].iso);

const DEFAULTS = {
  // Default currency for API hit on base daily rates
  currency: 'GBP',

  // These will randomize based on its min/maximum passed value
  minRandomNumber: 0.999,
  maxRandomNumber: 1.009,

  // Proxy URL for final URL (free one which is close-to-day rate)
  proxyUrl: "http://currency-exchange-fake-api.guicheffer.me/",
};

router.get('/:currency?(/)?', async (ctx) => {
  const { currency: rawCurrency = DEFAULTS.currency } = ctx.params;
  const selectedCurrency = rawCurrency.toUpperCase();

  await fetch(`${DEFAULTS.proxyUrl}${selectedCurrency}`)
    .then((res: { json: Function }) => res.json())
    .then(({ base, rates: serverCurrencies }: LatestCurrencies) => {
      const adaptedCurrencies = allowedCurrencies.reduce((rates: {} | LatestCurrencies, iso: string) => {
        const randomCurrencyValue =
          iso === selectedCurrency ?
            serverCurrencies[iso] :
              serverCurrencies[iso] * getRandomArbitrary(DEFAULTS.minRandomNumber, DEFAULTS.maxRandomNumber);

        return { ...rates, [iso]: randomCurrencyValue };
      }, {});

      ctx.body = { base, rates: adaptedCurrencies } as LatestCurrencies;
      ctx.status = 200;
    })
    .catch((err: Error) => {
      throw new Error(`Error fetching currencies: ${err.message}`);
    });
});

app.use(router.routes());

const { API_PORT } = process.env;
app.listen(API_PORT);
console.log(`🔥 Server running on port ${API_PORT}`);
