import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCurrency from './SelectCurrency';
import PaymentMethod from './PaymentMethod';
import ExpenseTag from './ExpenseTag';
import { fetchCurrencyAPIThunk, fetchExpenseAPIThunk } from '../redux/actions';

const VALUE_INPUT = 'value';
const DESCRIPTION_INPUT = 'description';
const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'cash',
  tag: 'food',
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

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  handleSubmitExpenses = () => {
    const { getAPIExpenses } = this.props;
    getAPIExpenses(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { globalCurrencies } = this.props;
    const {
      currency,
      method,
      tag,
      value,
      description,
    } = this.state;
    return (
      <form>
        <label htmlFor={ VALUE_INPUT }>
          Valor:
          <input
            type="number"
            id={ VALUE_INPUT }
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor={ DESCRIPTION_INPUT }>
          Descrição:
          <input
            type="text"
            id={ DESCRIPTION_INPUT }
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <SelectCurrency
          handleChange={ this.handleChange }
          currencies={ globalCurrencies }
          currency={ currency }
        />
        <PaymentMethod
          handleChange={ this.handleChange }
          method={ method }
        />
        <ExpenseTag
          handleChange={ this.handleChange }
          tag={ tag }
        />
        <button
          type="button"
          onClick={ this.handleSubmitExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getAPICurrencies: PropTypes.func.isRequired,
  getAPIExpenses: PropTypes.func.isRequired,
  globalCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  globalCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAPICurrencies: () => dispatch(fetchCurrencyAPIThunk()),
  getAPIExpenses: (formData) => dispatch(fetchExpenseAPIThunk(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
