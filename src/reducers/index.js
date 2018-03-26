import { combineReducers } from 'redux';
import ExampleReducer from './reducer_example';

const rootReducer = combineReducers({
  example: ExampleReducer
});

export default rootReducer;