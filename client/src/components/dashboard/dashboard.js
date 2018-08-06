import React, { Component } from 'react';
import { connect } from 'react-redux'

export default class Dashboard extends Component {

  state = {
  	submitSuccess: null
  }

  render() {
  	const {submitSuccess} = this.state;

    return (
      <div className="landing-page">
        <h3>Jobhunter</h3>
        <p>A virtual assistant for your job search</p>
        <img className="floating" src="/src/static/hunter.png"/>
        <p>Coming Soon</p>
        {
        	submitSuccess ? 
        	<div> Thanks, we'll let you know about any updates </div> :
        	<form onSubmit={this.saveMailingListEmail.bind(this)}>
        		<input 
	        		style={this.emailBoxStyle()} 
	        		ref="emailText" type="text" placeholder="Your Email" 
        		/>
        	</form>
        }
      </div>
    );
  }
}
