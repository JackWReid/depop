import React, { Component } from 'react';
import { getFeaturedItems, getExperimentGender, getExperimentLikes, getExperimentPrices, getUserIdFor } from './services';
import { ExploreGrid } from './ExploreGrid';
import Loading from './Loading';

import './index.css';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      experimentGender: 'm',
      experimentUser: 'simon',
      pageSize: 15,
      paginationCount: 15,
    };
  }

  componentDidMount() {
    this.loadUpPage();
  }

  componentDidUpdate(oldProps, oldState) {
    if (
      this.props.params.experiment !== oldProps.params.experiment
      || this.state.experimentGender !== oldState.experimentGender
    ) {
      this.setState({
        currentPage: null,
        pageSize: 15,
        paginationCount: 15,
      })
      this.loadUpPage();
    }
  }

  loadUpPage() {
    const { experimentGender, experimentUser, paginationCount } = this.state;
    const { experiment } = this.props.params;
    switch(experiment) {
      case 'gender':
        this.getExperimentGender(paginationCount, experimentGender); break;
      case 'price':
        this.getExperimentPrices(paginationCount); break;
      case 'likes':
        this.getExperimentLikes(paginationCount, experimentUser); break;
      default:
        this.getNewItems(paginationCount); break;
    }
  }

  paginate = () => {
    const { pageSize, paginationCount } = this.state;
    this.setState({ paginationCount: paginationCount + pageSize });
    this.loadUpPage();
  }

  getNewItems(count) {
    getFeaturedItems(count, data => this.setState({currentPage: data}));
  }

  getExperimentPrices(count) {
    getExperimentPrices(count, data => this.setState({currentPage: data}));
  }

  getExperimentGender(count, gender) {
    getExperimentGender(count, gender, data => this.setState({currentPage: data}));
  }

  getExperimentLikes(count, username) {
    getUserIdFor(username, userId => {
      getExperimentLikes(count, userId, data => this.setState({currentPage: data}));
    });
  }

  updateGender = e => {
    this.setState({experimentGender: e.target.value});
  }

  updateUser = e => {
    this.setState({experimentUser: e.target.value});
  }

  submitGender = e => {
    e.preventDefault();
    const { paginationCount, experimentGender } = this.state;
    this.getExperimentGender(paginationCount, experimentGender)
  }

  submitLikesUser = e => {
    e.preventDefault();
    const { paginationCount, experimentUser } = this.state;
    this.getExperimentLikes(paginationCount, experimentUser);
  }

  render() {
    const { currentPage, experimentGender, experimentUser } = this.state;
    const { experiment = 'standard' } = this.props.params;

    const explanation = {
      standard: `This is just our normal explore feed for a UK user. It's a list of popped items.`,
      price: `Here we've analysed the price point that items in a given category are most likely to sell at. Then we've excluded items that are outside of that from the feed. So we won't show a bag over £200 if users most often only buy bags at the £100 price point.`,
      gender: `Here we show men every category except womenswear and women every category except menswear. You can change the gender to right.`,
      likes: `This explore feed is made of items that you people you follow have liked. You can change the user you're acting as by submitting the username in the form.`,
    }

    return (
      <div className="explore-wrapper">
        <div className="intro">
          <p className="explanation">{explanation[experiment]}</p>
          { experiment === 'gender' && <form onSubmit={this.submitGender} onChange={this.updateGender}>
            <input type="radio" name="gender" value="m" checked={experimentGender === 'm'} />Male<br />
            <input type="radio" name="gender" value="f" checked={experimentGender === 'f'} />Female<br />
            <input type="radio" name="gender" value="" checked={experimentGender === ''} />Other
          </form> }
          { experiment === 'likes' && <form onSubmit={this.submitLikesUser}>
            <input type="text" value={experimentUser} placeholder="username" onChange={this.updateUser} />
            <input type="submit" value="Update" />
          </form> }
        </div>
        <div className="grid-wrapper">
          {currentPage
            ? <ExploreGrid
              items={currentPage}
              getMore={this.paginate}  />
            : <Loading />}
        </div>
      </div>
    );
  }
}

export default Explore;
