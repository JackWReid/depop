import React from 'react';
import './ExploreGrid.css';

const ExploreGrid = ({items, getMore}) => {
  return <div className="explore-grid">
    {items.map((item, i) => <ExploreItem iterator={i} key={item.node.publicId} item={item.node} />)}
    <button className="more-button" onClick={() => getMore()}>More please</button>
  </div>;
};

const ExploreItem = ({item, iterator}) => {
  const { picture, seller, slug } = item;
  return <div className="explore-item" style={{backgroundImage: `url(${picture})`, animationDelay: `0.${(iterator*10)/2}s`, opacity: '0'}}>
    <a href={`http://depop.com/${seller.username}/${slug}`} target="_blank" className="explore-item-info">
    </a>
  </div>;
}

export { ExploreGrid };
