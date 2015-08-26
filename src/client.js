require("babel-core/polyfill");

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import React from "react";
import {Provider} from "react-redux";
import {Router} from "react-router";
import {history} from "react-router/lib/BrowserHistory";

import {ActionTypes} from "./constants";
import * as reducers from "./reducers";
import loggerMiddleware from "./middleware/logger";

const initialState = window.$STATE;

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);
const store = finalCreateStore(reducer, initialState);

store.dispatch({ type: ActionTypes.REHYDRATE });

const childrenRoutes = require("./routes")(store);

const JAVASCRIPT_IS_ENABLED = true; // Change this to false to see how it works?

if (JAVASCRIPT_IS_ENABLED) {
  React.render((
    <Provider store={store}>
      {() => <Router history={history} children={childrenRoutes}/>}
    </Provider>
  ), document.getElementById("root"));
}
