// Coloque aqui suas actions
import { VERIFICAR_NOME_DEPOIS, LOGIN_USER } from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const VERIFICAR = (walletData) => {
  console.log(walletData);
  return {
    type: VERIFICAR_NOME_DEPOIS,
    payload: walletData,
  };
};
