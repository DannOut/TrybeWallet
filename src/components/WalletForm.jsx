/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCurrencyUsd, mdiText } from '@mdi/js';
import SelectCurrency from './SelectCurrency';
import PaymentMethod from './PaymentMethod';
import ExpenseTag from './ExpenseTag';
import {
  fetchCurrencyAPIThunk,
  fetchExpenseAPIThunk,
  updateEditedExpense,
} from '../redux/actions';

const VALUE_INPUT = 'value';
const DESCRIPTION_INPUT = 'description';
const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};
class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
    id: 0,
  };

  componentDidMount() {
    const { getAPICurrencies } = this.props;
    getAPICurrencies();
  }

  componentDidUpdate(prevProps, prevState) {
    this.editingId(prevState);
  }

  editingId = (prevState) => {
    const { editExpense } = this.props;
    const { idToEdit, expenses, editor } = editExpense;
    if (editor && !prevState.value && !prevState.description) {
      const val = expenses.find(({ id }) => id === idToEdit);
      this.setState({
        ...val,
      });
    }
  };

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  handleSubmitExpenses = () => {
    const { sendAPIExpenses, editExpense: { editor }, updateExpense } = this.props;
    if (editor) {
      updateExpense(this.state);
    } else {
      sendAPIExpenses(this.state);
      this.setState((prevState) => ({
        id: prevState.id + 1,
      }));
    }
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { globalCurrencies, editExpense } = this.props;
    const { editor } = editExpense;

    const textHandlerBtn = editor ? 'Editar despesa' : 'Adicionar despesa';

    const {
      currency,
      method,
      tag,
      value,
      description,
    } = this.state;
    return (
      <form className=" base__form">
        <div className="columns">
          <div className="field">
            <label htmlFor={ DESCRIPTION_INPUT } className="column label">
              Descrição:
              <div className="control has-icons-left">
                <input
                  type="text"
                  id={ DESCRIPTION_INPUT }
                  data-testid="description-input"
                  onChange={ this.handleChange }
                  value={ description }
                  className="input"
                />
                <span className="icon is-small is-left">
                  <Icon path={ mdiText } size={ 1 } title="User Email" />
                </span>
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor={ VALUE_INPUT } className="column label">
              Valor:
              <div className="control has-icons-left">
                <input
                  type="number"
                  id={ VALUE_INPUT }
                  data-testid="value-input"
                  value={ value }
                  onChange={ this.handleChange }
                  className="input"
                />
                <span className="icon is-small is-left">
                  <Icon path={ mdiCurrencyUsd } size={ 1 } title="User Email" />
                </span>
              </div>
            </label>
          </div>
          <div className="field">
            <SelectCurrency
              handleChange={ this.handleChange }
              currencies={ globalCurrencies }
              currency={ currency }
            />
          </div>
          <div className="field">
            <PaymentMethod
              handleChange={ this.handleChange }
              method={ method }
            />
          </div>
          <div className="field">
            <ExpenseTag
              handleChange={ this.handleChange }
              tag={ tag }
            />
          </div>
          <button
            type="button"
            onClick={ this.handleSubmitExpenses }
            className="button is-primary is-rounded button__form"
          >
            { textHandlerBtn }
          </button>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getAPICurrencies: PropTypes.func.isRequired,
  sendAPIExpenses: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  globalCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editExpense: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  globalCurrencies: state.wallet.currencies,
  editExpense: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getAPICurrencies: () => dispatch(fetchCurrencyAPIThunk()),
  sendAPIExpenses: (formData) => dispatch(fetchExpenseAPIThunk(formData)),
  updateExpense: (formData) => dispatch(updateEditedExpense(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
