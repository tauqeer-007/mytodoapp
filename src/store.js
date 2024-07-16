import { configureStore } from '@reduxjs/toolkit'
import roorReducer from "./reducers/index"

const store = configureStore({ reducer: roorReducer}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store
