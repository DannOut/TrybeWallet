/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiEmail, mdiLock } from '@mdi/js';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';
import '../App.css';

const EMAIL_HTML_ATTRIB = 'email';
const PASSWORD_HTML_ATTRIB = 'password';
const MIN_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  componentDidMount() {
    this.handleFormValidation();
  }

  // * Function responsible to handle Change inside HTML
  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState(
      {
        [id]: value,
      },
      () => this.handleFormValidation(),
    );
  };

  // * Email validation, same Regex used in TrybeTunes
  handleEmailValidation = () => {
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+.[A-Z]{2,}$/gim;
    return regex.test(email);
  };

  // * Simple Password validation
  handlePasswordValidation = () => {
    const { password } = this.state;
    const passwordValidated = password.length >= MIN_LENGTH_PASSWORD;
    return passwordValidated;
  };

  // * Form validation
  handleFormValidation = () => {
    const isFormValited = (this.handleEmailValidation()
      && this.handlePasswordValidation());
    this.setState({
      isDisabled: !isFormValited,
    });
  };

  // * Submit to Wallet Page
  handleLoginSubmit = () => {
    const { history, setUser } = this.props;
    const { email } = this.state;

    setUser(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="app__body">
        <form className="box has-background-warning-light">
          <div className="field">
            <label className="label" htmlFor={ EMAIL_HTML_ATTRIB }>
              Email:
              <div className="control has-icons-left has-icons-right">
                <input
                  type={ EMAIL_HTML_ATTRIB }
                  name={ EMAIL_HTML_ATTRIB }
                  id={ EMAIL_HTML_ATTRIB }
                  data-testid="email-input"
                  onChange={ this.handleChange }
                  value={ email }
                  className="input is-success"
                />
                <span className="icon is-small is-left">
                  <Icon path={ mdiEmail } size={ 1 } title="User Email" />
                </span>
              </div>
            </label>
          </div>
          <div className="field">
            <label className="label" htmlFor={ PASSWORD_HTML_ATTRIB }>
              Password:
              <div className="control has-icons-left has-icons-right">
                <input
                  type={ PASSWORD_HTML_ATTRIB }
                  name={ PASSWORD_HTML_ATTRIB }
                  id={ PASSWORD_HTML_ATTRIB }
                  data-testid="password-input"
                  onChange={ this.handleChange }
                  value={ password }
                  className="input"
                />
                <span className="icon is-small is-left">
                  <Icon path={ mdiLock } size={ 1 } />
                </span>
              </div>
            </label>
          </div>
          <div className="column">
            <button
              type="button"
              disabled={ isDisabled }
              placeholder="type your password"
              onClick={ this.handleLoginSubmit }
              className="button is-primary is-rounded"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (state) => dispatch(loginAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
