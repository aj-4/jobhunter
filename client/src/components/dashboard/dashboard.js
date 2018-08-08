import React, { Component } from 'react';
import Nav from './nav';
import Buckets from './buckets';
import { connect } from 'react-redux'

export default class Dashboard extends Component {

  state = {
  	submitSuccess: null
  }

  render() {
  	const {submitSuccess} = this.state;

    return (
      <div className="dashboard-main">
        <Nav />
        <Buckets />
      </div>
    );
  }
}
