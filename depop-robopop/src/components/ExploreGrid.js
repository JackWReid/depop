import React, { Component } from 'react';

import { productImages, shuffle } from '../utilities';
import { getSearchItems, getFeaturedItems, getPopGuess } from '../services';
import training from '../training';

import Loading from '../views/Loading';

import './ExploreGrid.css';

const trainingSet = () => {
  return shuffle(training).slice(0,30).map(item => ({
    node: {
      seller: {
        username: "none"
      },
      pictures: [
        {
          url: item,
          formats: [
            {
              width: 500,
              url: item,
            }
          ]
        }
      ]
    }
  }));
};

class ExploreGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { mode } = this.props;
    this.getNewItems(mode);
  }

  componentDidUpdate = (prevProps) => {
    const { mode } = this.props;
    if (prevProps.mode !== this.props.mode || prevProps.searchQuery !== this.props.searchQuery) {
      this.getNewItems(mode);
    }
  }

  getNewItems = (mode) => {
    this.setState({loading: true});
    switch(mode) {
      case 'search':
        const query = this.props.searchQuery;
        getSearchItems(query, data => this.setState({currentPage: data, loading: false}));
        break;
      case 'explore':
        getFeaturedItems(60, data => this.setState({currentPage: data, loading: false}));
        break;
      case 'training':
        this.setState({currentPage: trainingSet(), loading: false});
        break;
      default:
        getFeaturedItems(60, data => this.setState({currentPage: data, loading: false}));
        break;
    }
  }

  render() {
    const { currentPage, loading } = this.state;

    if (!currentPage || loading) {
      return <Loading />
    }

    return (
      <div className="explore-grid">
        {currentPage.map((item, i) => <ExploreItem iterator={i} key={i} item={item.node} />)}
      </div>
    );
  }
}

class ExploreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popGuess: null,
    };
  }

  componentDidMount() {
    console.log(this.props.item);
    setTimeout(() => {
      return getPopGuess(this.props.item, response => {
        this.setState({popGuess: response.outputs[0].data.concepts[0].value});
      });
    }, Math.floor(Math.random() * (10000 - 0 + 1)) + 0)
  }

  render() {
    const { iterator } = this.props;
    const { pictures, seller, slug } = this.props.item;
    const { popGuess } = this.state;

    const popPercent = (popGuess) => {
      if (!popGuess) {
        return 0;
      }

      return parseFloat(popGuess) * 100;
    };

    return <div className="explore-item" style={{backgroundImage: `url(${productImages(pictures)[0].url})`, animationDelay: `0.${(iterator*10)/2}s`, opacity: '0'}}>
      <a href={`http://depop.com/${seller.username}/${slug}`} target="_blank" className="explore-item-info">
        <p>{seller.username}</p>
        <div style={{display: 'flex', alignItems: 'stretch'}}>
          { popGuess && <div className="bar-outer">
            <div className="bar-inner" style={{width: `${popPercent(popGuess)}%`}} />
          </div> }
          { popGuess && <span className="percent">{Math.round(popPercent(popGuess))}%</span> }
        </div>
      </a>
    </div>;
  }
}

export { ExploreItem, ExploreGrid };
