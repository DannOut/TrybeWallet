// Coloque aqui suas actions
import economyAPI from '../../services/API';
import {
  LOGIN_USER,
  RECEIVE_API_SUCCESS,
  RECEIVE_API_FAILURE,
  REQUEST_API,
} from './types';

// * Info login Action
export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

// * API TO MIDDLEWARE ACTIONS
export const requestAPIAction = () => ({
  type: REQUEST_API,
});

export const receiveAPISuccess = (data) => ({
  type: RECEIVE_API_SUCCESS,
  payload: data,
});

export const receiveAPIFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPIAction());
  try {
    const response = await economyAPI();
    dispatch(receiveAPISuccess(response));
  } catch (error) {
    dispatch(receiveAPIFailure(error));
  }
};
