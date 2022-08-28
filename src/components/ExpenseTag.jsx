import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXPENSE_TAG = 'tag';
const FOOD = 'Alimentação';
const LEISURE = 'Lazer';
const WORK = 'Trabalho';
const TRANSPORT = 'Transporte';
const HEALTH = 'Saúde';

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
          <option value={ FOOD }>
            Alimentação
          </option>
          <option value={ LEISURE }>
            Lazer
          </option>
          <option value={ WORK }>
            Trabalho
          </option>
          <option value={ TRANSPORT }>
            Transporte
          </option>
          <option value={ HEALTH }>
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
