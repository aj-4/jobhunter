import React, { Component } from 'react';
import Bucket from './bucket';
import { connect } from 'react-redux'

export default class Buckets extends Component {

  render() {
    return (
      <div className="buckets">
        <h4>Summary</h4>
        <Bucket name="Applied" number={10} icon={'/src/static/dollar-sign.png'} />
        <Bucket name="Contacted You" number={10} icon={'/src/static/dollar-sign.png'} />
        <Bucket name="Interviewing" number={10} icon={'/src/static/dollar-sign.png'} />
        <Bucket name="Rejected" number={10} icon={'/src/static/dollar-sign.png'} />
        <Bucket name="Offered" number={10} icon={'/src/static/dollar-sign.png'} />
      </div>
    );
  }
}
