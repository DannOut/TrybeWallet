import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PAYMENT_METHOD = 'method';
const CASH = 'Dinheiro';
const CREDIT = 'Cartão de crédito';
const DEBIT = 'Cartão de débito';

export default class PaymentMethod extends Component {
  render() {
    const { handleChange, method } = this.props;
    return (
      <label htmlFor={ PAYMENT_METHOD }>
        Método de pagamento:
        <select
          onChange={ handleChange }
          id={ PAYMENT_METHOD }
          value={ method }
          data-testid="method-input"
        >
          <option value={ CASH }>
            Dinheiro
          </option>
          <option value={ CREDIT }>
            Cartão de crédito
          </option>
          <option value={ DEBIT }>
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};
