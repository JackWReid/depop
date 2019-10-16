import React from 'react';

import { productImages } from '../utilities';

import './ExploreGrid.css';

const ExploreGrid = ({items}) => {
  return <div className="explore-grid">
    {items.map((item, i) => <ExploreItem iterator={i} key={item.node.publicId} item={item.node} />)}
  </div>;
};

const ExploreItem = ({item, iterator}) => {
  const { pictures, seller, slug, counters } = item;
  return <div className="explore-item" style={{backgroundImage: `url(${productImages(pictures)[0].url})`, animationDelay: `0.${(iterator*10)/2}s`, opacity: '0'}}>
    <a href={`http://depop.com/${seller.username}/${slug}`} target="_blank" className="explore-item-info">
      <p>{seller.username}</p>
      <p>♥️ {counters.numLikes}</p>
    </a>
  </div>;
}

export { ExploreItem, ExploreGrid };
