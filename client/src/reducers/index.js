import { combineReducers } from 'redux';
import { 
  landingPageReducer, 
  jobSearchReducer 
} from './job_reducers';

const rootReducer = combineReducers({
  landingPage: landingPageReducer,
  jobSearch: jobSearchReducer
});

export default rootReducer;