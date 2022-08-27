import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { walletAction } from '../redux/actions';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">
          { userEmail }
        </h3>
        <h3 data-testid="header-currency-field"> BRL </h3>
        <h3 data-testid="total-field">0</h3>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  console.log('state:', state);
  return {
    userEmail: state.user.email,
  };
};

export default connect(mapStateToProps)(Header);
