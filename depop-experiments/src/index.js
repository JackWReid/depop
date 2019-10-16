import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import Header from './global/Header';
import Explore from './explore';

import './index.css';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <div className="page-container">
        <Match exactly pattern="/:experiment" component={Explore} />
        <Match exactly pattern="/" component={Explore} />
      </div>
    </div>
  </BrowserRouter>
);

render(<App/>, document.querySelector('#root'))
