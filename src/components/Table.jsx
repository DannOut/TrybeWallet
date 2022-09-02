/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteBtn from './DeleteBtn';
import EditBtn from './EditBtn';

class Table extends Component {
  randomKeyGenerator = () => {
    const tenThousand = 10000;
    const val1 = Math.floor((Math.random() * tenThousand));
    const val2 = Math.floor((Math.random() * tenThousand));
    const val3 = Math.floor((Math.random() * tenThousand));
    return `${val1} - ${val2} - ${val3} - ${val1}${val2}${val3}`;
  };

  mapExpensesToWallet = () => {
    const { allExpenses, editor } = this.props;
    return allExpenses.map((val) => {
      const { currency, description, exchangeRates, id, method, tag, value } = val;
      const { ask, name } = exchangeRates[currency];

      return (
        <tr key={ this.randomKeyGenerator() }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{Number(value).toFixed(2) }</td>
          <td>{ name }</td>
          <td>{ Number(ask).toFixed(2) }</td>
          <td>{ Number(value * ask).toFixed(2) }</td>
          <td> Real </td>
          <td>
            <EditBtn
              keyVal={ id }
              editor={ editor }
            />
            <DeleteBtn
              keyVal={ id }
              editor={ editor }
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
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
      </div>
    );
  }
}

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
