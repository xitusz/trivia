import { combineReducers } from 'redux';
import reducer from './reducer';
// import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ reducer });

export default rootReducer;
