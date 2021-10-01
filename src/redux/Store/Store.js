import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import logger from "redux-logger";
import rootReducer from '../Reducer/index';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
