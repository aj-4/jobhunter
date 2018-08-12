import React, { Component } from 'react';
import {SimpleLine, SimpleBars} from '../atoms/sparklines';

import WorkflowRow from './workflow-row';
import {
    getBucketDayMonthTrends,
    getDailyUpdateVolume,
    getWeeklyUpdateVolume
} from '../../utils/date-utils';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this._renderGraphs = this._renderGraphs.bind(this);
    }

    hydrateGraphStats() {
        const {workflows} = this.props;
        let pastSevenDaysVolume = [];
        let pastSixWeeksVolume = [];

        if (workflows && workflows.length) {
            const graphData = getBucketDayMonthTrends(workflows);
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

        return <div> Nothing Here Right Now </div>
        
    }

    _renderWorkflowList() {
    const {workflows} = this.props;
    return (
        <div>
            {
            workflows && workflows.length &&
            workflows.map((workflow, i) => {
                return <WorkflowRow key={i} workflow={workflow} />
            })
            }
        </div>
    );
    }

    render() {
    const {workflowName} = this.props;
    return (
        <div 
            className="workflow-list" 
            style={{backgroundColor: 'lightgrey'}}
        >
            <h4>{workflowName}</h4>
            {this._renderGraphs()}
            {this._renderWorkflowList()}
        </div>
    );
    }
}