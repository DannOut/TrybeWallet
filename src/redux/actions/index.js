// Coloque aqui suas actions
import economyAPI from '../../services/API';
import {
  LOGIN_USER,
  REQUEST_API,
  RECEIVE_CURRENCY_API_SUCCESS,
  RECEIVE_EXPENSES_API_SUCCESS,
  RECEIVE_API_FAILURE,
} from './types';

// * Info login Action
export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

//* function to filter 'USDT' as requested in REQ03
const getCurrencies = (val) => Object.keys(val).filter((info) => info !== 'USDT');

// * API TO MIDDLEWARE ACTIONS

// Global API request
export const requestAPIAction = () => ({
  type: REQUEST_API,
});

// Currency API SUCCESS / FAILURE / FETCH
export const receiveCurrencyAPISuccess = (data) => ({
  type: RECEIVE_CURRENCY_API_SUCCESS,
  payload: getCurrencies(data),
});

export const receiveAPIFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

// * // Expense API SUCCESS / FAILURE / FETCH

// Expense API SUCCESS
export const receiveExpenseAPISuccess = (data) => ({
  type: RECEIVE_EXPENSES_API_SUCCESS,
  payload: data,
});

// * // MiddleWare - Thunk
// fetch Currency
export const fetchCurrencyAPIThunk = () => async (dispatch) => {
  dispatch(requestAPIAction());
  try {
    const response = await economyAPI();
    dispatch(receiveCurrencyAPISuccess(response));
  } catch (error) {
    dispatch(receiveAPIFailure(error));
  }
};

// fetch Expenses
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
