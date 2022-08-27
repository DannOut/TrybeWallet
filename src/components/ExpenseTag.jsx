import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXPENSE_TAG = 'expenseTag';

export default class ExpenseTag extends Component {
  render() {
    const { handleChange, expenseTag } = this.props;

    return (
      <label htmlFor={ EXPENSE_TAG }>
        Categoria:
        <select
          onChange={ handleChange }
          id={ EXPENSE_TAG }
          value={ expenseTag }
          data-testid="tag-input"
        >
          <option value="food">
            Alimentação
          </option>
          <option value="leisure">
            Lazer
          </option>
          <option value="work">
            Trabalho
          </option>
          <option value="transport">
            Transporte
          </option>
          <option value="health">
            Saúde
          </option>
        </select>
      </label>
    );
  }
}

ExpenseTag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  expenseTag: PropTypes.string.isRequired,
};
