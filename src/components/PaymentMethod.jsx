import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PAYMENT_METHOD = 'method';

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
          <option value="cash">
            Dinheiro
          </option>
          <option value="credit">
            Cartão de crédito
          </option>
          <option value="debit">
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
