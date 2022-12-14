// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedExpenseAction } from '../redux/actions';

class DeleteBtn extends Component {
  deleteThisExpense = () => {
    const { keyVal, deletedExpense } = this.props;
    deletedExpense(keyVal);
  };

  render() {
    const { editor } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ this.deleteThisExpense }
        disabled={ editor }
        className="button is-small is-danger is-rounded"
      >
        Deletar despesa
      </button>
    );
  }
}

DeleteBtn.propTypes = {
  keyVal: PropTypes.number.isRequired,
  deletedExpense: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deletedExpense: (id) => dispatch(deletedExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);
