// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editedExpenseAction } from '../redux/actions';

class EditBtn extends Component {
  editThisExpense = () => {
    const { keyVal, editedExpense } = this.props;
    editedExpense(keyVal);
  };

  render() {
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ this.editThisExpense }
      >
        Editar despesa
      </button>
    );
  }
}

EditBtn.propTypes = {
  keyVal: PropTypes.number.isRequired,
  editedExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editedExpense: (id) => dispatch(editedExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtn);
