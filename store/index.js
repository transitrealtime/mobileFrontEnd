import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import routes from './utilities/directionRoute';
const rootReducer = combineReducers({routes});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;