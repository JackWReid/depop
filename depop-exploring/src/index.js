import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import clock from './state/clock';
import pager from './state/pager';
import App from './App';
import './index.css';

const store = createStore(combineReducers({clock: clock, pager: pager}));

setInterval(() => {
  store.dispatch({ type: 'INCREMENT_CLOCK' });
}, 1000);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
