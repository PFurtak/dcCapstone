import React, { useReducer } from 'react';
import axios from 'axios';
import fundReducer from './fundReducer';
import FundContext from './fundContext';
import {
  ADD_FUND,
  DELETE_FUND,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_FUND,
  FUND_ERROR,
  GET_FUNDS,
  CLEAR_FUNDS,
  FILTER_FUNDS,
  CLEAR_FILTER,
} from '../types';

const FundState = (props) => {
  const initialState = {
    funds: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(fundReducer, initialState);

  // Get funds
  const getFunds = async () => {
    try {
      const res = await axios.get('/api/funds');
      dispatch({ type: GET_FUNDS, payload: res.data });
    } catch (err) {
      dispatch({ type: FUND_ERROR, payload: err.response.msg });
    }
  };

  // Add fund
  const addFund = async (funds) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('please work');

    try {
      const res = await axios.post('/api/funds', funds, config);
      console.log('please work try');
      dispatch({ type: ADD_FUND, payload: res.data });
    } catch (err) {
      dispatch({ type: FUND_ERROR, payload: err.response.msg });
      console.log('error');
    }
  };

  // Delete FUND
  const deleteFund = async (id) => {
    try {
      await axios.delete(`/api/funds/${id}`);

      dispatch({ type: DELETE_FUND, payload: id });
    } catch (err) {
      dispatch({ type: FUND_ERROR, payload: err.response.msg });
    }
  };

  // Set Current fund
  const setCurrent = (fund) => {
    dispatch({ type: SET_CURRENT, payload: fund });
  };
  // Clear Current fund
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update fund
  const updateFund = async (fund) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/funds/${fund._id}`, fund, config);
      dispatch({ type: UPDATE_FUND, payload: res.data });
    } catch (err) {
      dispatch({ type: FUND_ERROR, payload: err.response.msg });
    }
  };

  // Filter funds
  const filterFunds = (text) => {
    dispatch({ type: FILTER_FUNDS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Clear funds
  const clearFunds = () => {
    dispatch({ type: CLEAR_FUNDS });
  };

  return (
    <FundContext.Provider
      value={{
        funds: state.funds,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addFund,
        deleteFund,
        setCurrent,
        clearCurrent,
        updateFund,
        filterFunds,
        clearFilter,
        getFunds,
        clearFunds,
      }}>
      {props.children}
    </FundContext.Provider>
  );
};

export default FundState;
