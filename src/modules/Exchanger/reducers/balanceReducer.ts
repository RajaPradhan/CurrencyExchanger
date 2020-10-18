import {
  BalanceState,
  BalanceAction,
  BalanceActionType,
} from '../types/balanceTypes';

const state: BalanceState = {
  data: {
    EUR: 1000,
    GBP: 500,
    USD: 100,
  },
  loading: false,
  error: null,
};

const balanceReducer = (state: BalanceState, action: BalanceAction) => {
  switch (action.type) {
    case BalanceActionType.UPDATE_BALANCE_LOADING: {
      return { ...state, loading: true };
    }
    case BalanceActionType.UPDATE_BALANCE_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case BalanceActionType.UPDATE_BALANCE_FAILURE: {
      return {
        ...state,
        loading: false,
        data: {},
        error: new Error('Failed to update balance'),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { balanceReducer, state };
