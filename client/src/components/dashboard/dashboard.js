import React, { Component } from 'react';
import Nav from './nav';
import Buckets from './buckets';
import { connect } from 'react-redux'

export default class Dashboard extends Component {

  state = {
  	submitSuccess: null
  }

  componentDidMount() {
    const {getJobSearch} = this.props;
    getJobSearch(47);
  }

  render() {
    const {jobSearchBuckets} = this.props;

    return (
      <div className="dashboard-main">
        <Nav />
        <Buckets jobSearchBuckets={jobSearchBuckets} />
      </div>
    );
  }
}
