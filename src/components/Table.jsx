import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  mapExpensesToWallet = () => {
    const { allExpenses } = this.props;
    return allExpenses.map((val) => {
      const { currency, description, exchangeRates, id, method, tag, value } = val;
      const { ask, name } = exchangeRates[currency];

      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{Number(value).toFixed(2) }</td>
          <td>{ name }</td>
          <td>{ Number(ask).toFixed(2) }</td>
          <td>{ Number(value * ask).toFixed(2) }</td>
          <td> Real </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.mapExpensesToWallet()}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
