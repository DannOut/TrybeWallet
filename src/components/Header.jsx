/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccount, mdiCurrencyUsd } from '@mdi/js';
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
      <header className="hero has-background-info-dark  is-small header__personal">
        <div className="hero-body">
          <div className="icon-text header__useremail">
            <span className="icon has-text-white">
              <Icon path={ mdiAccount } size={ 1 } title="Total Value" />
            </span>
            <h3
              className="has-text-white"
              data-testid="email-field"
            >
              { userEmail }
            </h3>
          </div>
          <div>
            <div className="icon-text">
              <span className="icon has-text-white">
                <Icon path={ mdiCurrencyUsd } size={ 1 } title="Total Value" />
              </span>
              <h3
                className="BRL__smallgap has-text-white"
                data-testid="total-field"
              >
                { total.toFixed(2) }
              </h3>
              <h3
                className="BRL__smallgap has-text-white"
                data-testid="header-currency-field"
              >
                BRL
              </h3>

            </div>
          </div>
        </div>
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
