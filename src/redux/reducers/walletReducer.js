import {
  RECEIVE_CURRENCY_API_SUCCESS,
  RECEIVE_EXPENSES_API_SUCCESS,
  RECEIVE_API_FAILURE,
  REQUEST_API,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_CURRENCY_API_SUCCESS:
    return {
      ...state,
      currencies: payload,
      isFetching: false,
    };

  case RECEIVE_EXPENSES_API_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, payload],
      isFetching: false,
    };

  case RECEIVE_API_FAILURE:
    return {
      ...state,
      error,
      isFetching: false,
    };

  default:
    return state;
  }
};

export default wallet;
