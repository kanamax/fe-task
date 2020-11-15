import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store/store';

ReactDOM.render(
  <Router basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("mount")
);
