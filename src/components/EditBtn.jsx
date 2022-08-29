// import PropTypes from 'prop-types'
import React, { Component } from 'react';

export default class DeleteBtn extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="edit-btn"
      >
        Editar despesa
      </button>
    );
  }
}
