import React, { Component } from 'react';

import LandingPage from './landing-page';
import DashboardContainer from '../containers/dashboard';
import Welcome from './welcome/welcome';

export default class App extends Component {

  _chooseViewToRender() {

  }

  render() {
    return (
      <div>
        {/*<LandingPage />*/}
        {/* <Welcome /> */}
        <DashboardContainer />
      </div>
    );
  }
}