import React from 'react';
import ReactDOM from 'react-dom';
import Explore from '../Explore';
import exampleFeaturedItems from '../../stubs/exampleFeaturedItems';

it('renders without crashing when given data', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Explore data={exampleFeaturedItems} />, div);
});
