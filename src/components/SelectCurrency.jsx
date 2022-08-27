import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CURRENCY_INPUT = 'currencyInput';
class SelectCurrency extends Component {
  render() {
    const { handleChange, currencies, currencyInput } = this.props;

    const optionsToForms = currencies.map((value, index) => (
      <option
        key={ index }
        name={ value }
      >
        { value }
      </option>
    ));

    return (
      <label htmlFor={ CURRENCY_INPUT }>
        Moeda
        <select
          name={ CURRENCY_INPUT }
          id={ CURRENCY_INPUT }
          value={ currencyInput }
          data-testid="currency-input"
          onChange={ handleChange }
        >
          { optionsToForms }
        </select>
      </label>
    );
  }
}

SelectCurrency.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currencyInput: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectCurrency;
