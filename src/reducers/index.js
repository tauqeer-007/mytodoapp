import todoReducers from "./todoReducers";
import authReducer from "./authReducer";

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todo:todoReducers,
    auth:authReducer
})

export default rootReducer;