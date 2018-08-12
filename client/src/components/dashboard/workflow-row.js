import React, { Component } from 'react';
import moment from 'moment';

export default class Workflow extends Component {

  render() {
    const {workflow: {
      id,
      user_id,
      job_search_id,
      company,
      job_title,
      updatedAt,
      createdAt,
      workflow_status
    }} = this.props;

    const updatedDate = moment(new Date(updatedAt))
                        .utcOffset(-8)
                        .fromNow()  


    return (
      <div className="workflow-row">
        <span className="workflow-company">{company.name} /// </span>
        <span className="workflow-title">{job_title} /// </span> 
        <span className="workflow-updated">Updated {updatedDate}</span>
      </div>
    );
  }
}
