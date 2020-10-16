import { useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { CurrencySchema } from '../../../app/currencies';
import { CurrencySelectionType } from '../../../store/amounts/amounts.slices';
import { formatAmount } from '../../../commons/utils/format-amount/format-amount';
import { getBalanceExceeded, getCurrencyBalance } from '../../../store/balances/balances.selectors';
import { getMinimumAmountToExchange } from '../../../store/amounts/amounts.selectors';
import { RootState } from '../../../store/store';
import CONFIGS from '../../../app/configs';
import styles from '../CurrencySelection.module.scss';

interface BalanceDisplayProps {
  currency: CurrencySchema['iso'];
  type: CurrencySelectionType;
  justExchanged?: Boolean;
}

const makeGetCurrencyBalance = () => getCurrencyBalance;

export const BalanceDisplay: FunctionComponent<BalanceDisplayProps> = ({
  type,
  currency,
  justExchanged = false,
}): ReactElement => {
  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);

  const hasBalanceExceededValue = useSelector(getBalanceExceeded);
  const hasMinimumAmountValue = useSelector(getMinimumAmountToExchange);

  const selectCurrencyBalance = useMemo(makeGetCurrencyBalance, []);
  const currencyBalance = useSelector((state: RootState) => selectCurrencyBalance(state, currency));

  return (
    <section className={styles.display}>
      <p className={`${styles.balance} ${!isSelectionTypeFrom && justExchanged ? styles.balanceJustExchanged : ''}`}>
        {CONFIGS.APP.TRANSLATIONS?.BALANCE}: {formatAmount(currencyBalance, currency)}
      </p>

      {/* This will display a "balance exceeded" info when amount value */}
      {
        isSelectionTypeFrom && hasBalanceExceededValue && <p> {CONFIGS.APP.TRANSLATIONS?.BALANCE_EXCEEDED} </p>
      }

      {/* This will display a "minimum amount is..." warning */}
      {
        isSelectionTypeFrom && !hasMinimumAmountValue &&
        <p className={`${styles.warning}`}>
          {CONFIGS.APP.TRANSLATIONS?.MINIMUM_EXPECTED} {formatAmount(CONFIGS.APP.CURRENCIES[currency].minimum, currency)}
        </p>
      }
    </section>
  );
}
