import React, { Component } from 'react';
import { connect } from 'react-redux'

import Bucket from './bucket';
import WorkflowRow from './workflow-row';

const bucketsMetadata = [
  {title: 'Applied', key: 'applied', icon: '/src/static/sapling-1.png'},
  {title: 'Contacted You', key: 'contacted', icon: '/src/static/envelope.png'},
  {title: 'Interviewing', key: 'interviewing', icon: '/src/static/speech-bubble.png'},
  {title: 'Rejected', key: 'rejected', icon: '/src/static/face-1.png'},
  {title: 'Offer', key: 'offered', icon: '/src/static/dollar-sign.png'},
]

export default class Buckets extends Component {

  state = {
    activeBucket: null
  }

  countBucketSize(name) {
    const {jobSearchBuckets} = this.props;
    if (jobSearchBuckets[name]) {
      console.log(jobSearchBuckets[name])
      return jobSearchBuckets[name].length
    }
    return 0;
  }

  handleBucketClick(bucketName) {
    this.setState({activeBucket: bucketName})
  }

  _renderBuckets() {
    return bucketsMetadata.map( (bucket) => {
      const {title, key, icon} = bucket;
      return (<Bucket
                key={key}
                name={title} 
                number={this.countBucketSize(key)} 
                icon={icon}
                handleClick={() => this.handleBucketClick(key)}
              />);
      });
  }

  _renderWorkflowList() {
    const {activeBucket} = this.state;
    const {jobSearchBuckets} = this.props;

    return (
      <div className="workflow-list">
        {activeBucket}:
        {
          jobSearchBuckets[activeBucket] &&
          jobSearchBuckets[activeBucket].map((workflow, i) => {
            return <WorkflowRow key={i} workflow={workflow} />
          })
        }
      </div>
    )
  }

  render() {
    const {activeBucket} = this.state;
    const {jobSearchBuckets} = this.props;

    return (
      <div className="buckets">
        <h4>Summary</h4>
        <div>
          {jobSearchBuckets && this._renderBuckets()}
          {activeBucket && this._renderWorkflowList(activeBucket)}
        </div>
      </div>
    );
  }
}
