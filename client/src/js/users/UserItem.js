import React, { Component } from 'react';

export default class UserItem extends Component {
  render() {
    const {
      id, name, surname, email,
    } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{email}</td>
        <td>
          <button className="btn btn-primary" onClick={(e) => this.props.onEdit(id)}> Edit </button>
          <button className="btn btn-danger" onClick={(e) => this.props.onDelete(id)}> Delete </button>
        </td>
      </tr>
    );
  }
}
