import React from 'react';
import ReactDOM from 'react-dom';
import { ExploreGrid, ExploreItem } from '../ExploreGrid';
import exampleFeaturedItems from '../../stubs/exampleFeaturedItems';

describe('ExploreItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExploreItem item={exampleFeaturedItems[0]} />, div);
  });
});

describe('ExploreGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExploreGrid items={exampleFeaturedItems} />, div);
  });

  it('renders correct number of items', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExploreGrid items={exampleFeaturedItems.slice(0,2)} />, div);
    expect(div.children[0].children.length).toBe(2);
  });
});
