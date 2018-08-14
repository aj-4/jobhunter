import React, { Component } from 'react';
import moment from 'moment';
import JobInputRow from '../welcome/job-input-row';

export default class Workflow extends Component {

  constructor(props) {
    super(props);
    const {editing} = this.props;
    this.state = {
      rowOpen: false,
      editing
    }
  }

  toggleRow() {
    this.setState({rowOpen: !this.state.rowOpen});
    // show notes
  }

  deleteRow() {
    // deleteRowAction
  }

  onClickEdit() {
      const {editing} = this.state;
      this.setState({
          editing: !editing
      })
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
      index
    } = this.props;
    const {
      editing, 
      rowOpen
    } = this.state;

    const updatedDate = moment(new Date(updatedAt))
                        .utcOffset(-8)
                        .fromNow()  

    return (
      <div>
        <div className="workflow-row" onClick={() => this.toggleRow()}>
          {
            editing ?
            <JobInputRow
              key={`job-new`} 
              label={'New'} 
              title={job_title}
              company={company && company.name}
              status={workflow_status}
            /> :
            <div>
              <span className="workflow-title">{job_title} </span> <span> at </span>
              <span className="workflow-company">{company.name} </span>
              <img src="/src/static/pencil.png" onClick={() => this.onClickEdit()}/>  
            </div>
          }
          <img src="/src/static/red-x.png" onClick={() => this.deleteRow()}/>
          <img src="/src/static/green-arrow.png" onClick={() => this.deleteRow()}/>
          <div className="workflow-updated">Updated {updatedDate}</div>
          {
            rowOpen &&
            <div className = "animated fadeIn"> 
              Notes Here(key value pairs) 
            </div>
          }
        </div>
      </div>
    );
  }
}
