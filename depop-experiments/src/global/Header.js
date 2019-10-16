import React from 'react';
import Navigation from './Navigation';
import './Header.css';

const Header = () => (
  <div className="header">
    <h1 className="logotype">Exploring Depop</h1>
    <div className="nav-container">
      <Navigation />
    </div>
  </div>
);

export default Header;
