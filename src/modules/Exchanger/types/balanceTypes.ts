export type BalanceData = {
  EUR: number;
  GBP: number;
  USD: number;
};

export type BalanceState = {
  data: BalanceData;
  loading: boolean;
  error: Error | null;
};

export enum BalanceActionType {
  UPDATE_BALANCE_LOADING = 'UPDATE_BALANCE_LOADING',
  UPDATE_BALANCE_SUCCESS = 'UPDATE_BALANCE_SUCCESS',
  UPDATE_BALANCE_FAILURE = 'UPDATE_BALANCE_FAILURE',
}

export type BalanceAction = {
  type:
    | 'UPDATE_BALANCE_LOADING'
    | 'UPDATE_BALANCE_SUCCESS'
    | 'UPDATE_BALANCE_FAILURE';
  payload?: any;
};

export type BalanceDispatch = (action: BalanceAction) => void;
