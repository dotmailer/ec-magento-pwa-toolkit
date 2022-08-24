import { combineReducers, createStore } from "redux";
import { enhancer, reducers } from "@magento/peregrine";

import myReducers from "./lib/reducers";

// You can add your own reducers here and combine them with the Peregrine exports.
const rootReducer = combineReducers({ ...reducers, ...myReducers });

export default createStore(rootReducer, enhancer);
