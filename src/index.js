import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Chat from './js/Chat/Chat';
import { Provider } from "react-redux";
import store from './js/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Chat />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
