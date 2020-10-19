import React, { ChangeEvent } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputLabel,
} from '@material-ui/core';

import { themeVariables } from 'shared/theme';
import { Currency, CurrencySymbol } from 'shared/types';
import {
  isValidTwoDecimalPlaceNumber,
  MAX_AMOUNT_ALLOWED_TO_EXCHANGE,
} from 'shared/utils/exchangeUtils';

const useStyles = makeStyles((theme) => ({
  exchangeItemContainer: { padding: '30px 15px' },
  formControl: {
    width: '80px',
    '& .MuiInputBase-root.MuiInput-underline': {
      '&:before, &:after': {
        borderBottom: 'none',
      },
    },
  },
  select: {
    '& .MuiSelect-select:focus': {
      backgroundColor: ({ type }: Props) =>
        type === 'source'
          ? themeVariables.colors.white
          : themeVariables.colors.paleBlue,
    },
  },
  menuItem: {
    '&.MuiListItem-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
  operatorSignContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  amountContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  amountInputField: {
    '&.MuiInput-underline': {
      '&:before, &:after, &:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
      },
      '& .MuiInputBase-input': {
        textAlign: 'right',
        fontSize: '1.6rem',
      },
    },
  },
  balanceText: {
    color: themeVariables.colors.lightGrey,
  },
  balanceErrorText: {
    color: themeVariables.colors.pink,
  },
  amountInputLabel: {
    display: 'none',
  },
}));

type Props = {
  type: 'source' | 'destination';
  currency: Currency;
  balance: number;
  amount: number;
  onCurrencyChange: (type: string, currency: Currency) => void;
  onAmountChange: (type: string, amount: number) => void;
};

const ExchangeItem = ({
  type,
  currency,
  balance,
  amount,
  onCurrencyChange,
  onAmountChange,
}: Props) => {
  const classes = useStyles({ type });

  const dataTestIdPrefix =
    type === 'source' ? 'source-exchange-item' : 'destination-exchange-item';

  const handleCurrencyChange = ({
    target: { value },
  }: ChangeEvent<{ value: unknown }>) => {
    const currency = value as Currency;
    onCurrencyChange(type, currency);
  };

  const handleAmountChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    let amountToExchange = value === '' ? 0 : ((value as unknown) as number);
    if (
      !isValidTwoDecimalPlaceNumber(amountToExchange) ||
      amountToExchange > MAX_AMOUNT_ALLOWED_TO_EXCHANGE
    ) {
      return;
    }
    onAmountChange(type, amountToExchange);
  };

  return (
    <Grid container className={classes.exchangeItemContainer}>
      <Grid container>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              className={classes.select}
              data-testid={`${dataTestIdPrefix}-currency-selector`}
            >
              {Object.values(Currency).map(
                (currency: string, index: number) => (
                  <MenuItem
                    className={classes.menuItem}
                    value={currency}
                    key={currency}
                    data-testid={`${dataTestIdPrefix}-currency-menuitem-${index}`}
                  >
                    <Typography
                      variant="subtitle1"
                      data-testid={`${dataTestIdPrefix}-selected-currency-text`}
                    >
                      {currency}
                    </Typography>
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} className={classes.operatorSignContainer}>
          {amount ? (
            <Typography variant="subtitle1">
              {type === 'source' ? '-' : '+'}
            </Typography>
          ) : (
            ''
          )}
        </Grid>
        <Grid item className={classes.amountContainer} xs={6}>
          <InputLabel
            htmlFor={`${dataTestIdPrefix}-amount-input-field`}
            className={classes.amountInputLabel}
          >
            {`${dataTestIdPrefix}-amount-input-field`}
          </InputLabel>
          <Input
            type="text"
            autoComplete="off"
            placeholder="0"
            autoFocus={type === 'source'}
            className={classes.amountInputField}
            value={amount === 0 ? '' : amount}
            onChange={handleAmountChange}
            id={`${dataTestIdPrefix}-amount-input-field`}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography
            variant="body1"
            className={
              type === 'source' && amount > balance
                ? classes.balanceErrorText
                : classes.balanceText
            }
            data-testid={`${dataTestIdPrefix}-balance-text`}
          >{`Balance: ${balance} ${CurrencySymbol[currency]}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExchangeItem;
