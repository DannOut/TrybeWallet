// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER } from '../actions/types';

const INITIAL_STATE = {
  email: '',
};

// TODO vefificar se é possível mudar o nome do reducer para ficar mais semântico
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
