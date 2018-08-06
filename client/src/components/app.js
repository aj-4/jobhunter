import React, { Component } from 'react';

import LandingPage from './landing-page';
import Dashboard from './dashboard/dashboard';
import Welcome from './welcome/welcome';

export default class App extends Component {

  _chooseViewToRender() {

  }

  render() {
    return (
      <div>
        {/*<LandingPage />*/}
        <Welcome />
        {/*<Dashboard />*/}
      </div>
    );
  }
}