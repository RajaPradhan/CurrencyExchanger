import { LiveRateState, LiveRateAction, LiveRateActionType } from '../types';

const state: LiveRateState = {
  data: null,
  loading: false,
  error: null,
};

const liveRateReducer = (state: LiveRateState, action: LiveRateAction) => {
  switch (action.type) {
    case LiveRateActionType.FETCH_LIVE_RATE_LOADING: {
      return { ...state, loading: true };
    }
    case LiveRateActionType.FETCH_LIVE_RATE_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case LiveRateActionType.FETCH_LIVE_RATE_FAILURE: {
      return {
        ...state,
        loading: false,
        data: {},
        error: new Error('Failed to fetch live rates'),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { liveRateReducer, state };
