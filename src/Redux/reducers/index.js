import { combineReducers } from "redux";
import rsReducer from './rs'
import loginReducer from './login';


const reducers = combineReducers({
    rs: rsReducer,
    loginReducer,
});

export default reducers;