import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';

const INVALID_EMAIL = 'naruto@...';
const VALID_EMAIL = 'naruto@naruto.com';
const INVALID_PASSWORD = '123';
const VALID_PASSWORD = '1234567';

describe('Realizando testes no component Login: ', () => {
  beforeEach(cleanup);
  test('se a tela de login Existe', () => {
    renderWith(<App />);

    const inputEmail = screen.getByLabelText(/Email:/i);
    const inputPassword = screen.getByLabelText(/Password:/i);
    const btnLogin = screen.getByRole('button', ({
      name: /Entrar/i,
    }));

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  test('se ao renderizar a página, o botão está disabled: ', () => {
    renderWith(<App />);

    const btnLogin = screen.getByRole('button', ({
      name: /Entrar/i,
    }));

    expect(btnLogin).toBeDisabled();
  });

  test('se o botão não é liberado caso as informações estejam incorretas: ', () => {
    renderWith(<App />);

    const inputEmail = screen.getByLabelText(/Email:/i);
    const inputPassword = screen.getByLabelText(/Password:/i);
    const btnLogin = screen.getByRole('button', ({
      name: /Entrar/i,
    }));

    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);
    expect(btnLogin).toBeDisabled();
  });

  test('Se o botão é liberado caso as informações sejam corretas e ao clicar seja direcionado para ao pathname: /carteira ', () => {
    const { history } = renderWith(<App />);

    const inputEmail = screen.getByLabelText(/Email:/i);
    const inputPassword = screen.getByLabelText(/Password:/i);
    const btnLogin = screen.getByRole('button', ({
      name: /Entrar/i,
    }));

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(btnLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
