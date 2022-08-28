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

//* function to filter 'USDT' as requested in REQ03
const getCurrencies = (curr) => Object.keys(curr).filter((info) => info !== 'USDT');

const wallet = (state = INITIAL_STATE, action) => {
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
      currencies: getCurrencies(action.payload),
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
