/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccountTie, mdiBus, mdiFood, mdiHeart, mdiMusic } from '@mdi/js';

const EXPENSE_TAG = 'tag';
const FOOD = 'Alimentação';
const LEISURE = 'Lazer';
const WORK = 'Trabalho';
const TRANSPORT = 'Transporte';
const HEALTH = 'Saúde';

export default class ExpenseTag extends Component {
  renderIconHandler = () => {
    const { tag } = this.props;
    switch (tag) {
    case LEISURE:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiMusic } size={ 1 } />
        </div>
      );
    case WORK:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiAccountTie } size={ 1 } />
        </div>
      );
    case TRANSPORT:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiBus } size={ 1 } />
        </div>
      );
    case HEALTH:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiHeart } size={ 1 } />
        </div>
      );
    default:
      return (
        <div className="icon is-small is-left">
          <Icon path={ mdiFood } size={ 1 } />
        </div>
      );
    }
  };

  render() {
    const { handleChange, tag } = this.props;

    return (
      <label htmlFor={ EXPENSE_TAG } className="column label">
        Categoria:
        <div className="control has-icons-left">
          <div className="select">
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
            { this.renderIconHandler() }
          </div>
        </div>
      </label>
    );
  }
}

ExpenseTag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};
