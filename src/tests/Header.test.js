import React from 'react';
import { screen, cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';
import mockDataState from './helpers/mockDataState';

/**
 * PRECISA SER NESSA ORDEM
 * Parametros da função RenderWith
 * primeiro parâmetro, o Componente ex. <App />
 * segundo parâmetro, um objecto, que pode ter como parâmetros :
 *
 * initialState = {}
 * store = createStore(rootReducer, initialState, applyMiddleware(thunk))
 * initialEntries = ['/']
 * history = createMemoryHistory({ initialEntries }), } = {}
 */

describe('Testa se os componentes do header são renderizados e atualizados', () => {
  beforeEach(cleanup);
  test('se os componentes existem na página', () => {
    renderWith(<App />, { initialEntries: ['/carteira'] });

    const emailField = screen.getByTestId('email-field');
    const headerField = screen.getByTestId('header-currency-field');
    const totalField = screen.getByTestId('total-field');

    expect(emailField).toBeInTheDocument();
    expect(headerField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
  });

  test('se o valor total é atualizado ao receber o o global state com as expenses', () => {
    const { wallet: { expenses, currencies }, user: { email } } = mockDataState;
    renderWith(
      <App />,
      {
        initialState: {
          user: { email },
          wallet: { currencies, expenses },
        },
        initialEntries: ['/carteira'] },
    );
    const totalField = screen.getByTestId('total-field');
    const emailField = screen.getByTestId('email-field');
    const headerField = screen.getByTestId('header-currency-field');

    expect(totalField.textContent).toBe('313.41');
    expect(headerField.textContent).toBe('BRL');
    expect(emailField.textContent).toBe('naruto@naruto.com');
  });
});
