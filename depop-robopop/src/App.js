import React, { Component } from 'react';

import { ExploreGrid } from './components/ExploreGrid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryBox: 'adidas',
      pendingQuery: 'adidas',
      mode: 'explore',
    };
  }

  setModeToSearch = (event) => {
    event.preventDefault();
    this.setState({mode: 'search'});
  }

  setModeToExplore = (event) => {
    event.preventDefault();
    this.setState({mode: 'explore'});
  }

  setModeToTraining = (event) => {
    event.preventDefault();
    this.setState({mode: 'training'});
  }

  updateQueryBox = (event) => {
    this.setState({pendingQuery: event.target.value});
  };

  submitQuery = (event) => {
    event.preventDefault();
    this.setState({queryBox: this.state.pendingQuery})
  }

  render() {
    const { pendingQuery, queryBox, mode } = this.state;

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
        <p style={{margin: '1em 20px', color: 'white'}}>For each item we ask our new AI service, "Does this picture look like it should be popped?" The new service responds with a popability percentage.</p>
        <div className="view-toggle">
          <button onClick={this.setModeToSearch}>Search</button>
          <button onClick={this.setModeToExplore}>Explore</button>
          <button onClick={this.setModeToTraining}>Training</button>
        </div>
        { mode === 'search' && <form style={{padding: '0 20px 20px'}} onChange={this.updateQueryBox} onSubmit={this.submitQuery}>
          <input id="query" style={inputStyle} placeholder="Search for products" value={pendingQuery} />
          <input type="submit" value="Search" style={buttonStyle} />
        </form> }
        <ExploreGrid mode={mode} searchQuery={queryBox} />
      </div>
    );
  }
}

export default App;
