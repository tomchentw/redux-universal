import thenify from "thenify";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import React from "react";
import {Provider} from "react-redux";
import Router from "react-router";
import Location from "react-router/lib/Location";

import {ActionTypes} from "./constants";
import * as reducers from "./reducers";
import loggerMiddleware from "./middleware/logger";
import HtmlDocument from "./components/HtmlDocument";

const runRouter = thenify(Router.run);

const extraMiddlewares = [
];
if (process.env.DEBUG) {
  extraMiddlewares.push(loggerMiddleware);
}

export function createHtmlResponse ({
  webpackStats,
  request,
}) {
  const initialState = {
    AppReducer: {
      status: 200,
      //
      title: "Redux-Universal",
      fullTitle: "Redux-Universal",
      // For server-rendering, we should load data so set it to true.
      // The trick is only set it to false when ActionTypes.DEHYDRATE is triggered.
      fetchForServerRendering: true,
    },
  };

  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(thunkMiddleware, ...extraMiddlewares)(createStore);
  const store = finalCreateStore(reducer, initialState);

  const routes = require("./routes")(store);
  const location = new Location(request.path, request.query);

  return runRouter(routes, location).then(([routerState, transition]) => {
    if (transition.isCancelled) {
      if (transition.redirectInfo) {
        return {
          status: 302,
          pathname: transition.redirectInfo.pathname,
        };
      } else {
        return Promise.reject(transition.abortReason);
      }
    }

    const markup = React.renderToString(
      <Provider store={store}>
        {() => <Router {...routerState}/>}
      </Provider>
    );

    store.dispatch({ type: ActionTypes.DEHYDRATE });
    const state = store.getState();

    const html = React.renderToStaticMarkup(
      <HtmlDocument
        state={state}
        markup={markup}
        webpackStats={webpackStats} />
    );

    return {
      status: state.AppReducer.status,
      body: `<!DOCTYPE html>${ html }`,
    };
  });
}
