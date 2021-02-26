import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import * as actions from './actions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  onEdit(id) {
    this.props.history.push(`/user/${id}`);
  }

  onDelete(id) {
    this.props.deleteUser(id);
  }

  onAdd() {
    this.props.history.push('/user/edit');
  }

  render() {
    return (
      <div className="user-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {
						this.props.users.map((user) => (
  <UserItem
    key={user.id}
    id={user.id}
    name={user.name}
    surname={user.surname}
    email={user.email}
    onEdit={this.onEdit}
    onDelete={this.onDelete}
  />
						))
					  }
          </tbody>
        </table>

        <button
          className="btn btn-success"
          onClick={this.onAdd}
          style={{ margin: '5px' }}
        >
          Add user
        </button>
      </div>
    );
  }
}
UserList.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
