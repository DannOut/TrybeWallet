import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCash, mdiCreditCard, mdiCreditCardChip } from '@mdi/js';

const PAYMENT_METHOD = 'method';
const CASH = 'Dinheiro';
const CREDIT = 'Cartão de crédito';
const DEBIT = 'Cartão de débito';

export default class PaymentMethod extends Component {
  renderIconHandler = () => {
    const { method } = this.props;
    switch (method) {
    case CREDIT:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiCreditCardChip } size={ 1 } />
        </div>
      );
    case DEBIT:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiCreditCard } size={ 1 } />
        </div>
      );
    default:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiCash } size={ 1 } />
        </div>
      );
    }
  };

  render() {
    const { handleChange, method } = this.props;
    return (
      <label htmlFor={ PAYMENT_METHOD } className="column label">
        Método de pagamento:
        <div className="control has-icons-left">
          <div className="select">
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
            { this.renderIconHandler() }
          </div>
        </div>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};
