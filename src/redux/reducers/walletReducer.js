import {
  RECEIVE_CURRENCY_API_SUCCESS,
  RECEIVE_EXPENSES_API_SUCCESS,
  REQUEST_API,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EDITED_EXPENSE,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: return { ...state, isFetching: true };
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
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((val) => val.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case UPDATE_EDITED_EXPENSE:
    return {
      ...state,
      idToEdit: 0,
      editor: false,

      //* ajuda do cadu para corrigir o bug !
      expenses: state.expenses.map((val) => {
        if (val.id === action.payload.id) {
          return { ...val, ...action.payload };
        } return val;
      }),
    };

  default:
    return state;
  }
};

export default wallet;
