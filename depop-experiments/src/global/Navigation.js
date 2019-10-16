import React from 'react';
import { Link } from 'react-router';
import './Navigation.css';

const Navigation = () => (
  <ul className="navigation">
    <li><Link to="/">Standard</Link></li>
    <li><Link to="/price">Price</Link></li>
    <li><Link to="/gender">Gender</Link></li>
    <li><Link to="/likes">Likes</Link></li>
  </ul>
);

export default Navigation;
