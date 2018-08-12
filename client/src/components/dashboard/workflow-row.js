import React, { Component } from 'react';
import moment from 'moment';
import JobInputRow from '../welcome/job-input-row';

export default class Workflow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rowOpen: false
    }
  }

  toggleRow() {
    this.setState({rowOpen: !this.state.rowOpen});
    // show notes
  }

  deleteRow() {
    // deleteRowAction
  }

  editRow() {
    // editRowAction
  }

  render() {
    const {workflow: {
        id,
        user_id,
        job_search_id,
        company,
        job_title,
        updatedAt,
        createdAt,
        workflow_status,
        bulletNotes
      }, 
      editing,
      editRow
    } = this.props;
    const {rowOpen} = this.state;

    const updatedDate = moment(new Date(updatedAt))
                        .utcOffset(-8)
                        .fromNow()  

    if (editing) {
      return (
        <JobInputRow
          key={`job-new`} 
          label={'New'} 
          title={job_title}
          company={company && company.name}
          status={workflow_status}
          // updateJobRow={this.updateJobRow.bind(this)}
        />
      );
    }

    return (
      <div className="workflow-row">
        <span className="workflow-company">{company.name} /// </span>
        <span className="workflow-title">{job_title} /// </span> 
        <span className="workflow-updated">Updated {updatedDate}</span>
        <img src="/src/static/eye.png" onClick={() => this.toggleRow()}/>
        <img src="/src/static/pencil.png" onClick={() => this.editRow()}/>
        {/* <img src="/src/static/red-x.png" onClick={() => this.deleteRow()}/> */}
        <img src="/src/static/green-arrow.png" onClick={() => this.deleteRow()}/>
        {
          rowOpen &&
          <div> Notes Here (key value pairs) </div>
        }
      </div>
    );
  }
}
