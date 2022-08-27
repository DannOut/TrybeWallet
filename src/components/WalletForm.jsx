import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCurrency from './SelectCurrency';
import PaymentMethod from './PaymentMethod';
import ExpenseTag from './ExpenseTag';
import economyAPI from '../services/API';

const VALUE_INPUT = 'valueInput';
const DESCRIPTION_INPUT = 'descriptionInput';
class WalletForm extends Component {
  state = {
    currencies: [],
    currencyInput: 'USD',
    paymentMethod: 'cash',
    expenseTag: 'food',
    valueInput: '',
    descriptionInput: '',
  };

  componentDidMount() {
    this.APItoArrayHandler();
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  APItoArrayHandler = async () => {
    const { getAPICurrencies } = this.props;
    const gettingAPI = await getAPICurrencies(economyAPI);
    const fetchedValue = Object.keys(gettingAPI).map((key) => key)
      .filter((value) => value !== 'USDT');
    this.setState({
      currencies: fetchedValue,
    });
  };

  render() {
    const {
      currencyInput,
      currencies,
      paymentMethod,
      expenseTag,
      valueInput,
      descriptionInput,
    } = this.state;
    return (
      <form>
        <label htmlFor={ VALUE_INPUT }>
          Valor:
          <input
            type="number"
            id={ VALUE_INPUT }
            data-testid="value-input"
            value={ valueInput }
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
            descriptionInput={ descriptionInput }
          />
        </label>

        <SelectCurrency
          handleChange={ this.handleChange }
          currencies={ currencies }
          currencyInput={ currencyInput }
        />
        <PaymentMethod
          handleChange={ this.handleChange }
          paymentMethod={ paymentMethod }
        />
        <ExpenseTag
          handleChange={ this.handleChange }
          expenseTag={ expenseTag }
        />
      </form>
    );
  }
}

WalletForm.propTypes = {
  getAPICurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAPICurrencies: (state) => dispatch(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
