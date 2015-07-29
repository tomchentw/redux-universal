import {ActionTypes} from "../constants";
import createReducer from "../utils/createReducer";

const TITLE_POSTFIX = " - Redux-Universal";

function setTitle(state, action) {
  return {
    ...state,
    title: action.title,
    fullTitle: action.title + (action.appendSitename ? TITLE_POSTFIX : ""),
  };
}

function setStatus(state, action) {
  return {
    ...state,
    status: action.status,
  };
}

function dehydrate(state/*, action*/) {
  return {
    ...state,
    fetchForServerRendering: false,
  };
}

function rehydrate(state/*, action*/) {
  return state;
}

const actionHandlers = {
  [ActionTypes.SET_TITLE]: setTitle,
  [ActionTypes.SET_STATUS]: setStatus,

  [ActionTypes.DEHYDRATE]: dehydrate,
  [ActionTypes.REHYDRATE]: rehydrate,
};

export default createReducer(null, actionHandlers);
