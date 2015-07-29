import Immutable, {Map, List} from "immutable";

import {ActionTypes} from "../constants";
import createReducer from "../utils/createReducer";

const initialState = new Map({
  forumList: new List(),
});

function updateList(state, action) {
  const list = Immutable.fromJS(action.list);

  return state.withMutations(mutableState => {

    mutableState = mutableState.set("forumList", list);

    return mutableState;
  });
}

function dehydrate(state/*, action*/) {
  return state.toJS();
}

function rehydrate(state/*, action*/) {
  return Immutable.fromJS(state);
}

const actionHandlers = {
  [ActionTypes.UPDATE_FORUM_LIST_SUCCESS]: updateList,

  [ActionTypes.DEHYDRATE]: dehydrate,
  [ActionTypes.REHYDRATE]: rehydrate,
};

export default createReducer(initialState, actionHandlers);
