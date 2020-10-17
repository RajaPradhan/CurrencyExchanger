export type LiveRateData = {
  EUR: number;
  GBP: number;
  USD: number;
};

export type LiveRateState = {
  data: LiveRateData | null;
  loading: boolean;
  error: Error | null;
};

export enum LiveRateActionType {
  FETCH_LIVE_RATE_LOADING = 'FETCH_LIVE_RATE_LOADING',
  FETCH_LIVE_RATE_SUCCESS = 'FETCH_LIVE_RATE_SUCCESS',
  FETCH_LIVE_RATE_FAILURE = 'FETCH_LIVE_RATE_FAILURE',
}

export type LiveRateAction = {
  type:
    | 'FETCH_LIVE_RATE_LOADING'
    | 'FETCH_LIVE_RATE_SUCCESS'
    | 'FETCH_LIVE_RATE_FAILURE';
  payload?: any;
};

export type LiveRateDispatch = (action: LiveRateAction) => void;
