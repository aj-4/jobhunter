import React, { Component } from 'react';

export default class Workflow extends Component {

  render() {
    const {workflow: {
      id,
      user_id,
      job_search_id,
      company_id,
      job_title,
      updatedAt,
      createdAt,
      workflow_status
    }} = this.props;

    return (
      <div className="workflow-row">
        <span>{job_title} /// </span> 
        <span>{company_id} /// </span>
        <span>{updatedAt}</span>
      </div>
    );
  }
}
