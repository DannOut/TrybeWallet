import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import App from '../App';
import mockDataState from './helpers/mockDataState';
import economyAPI from '../services/API';

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

describe('Testa se os componentes de Wallet são renderizados e atualizados', () => {
  beforeEach(cleanup);
  test('se ao clicar em delete o item é removido', async () => {
    const { wallet: { expenses, currencies } } = mockDataState;
    renderWith(<App />, {
      initialState: {
        wallet: { currencies, expenses },
      },
      initialEntries: ['/carteira'] });

    const addExpenseBtn = screen.getByRole('button', ({
      name: /Adicionar despesa/i,
    }));
    let deleteExpenseBtn = await screen.findAllByRole('button', ({
      name: /Deletar despesa/i,
    }));

    expect(addExpenseBtn).toBeInTheDocument();
    expect(deleteExpenseBtn.length).toBe(2);

    userEvent.click(addExpenseBtn);
    userEvent.click(deleteExpenseBtn[0]);

    deleteExpenseBtn = await screen.findAllByRole('button', ({
      name: /Deletar despesa/i,
    }));
    expect(deleteExpenseBtn.length).toBe(1);
  });

  test('se ao clicar em edit é possível editar o item selecionado', async () => {
    const { wallet: { expenses, currencies } } = mockDataState;
    renderWith(<App />, {
      initialState: {
        wallet: { currencies, expenses },
      },
      initialEntries: ['/carteira'] });

    const addExpenseBtn = screen.getByRole('button', ({
      name: /Adicionar despesa/i,
    }));
    let editExpenseBtn = await screen.findAllByRole('button', ({
      name: /Editar despesa/i,
    }));

    expect(addExpenseBtn).toBeInTheDocument();
    expect(editExpenseBtn.length).toBe(2);

    userEvent.click(editExpenseBtn[0]);

    editExpenseBtn = await screen.findAllByRole('button', ({
      name: /Editar despesa/i,
    }));
    expect(editExpenseBtn.length).toBe(3);
    expect(addExpenseBtn.textContent).toBe('Editar despesa');
    let description = await screen.getByLabelText(/Descrição:/i);
    expect(description.value).toBe('Bandana Ninja');

    description = await screen.getByLabelText(/Descrição:/i);
    userEvent.type(description, ' nova');
    expect(description.value).toBe('Bandana Ninja nova');

    editExpenseBtn = await screen.findAllByRole('button', ({
      name: /Editar despesa/i,
    }));
    userEvent.click(editExpenseBtn[0]);

    expect(addExpenseBtn.textContent).toBe('Adicionar despesa');
  });

  test('mock', async () => {
    const val = mockDataState.wallet.expenses[0].exchangeRates;

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(val),
    });

    renderWith(<App />, {
      initialEntries: ['/carteira'] });

    await economyAPI();
    expect(global.fetch).toBeCalledTimes(2);

    const selectOptions = await screen.findByTestId('currency-input');
    expect(selectOptions.querySelectorAll('option').length).toBe(15);

    const addExpenseBtn = await screen.getByRole('button', ({
      name: /Adicionar despesa/i,
    }));

    userEvent.click(addExpenseBtn);
    const findTable = await screen.findByRole('table');
    expect(findTable.querySelector('tbody')).toBeInTheDocument();
    expect(findTable.querySelector('tbody').children).toHaveLength(1);
  });
});
