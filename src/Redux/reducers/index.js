import { combineReducers } from "redux";
import rsReducer from './rs'


const reducers = combineReducers({
    rs: rsReducer,
});

export default reducers;