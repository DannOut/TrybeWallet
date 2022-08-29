// Coloque aqui suas actions
import economyAPI from '../../services/API';
import {
  LOGIN_USER,
  REQUEST_API,
  RECEIVE_CURRENCY_API_SUCCESS,
  RECEIVE_EXPENSES_API_SUCCESS,
  RECEIVE_API_FAILURE,
  DELETE_EXPENSE,
} from './types';

//* function to filter 'USDT' as requested in REQ03
const getCurrencies = (val) => Object.keys(val).filter((info) => info !== 'USDT');

// * Info login Action
export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

// * API TO MIDDLEWARE ACTIONS

// Global API request
export const requestAPIAction = () => ({
  type: REQUEST_API,
});

// Global API failure
export const receiveAPIFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

//* // Currency API SUCCESS / FAILURE / FETCH //
export const receiveCurrencyAPISuccess = (data) => ({
  type: RECEIVE_CURRENCY_API_SUCCESS,
  payload: getCurrencies(data),
});

//* // Expense API SUCCESS / FAILURE / FETCH //
export const receiveExpenseAPISuccess = (data) => ({
  type: RECEIVE_EXPENSES_API_SUCCESS,
  payload: data,
});

//* // DeleteExpenseInReducer REQ08
export const deletedExpenseAction = (data) => {
  console.log('action', data);
  return {
    type: DELETE_EXPENSE,
    payload: data,
  };
};

//* // MiddleWare - Thunk //

// fetch Global Currency
export const fetchCurrencyAPIThunk = () => async (dispatch) => {
  dispatch(requestAPIAction());
  try {
    const response = await economyAPI();
    dispatch(receiveCurrencyAPISuccess(response));
  } catch (error) {
    dispatch(receiveAPIFailure(error));
  }
};

// fetch Global State Expenses
export const fetchExpenseAPIThunk = (formInfo) => async (dispatch) => {
  dispatch(requestAPIAction());
  try {
    const response = await economyAPI();
    const payload = {
      ...formInfo,
      exchangeRates: { ...response } };
    dispatch(receiveExpenseAPISuccess(payload));
  } catch (error) {
    dispatch(receiveAPIFailure(error));
  }
};
