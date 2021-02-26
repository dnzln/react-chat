import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as actions from './actions';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Chat from '../Chat';
import SignIn from '../SignIn';
import MessageEditor from '../MessageEditor';
import { getSignedUser } from '../services/authService';
import UserList from '../users/index';
import UserPage from '../userPage/index';
import { connect } from 'react-redux';

class StartScreen extends React.Component {

  componentDidMount() {
    const user = getSignedUser();
    if (user) this.logIn(user)
  }

  logIn = (user) => {
    this.props.login(user);
  }

  logOut = () => {
    this.props.logout();
  }
  
  render() {
    const { isSignedIn, role } = this.props;
    const isAdmin = (role !== 'admin');

    if (!isSignedIn) return <SignIn logIn={this.logIn} />
    
    return (
      <div className="App">
        <Header logOut={this.logOut}></Header>
        <Switch>
          
          <Route path='/users' component={UserList}>
            { isAdmin && <Redirect to="/" />}
          </Route>

          <Route path='/user/edit' component={UserPage}>
              { isAdmin && <Redirect to="/" />}
          </Route>
          
          <Route path='/user/:id' component={UserPage}>
              { isAdmin && <Redirect to="/" />}
          </Route>
          
          <Route path='/login'>
              { isSignedIn ? <Redirect to="/" /> : <SignIn /> }
          </Route>
        
          <Route exact path='/' component={Chat} />
          <Route path="/message/:id" component={MessageEditor} />
        </Switch>
        <Footer></Footer>
      </div>
    );
    
  }
}


const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
    role: state.user.role,
  }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);