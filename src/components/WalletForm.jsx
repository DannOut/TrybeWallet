import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCurrency from './SelectCurrency';
import PaymentMethod from './PaymentMethod';
import ExpenseTag from './ExpenseTag';
import { fetchAPIThunk } from '../redux/actions';

const VALUE_INPUT = 'valueInput';
const DESCRIPTION_INPUT = 'descriptionInput';
const INITIAL_STATE = {
  currencyInput: 'USD',
  paymentMethod: 'cash',
  expenseTag: 'food',
  valueInput: '',
  descriptionInput: '',
};
class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { getAPICurrencies } = this.props;
    getAPICurrencies();
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  render() {
    const { globalCurrencies } = this.props;
    const {
      currencyInput,
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
            value={ descriptionInput }
          />
        </label>

        <SelectCurrency
          handleChange={ this.handleChange }
          currencies={ globalCurrencies }
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
  globalCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  globalCurrencies: state.wallet.currencies,

});

const mapDispatchToProps = (dispatch) => ({
  getAPICurrencies: () => dispatch(fetchAPIThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
