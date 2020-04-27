import {
  ADD_FUND,
  DELETE_FUND,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_FUND,
  FILTER_FUNDS,
  CLEAR_FILTER,
  FUND_ERROR,
  GET_FUNDS,
  CLEAR_FUNDS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_FUNDS:
      return {
        ...state,
        funds: action.payload,
        loading: false,
      };

    case ADD_FUND:
      return {
        ...state,
        funds: [ ...state.funds, action.payload],
        loading: false,
      };
    case DELETE_FUND:
      return {
        ...state,
        funds: state.funds.filter((fund) => fund._id !== action.payload),
        loading: false,
      };
    case CLEAR_FUNDS:
      return {
        ...state,
        funds: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_FUND:
      return {
        ...state,
        funds: state.funds.map((fund) =>
          fund._id === action.payload._id ? action.payload : fund
        ),
        loading: false,
      };
    case FILTER_FUNDS:
      return {
        ...state,
        filtered: state.funds.filter((fund) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            fund.fundname.match(regex) ||
            fund.security.match(regex) ||
            fund.ticker.match(regex)
          );
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };

    case FUND_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
