import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalValueExpenses = () => {
    const { savedExpenses } = this.props;
    return savedExpenses.reduce((acc, { currency, exchangeRates, value }) => {
      const valueExchangeRate = exchangeRates[currency];
      return acc + (Number(value) * Number(valueExchangeRate.ask));
    }, 0);
  };

  render() {
    const { userEmail } = this.props;
    const total = this.totalValueExpenses();
    return (
      <header>
        <h3 data-testid="email-field">
          { userEmail }
        </h3>
        <h3 data-testid="header-currency-field"> BRL </h3>
        <h3 data-testid="total-field">{ total.toFixed(2) }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  savedExpenses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  savedExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
