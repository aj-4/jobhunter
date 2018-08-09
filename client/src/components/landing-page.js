import React, { Component } from 'react';
import { connect } from 'react-redux'
import { emailSubscribeAction } from '../actions'

export default class LandingPage extends Component {

  state = {
  	submitSuccess: null
  }

  emailBoxStyle() {
  	const {submitSuccess} = this.state;
  	if (submitSuccess === false) {
  		return {
  			border: '2px solid red'
  		}
  	}
  }

  validateEmail(email) {
  	if (email.includes('.com') && email.includes('@')) {
  		emailSubscribeAction(email);
  		this.setState({submitSuccess: true});
  	} else {
  		this.setState({submitSuccess: false});
  	}
  }

  saveMailingListEmail(e) {
  	e.preventDefault();
  	const email = this.refs.emailText.value;
  	this.validateEmail(email);
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
