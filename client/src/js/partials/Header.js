import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { unsetLoginSession } from '../services/authService';

export default function Header({ logOut }) {
  const role = useSelector((state) => state.user.role);
  const usersLink = (role === 'admin')
    ? (
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/users">Users</Link>
      </li>
    )
    : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <h1 className="px-5">Chat</h1>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">Chat</Link>
          </li>
          {usersLink}
          <li className="nav-item">
            <Link className="nav-link" onClick={logOut} activeClassName="active" to="/login">Log out</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
