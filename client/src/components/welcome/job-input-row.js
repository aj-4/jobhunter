import React, {Component} from 'react';

import {updateSingleWorkflow, addSingleWorkflow} from '../../actions/index';

export default class JobInputRow extends Component {
	constructor(props){
		super(props);
		const {title, company, status} = this.props;
		this.state = {
			title: title || '',
			company_name: company || '',
			status: status || 'applied'
		}
	}

	_handleTitleChange(e) {
		this.setState({title: e.target.value})
	}

	_handleCompanyChange(e) {
		this.setState({company_name: e.target.value})
	}

	_handleStatusChange(e) {
		this.setState({status: e.target.value})
	}

	handleSendUpdate() {
		const {
			index, 
			bulkLoader, 
			newRow,
			workflowId, 
			handleUpdate
		} = this.props;

		if (bulkLoader) {
			handleUpdate(this.state, index);
		} else if (newRow) {
			addSingleWorkflow(this.state, workflowId);
		} else {
			updateSingleWorkflow(this.state, workflowId);
		}

	}

	render() {
		const {label, index} = this.props;
		const {title, company_name} = this.state;

		return (
			<form className={'job-input-row'} onBlur={() => this.handleSendUpdate()}>
  				<span>{label || index + 1}</span>
  				<input type="text" placeholder="Position Name" value={title} onChange={e => this._handleTitleChange(e)} />
  				<input type="text" placeholder="Company" value={company_name} onChange={e => this._handleCompanyChange(e)}/>
  				<select onChange={e => this._handleStatusChange(e)}>
  					<option value="applied">Applied</option>
				  	<option value="responded">Company Responded</option>
				  	<option value="interview">Interview</option>
				  	<option value="offer">Offer</option>
  				</select>
				<img src="/src/static/plus.png" onClick={() => this.handleSendUpdate()}/>
  			</form>
		);
	}
}
