// Coloque aqui suas actions
import { WALLET_INFO, LOGIN_USER } from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const walletAction = (walletData) => {
  console.log(walletData);
  return {
    type: WALLET_INFO,
    payload: walletData,
  };
};
