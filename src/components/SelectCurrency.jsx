import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiEarth } from '@mdi/js';

const CURRENCY_INPUT = 'currency';
class SelectCurrency extends Component {
  render() {
    const { handleChange, currencies, currency } = this.props;

    const optionsToForms = currencies.map((value, index) => (
      <option
        key={ index }
        name={ value }
      >
        { value }
      </option>
    ));

    return (
      <label htmlFor={ CURRENCY_INPUT } className="column label">
        Moeda
        <div className="control has-icons-left">
          <div className="select">
            <select
              name={ CURRENCY_INPUT }
              id={ CURRENCY_INPUT }
              value={ currency }
              data-testid="currency-input"
              onChange={ handleChange }
            >
              { optionsToForms }
            </select>
            <div className="icon is-small is-left">
              <Icon path={ mdiEarth } size={ 1 } />
            </div>
          </div>
        </div>
      </label>
    );
  }
}

SelectCurrency.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectCurrency;
