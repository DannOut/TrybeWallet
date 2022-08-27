// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_API_FAILURE,
  RECEIVE_API_SUCCESS,
  REQUEST_API,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: '',
  currency: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  // const getCurrencies = ;
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_API_SUCCESS:
    console.log(action);
    return {
      ...state,
      currencies: action.payload,
      isFetching: false,
    };

  case RECEIVE_API_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };

  default:
    return state;
  }
};

export default wallet;
