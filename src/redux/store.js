// configure aqui sua store
import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

//! verificar se é o lugar certo
if (window.Cypress) {
  window.store = store;
}

export default store;
