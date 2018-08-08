import React, { Component } from 'react';
import { connect } from 'react-redux'

export default class Nav extends Component {

  render() {
    return (
      <div className="nav">
        <h3>Jobhunter</h3>
        <img src="/src/static/hunter.png" className="hunter"/>
        <div className="grass" />
      </div>
    );
  }
}
