import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './js/store/configureStore';
import App from './js/app';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
