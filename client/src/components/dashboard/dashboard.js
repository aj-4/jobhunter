import React, { Component } from 'react';

import Nav from './nav';
import Buckets from './buckets';
import Workflows from './workflows';
import {SimpleBars, SimpleLine} from '../atoms/sparklines';

import {
  getBucketDayMonthTrends,
  getDailyUpdateVolume,
  getWeeklyUpdateVolume
} from '../../utils/date-utils';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.getJobSearch(1);    
    this.state = {
      submitSuccess: null,
      activeBucket: null,
    }
    this.handleBucketClick = this.handleBucketClick.bind(this)
  }

  handleBucketClick(bucketName) {
    this.setState({
      activeBucket: bucketName
    })
  }

  hydrateGraphStats() {
    const {allJobSearchData} = this.props;
    let timeSeriesData = [];
    if (allJobSearchData) {
      for (let bucket in allJobSearchData) {
        timeSeriesData = timeSeriesData.concat(allJobSearchData[bucket]);
      }
    }
    let pastSevenDaysVolume = [];
    let pastSixWeeksVolume = [];
    if (timeSeriesData && timeSeriesData.length) {
        const graphData = getBucketDayMonthTrends(timeSeriesData);
        pastSevenDaysVolume = getDailyUpdateVolume(graphData.workflowDaysAgoSizes);
        pastSixWeeksVolume = getWeeklyUpdateVolume(graphData.workflowWeeksAgoSizes);
        return {
            pastSevenDaysVolume,
            pastSixWeeksVolume
        };
    }
    return false;
  }

  _renderGraphs() {
    const stats = this.hydrateGraphStats();
    if (stats) {
        return (
            <div className="graphs">
                <SimpleLine
                    label="Activity This Week" 
                    data={stats.pastSevenDaysVolume}
                />
                <SimpleBars 
                    label="Past 6 weeks" 
                    data={stats.pastSixWeeksVolume}
                />
            </div>
        );
    }
    return <div><img src="/src/static/bars-loader.svg"/></div>
  }

  render() {
    const {allJobSearchData} = this.props;
    const {activeBucket} = this.state;

    return (
      <div className="dashboard-main">
        <Nav />
        <h4>Summary</h4>        
        {this._renderGraphs()}
        <Buckets 
          jobSearchBuckets={allJobSearchData} 
          handleBucketClick={this.handleBucketClick}
          allJobSearchData={allJobSearchData}
          activeBucket={activeBucket}
        />
        {
          activeBucket && 
          <Workflows
            workflows={allJobSearchData[activeBucket]}
            workflowName={activeBucket}
            adding={false}
          />
        }
      </div>
    );
  }
}
