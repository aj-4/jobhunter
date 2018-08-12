import React, { Component } from 'react';

import Bucket from './bucket';
import {bucketsMetadata} from '../../constants/job-search-constants';

export default class Buckets extends Component {

  countBucketSize(bucketName) {
    const {allJobSearchData} = this.props;
    if (allJobSearchData[bucketName]) {
      return allJobSearchData[bucketName].length
    }
    return 0;
  }

  _renderBuckets() {
    const {activeBucket, handleBucketClick} = this.props;

    return bucketsMetadata.map( (bucket) => {
      const {title, key, icon} = bucket;
      const isActive = activeBucket === key;

      return (<Bucket
                key={key}
                name={key}
                title={title} 
                number={this.countBucketSize(key)} 
                icon={icon}
                handleClick={() => handleBucketClick(key)}
                bucketMeta={bucket}
                active={isActive}
              />);
      });
  }

  render() {
    const {allJobSearchData} = this.props;

    return (
      <div className="buckets">
        <h4>Summary</h4>
        <div>
          {allJobSearchData && this._renderBuckets()}
        </div>
      </div>
    );
  }
}
