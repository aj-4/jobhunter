import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobInputRow from './job-input-row';
import {newJobSearchAction} from '../../actions';

// flow for a new user / user with a new job

export default class Welcome extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		userId: 1,
  		onPage: 0,
  		hasStartedJobSearch: false,
  		jobType: 'tech',
  		jobsAppliedForCount: '',
  		jobsAppliedRows: []
  	}

  }

  updateJobRow(jobData, index) {
  	const {jobsAppliedRows} = this.state;
  	const {title, company, status} = jobData;

  	const jobObject = {title, company, status};
  	jobsAppliedRows[index] = jobObject;

  	this.setState({jobsAppliedRows});
  }

  _handleHasStartedJobSearch(trueOrFalse) {
  	this.setState({
  		hasStartedJobSearch: trueOrFalse,
  		onPage: 1
  	});
  }

  _handleJobsAppliedFor(e) {
	this.setState({
		jobsAppliedForCount: e.target.value
	});
  }

  _handleJobEntrySubmit() {
  	// action to submit form
  	// tie to authenticated user id

  	newJobSearchAction({jobSearchData: this.state});

  	console.log('success');
  	this.setState({
  		onPage: this.state.onPage + 1
  	})
  }

  _handleJobTypeSelect(e) {
  	console.log('job type', e.target.value);
  	this.setState({
  		jobType: e.target.value
  	});
  }

  _handleNextPage() {
  	this.setState({
  		onPage: this.state.onPage + 1
  	})
  }

  renderJobsAppliedFor() {
  	const {jobsAppliedForCount} = this.state;
  	const jobsAppliedFor = [];

  	let limit = Math.min(jobsAppliedForCount, 100);

  	for (let i = 0; i < limit; i++) {
  		jobsAppliedFor.push(
  			<JobInputRow 
  				key={`job-${i}`} 
  				index={i} 
  				updateJobRow={this.updateJobRow.bind(this)}
  			/>
  		);
  	}

  	return jobsAppliedFor;
  }

  choosePageToRender() {

  	const {onPage, hasStartedJobSearch, jobsAppliedForCount} = this.state;

  	if (onPage === 0) {
  		return (
	  		<div className="landing-page">
		      	<img style={{height: '75px'}} src="/src/static/hunter.png"/>
		        <h3>Welcome to Jobhunter</h3>
		        <p>Have you already started your job search?</p>
		        <button className="yes-no-button" onClick={() => this._handleHasStartedJobSearch(true)}>Yes</button>
		        <button className="yes-no-button" onClick={() => this._handleHasStartedJobSearch(false)}>No</button>
	      	</div>
     	);
  	} else if (onPage === 1) {
  		return (
  			<div className="landing-page">
		      	<img style={{height: '75px'}} src="/src/static/hunter.png"/>
		        <h3>Great!</h3>
		        {!hasStartedJobSearch && <p>Let's start from scratch</p>}
		        <p>What kind of jobs are you applying for?</p>
		        <select onChange={e => this._handleJobTypeSelect(e)}>
				  <option value="tech">Tech</option>
				  <option value="finance">Finance</option>
				  <option value="marketing">Marketing</option>
				  <option value="other">Other</option>
				</select>
				<button onClick={() => this._handleNextPage()}>Next</button>
	      	</div>
  		);
  	} else if (onPage === 2 && hasStartedJobSearch) {
  		return (
  			<div className="landing-page">
		      	<img style={{height: '75px'}} src="/src/static/hunter.png"/>
		        <h3>Next step,</h3>
		        <p>How many jobs have you applied for?</p>
		        <input type="text" placeholder="Number of jobs" value={jobsAppliedForCount} onChange={e => this._handleJobsAppliedFor(e)}/>
		        {
		        	jobsAppliedForCount > 0 &&
		        	<div>
		        		{this.renderJobsAppliedFor()}
		        		<button onClick={e => this._handleJobEntrySubmit()}>Submit</button>
		        	</div>
		        }
	      	</div>
  		);
  	} else {
  		return (
  			<div className="landing-page">
		      	<img style={{height: '75px'}} src="/src/static/hunter.png"/>
		        <h3>You're all set up</h3>
		        <p>Now the fun begins</p>
	      	</div>
  		);
  	} 
  }

  render() {
  	const {submitSuccess} = this.state;

    return (
      <div>
      	{this.choosePageToRender()}
      </div>
    );
  }
}
