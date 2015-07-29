import Immutable, {OrderedSet, Map} from "immutable";

import {ActionTypes} from "../constants";
import createReducer from "../utils/createReducer";

const initialState = new Map({
  postIdsByForumId: new Map(),
  postIdsBySearchTerm: new Map(),
  postById: new Map(),
});

function startUpdateList (state, action) {
  const {forumId} = action;

  return state.withMutations(mutableState => {

    mutableState = mutableState.setIn(["postIdsByForumId", forumId], new OrderedSet());

    return mutableState;
  });
}

function updateList(state, action) {
  const {forumId} = action;
  const list = Immutable.fromJS(action.list);

  return state.withMutations(mutableState => {
    list.forEach(post => {
      const id = post.get("id");

      mutableState = mutableState.updateIn(["postIdsByForumId", forumId], set => set.add(id));

      mutableState = mutableState.mergeDeepIn(["postById", id], post);
    });

    return mutableState;
  });
}

function updatePost(state, action) {
  const post = Immutable.fromJS(action.item);

  return state.withMutations(mutableState => {
    const id = post.get("id");

    mutableState = mutableState.mergeDeepIn(["postById", id], post);

    return mutableState;
  });
}

function updateSearchList(state, action) {
  const list = Immutable.fromJS(action.list);
  const {searchTerm} = action;

  return state.withMutations(mutableState => {
    list.forEach(post => {
      const id = post.get("id");

      mutableState = mutableState.updateIn(["postIdsBySearchTerm", searchTerm],
        new OrderedSet(), set => set.add(id)
      );

      mutableState = mutableState.mergeIn(["postById", id], post);
    });
    return mutableState;
  });
}

function dehydrate(state) {
  return state.toJS();
}

function rehydrate(state) {
  return Immutable.fromJS(state).withMutations(mutableState => {
    ["postIdsByForumId", "postIdsBySearchTerm"].forEach(orderedValuesKey => {

      mutableState = mutableState.set(
        orderedValuesKey,
        mutableState
          .get(orderedValuesKey)
          .map((valueSet) => new OrderedSet(valueSet))
      );

    });

    return mutableState;
  });
}


const actionHandlers = {
  [ActionTypes.UPDATE_POST_LIST_START]: startUpdateList,
  [ActionTypes.UPDATE_POST_LIST_SUCCESS]: updateList,

  [ActionTypes.UPDATE_POST_SUCCESS]: updatePost,

  [ActionTypes.UPDATE_POST_SEARCH_LIST_SUCCESS]: updateSearchList,

  [ActionTypes.DEHYDRATE]: dehydrate,
  [ActionTypes.REHYDRATE]: rehydrate,
};

export default createReducer(initialState, actionHandlers);
