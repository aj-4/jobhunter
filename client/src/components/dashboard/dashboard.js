import React, { Component } from 'react';

import Nav from './nav';
import Buckets from './buckets';
import Workflows from './workflows';

export default class Dashboard extends Component {

  state = {
    submitSuccess: null,
    activeBucket: null
  }

  componentDidMount() {
    const {getJobSearch} = this.props;
    getJobSearch(1);
  }

  handleBucketClick(bucketName) {
    this.setState({
      activeBucket: bucketName
    })
  }

  render() {
    const {allJobSearchData} = this.props;
    const {activeBucket} = this.state;

    return (
      <div className="dashboard-main">
        <Nav />
        <Buckets 
          jobSearchBuckets={allJobSearchData} 
          handleBucketClick={this.handleBucketClick.bind(this)}
          allJobSearchData={allJobSearchData}
          activeBucket={activeBucket}
        />
        {
          activeBucket && 
          <Workflows
            workflows={allJobSearchData[activeBucket]}
            workflowName={activeBucket}
          />
        }
      </div>
    );
  }
}
