import React, { Component } from 'react';

const CURRENCY_INPUT = 'currencyInput';

export default class SelectCurrency extends Component {
  render() {
    return (
      <label htmlFor={ CURRENCY_INPUT }>
        <select
          name={ CURRENCY_INPUT }
          id={ CURRENCY_INPUT }
        >
          {/* . */}
          {/* . */}
          {/* . */}
          {/* all currencies */}
        </select>
      </label>
    );
  }
}
