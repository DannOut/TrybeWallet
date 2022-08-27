// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_INFO } from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_INFO:
    console.log(action);
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
