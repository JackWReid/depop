import React, { Component } from 'react';
import { getSearchItems } from './services';

import Explore from './views/Explore';
import Loading from './views/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      queryBox: '',
    };
  }

  componentDidMount() {
    this.getNewItems();
  }

  updateQueryBox = (event) => {
    this.setState({queryBox: event.target.value});
  };

  submitQuery = (event) => {
    event.preventDefault();
    this.getNewItems();
  }

  getNewItems() {
    const query = this.state.queryBox || "adidas";
    getSearchItems(query, data => this.setState({currentPage: data}));
  }

  render() {
    const { currentPage, queryBox } = this.state;

    const inputStyle = {
      width: '15em',
      padding: '10px',
      fontSize: '18px',
      border: '0',
    };

    const buttonStyle = {
      marginLeft: '20px',
      padding: '10px',
      fontSize: '18px',
      borderRadius: '0',
      border: '0',
      background: 'white',
    };

    return (
      <div className="app">
        <form style={{padding: '20px'}} onChange={this.updateQueryBox} onSubmit={this.submitQuery}>
          <input id="query" style={inputStyle} placeholder="Search for products" value={queryBox} />
          <input type="submit" value="Search" style={buttonStyle} />
        </form>
        {currentPage ? <Explore data={currentPage.slice(0,15)} /> : <Loading />}
      </div>
    );
  }
}

export default App;
