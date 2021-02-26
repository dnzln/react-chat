import React, { useState } from 'react';

export default function SignIn({ logIn }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    logIn({ email, password });
  };

  return (
    <div className="container w-50 p-5">
      <form noValidate autoComplete="off">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" onChange={onEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" onChange={onPasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
