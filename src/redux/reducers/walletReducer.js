import {
  RECEIVE_CURRENCY_API_SUCCESS,
  RECEIVE_EXPENSES_API_SUCCESS,
  RECEIVE_API_FAILURE,
  REQUEST_API,
  DELETE_EXPENSE,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_CURRENCY_API_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
      isFetching: false,
    };

  case RECEIVE_EXPENSES_API_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      isFetching: false,
    };

  case RECEIVE_API_FAILURE:
    return {
      ...state,
      error,
      isFetching: false,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((val) => val.id !== action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
