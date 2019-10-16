import React, { Component } from 'react';

import { productImages } from '../utilities';
import { getBrandGuess } from '../services';

import './ExploreGrid.css';

const ExploreGrid = ({items}) => {
  return <div className="explore-grid">
    {items.map((item, i) => <ExploreItem iterator={i} key={item.node.publicId} item={item.node} />)}
  </div>;
};

class ExploreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandGuess: null,
    };
  }

  componentDidMount() {
    const { publicId } = this.props.item;
    getBrandGuess(publicId, response => this.setState({brandGuess: response}));
  }

  render() {
    const { iterator } = this.props;
    const { pictures, seller, slug } = this.props.item;
    const { brandGuess } = this.state;
    return <div className="explore-item" style={{backgroundImage: `url(${productImages(pictures)[0].url})`, animationDelay: `0.${(iterator*10)/2}s`, opacity: '0'}}>
      <a href={`http://depop.com/${seller.username}/${slug}`} target="_blank" className="explore-item-info">
        <p>{seller.username}</p>
        <p>{brandGuess ? `${brandGuess}?` : "um..."}</p>
      </a>
    </div>;
  }
}

export { ExploreItem, ExploreGrid };
