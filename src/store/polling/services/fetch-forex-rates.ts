import { CurrencySchema } from "../../../app/currencies";
import CONFIGS, { Env } from "../../../app/configs";

const { NODE_ENV = 'production' }: { NODE_ENV: Env } = process.env;
export const API_URL = CONFIGS.APP.API_URLS.proxyApi[NODE_ENV] as string;

export const fetchForexRates = async (
  base: CurrencySchema['iso'] = CONFIGS.APP.DEFAULT_CURRENCY['from'].iso,
) => {
  const url = `${API_URL}${base}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const { status } = response;

    if (status === 201 || status === 200) {
      const data = await response.json();
      return data;
    }

    // I know, we could improve error handling a bit here
    throw new Error("Request failed to some reason :(");
  } catch (error) {
    throw new Error(error);
  }
};
