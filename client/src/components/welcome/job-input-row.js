import React, {Component} from 'react';

export default class JobInputRow extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			company: '',
			type: 'applied'
		}
	}

	_handleTitleChange(e) {
		this.setState({title: e.target.value})
	}

	_handleCompanyChange(e) {
		this.setState({company: e.target.value})
	}

	_handleTypeChange(e) {
		this.setState({type: e.target.value})
	}

	handleSendUpdate() {
		const {updateJobRow, index} = this.props;
		updateJobRow(this.state, index);
	}

	render() {
		const {index} = this.props;

		return (
			<form className={'job-input-row'} onBlur={e => this.handleSendUpdate(e)}>
  				<span>{index + 1}</span>
  				<input type="text" placeholder="Job Title" onChange={e => this._handleTitleChange(e)} />
  				<input type="text" placeholder="Company" onChange={e => this._handleCompanyChange(e)}/>
  				<select onChange={e => this._handleTypeChange(e)}>
  					<option value="applied">Applied</option>
				  	<option value="responded">Company Responded</option>
				  	<option value="interview">Interview</option>
				  	<option value="offer">Offer</option>
  				</select>
  			</form>
		);
	}
}
