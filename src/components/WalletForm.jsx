import React, { Component } from 'react';

const VALUE_INPUT = 'valueInput';
const DESCRIPTION_INPUT = 'descriptionInput';
class WalletForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor={ VALUE_INPUT }>
          Valor:
          <input
            type="number"
            name={ VALUE_INPUT }
            id={ VALUE_INPUT }
            data-testid="value-input"
          />
        </label>

        <label htmlFor={ DESCRIPTION_INPUT }>
          Descrição
          <input
            type="text"
            name={ DESCRIPTION_INPUT }
            id={ DESCRIPTION_INPUT }
            data-testid="description-input"
          />
        </label>

        {/* // TODO, aqui vai ser criado chamado um componente SELECT com um array de todas as currencies */}
      </form>
    );
  }
}

export default WalletForm;
