import { combineReducers } from 'redux';
import user from './userReducer';
import wallet from './walletReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ wallet, user });

export default rootReducer;
