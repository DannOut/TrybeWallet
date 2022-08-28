import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXPENSE_TAG = 'tag';

export default class ExpenseTag extends Component {
  render() {
    const { handleChange, tag } = this.props;

    return (
      <label htmlFor={ EXPENSE_TAG }>
        Categoria:
        <select
          onChange={ handleChange }
          id={ EXPENSE_TAG }
          value={ tag }
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
  tag: PropTypes.string.isRequired,
};
