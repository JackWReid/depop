import React, { Component } from 'react';
import { getFeaturedItems } from './services';

import Explore from './views/Explore';
import Loading from './views/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
    };
  }

  componentDidMount() {
    this.getNewItems();
  }

  getNewItems() {
    const { store } = this.props;
    const { pager } = store.getState();
    getFeaturedItems(15 * pager, data => this.setState({currentPage: data}));
    store.dispatch({ type: 'INCREMENT_PAGE' });
  }

  checkTheClock() {
    const { store } = this.props;
    setInterval(() => {
      const { clock } = store.getState();
      if (clock > 10) {
        this.getNewItems();
        store.dispatch({ type: 'RESET_CLOCK' });
      }
    }, 2000);
  }

  render() {
    const { currentPage } = this.state;

    this.checkTheClock();

    return (
      <div className="app">
        {currentPage ? <Explore data={currentPage.reverse().slice(0,15)} /> : <Loading />}
      </div>
    );
  }
}

export default App;
