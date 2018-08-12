import React, {Component} from 'react';

export default class JobInputRow extends Component {
	constructor(props){
		super(props);
		const {title, company, status} = this.props;
		this.state = {
			title: title || '',
			company: company || '',
			status: status || 'applied'
		}
	}

	_handleTitleChange(e) {
		this.setState({title: e.target.value})
	}

	_handleCompanyChange(e) {
		this.setState({company: e.target.value})
	}

	_handleStatusChange(e) {
		this.setState({status: e.target.value})
	}

	handleSendUpdate() {
		const {updateJobRow, index} = this.props;
		updateJobRow(this.state, index);
	}

	render() {
		const {label, index} = this.props;

		return (
			<form className={'job-input-row'} onBlur={e => this.handleSendUpdate(e)}>
  				<span>{label || index + 1}</span>
  				<input type="text" placeholder="Position Name" onChange={e => this._handleTitleChange(e)} />
  				<input type="text" placeholder="Company" onChange={e => this._handleCompanyChange(e)}/>
  				<select onChange={e => this._handleStatusChange(e)}>
  					<option value="applied">Applied</option>
				  	<option value="responded">Company Responded</option>
				  	<option value="interview">Interview</option>
				  	<option value="offer">Offer</option>
  				</select>
  			</form>
		);
	}
}
