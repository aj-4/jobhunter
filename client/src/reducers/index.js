import { combineReducers } from 'redux';
import { landingPageReducer } from './landing-page-reducers';

const rootReducer = combineReducers({
  landingPage: landingPageReducer
});

export default rootReducer;