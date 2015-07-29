import keyMirror from "keymirror";

export const ActionTypes = keyMirror({
  DEHYDRATE: null,
  REHYDRATE: null,

  SET_STATUS: null,
  SET_TITLE: null,

  UPDATE_FORUM_LIST_SUCCESS: null,

  UPDATE_POST_LIST_START: null,
  UPDATE_POST_LIST_SUCCESS: null,
  UPDATE_POST_LIST_FAILURE: null,

  UPDATE_POST_START: null,
  UPDATE_POST_SUCCESS: null,
  UPDATE_POST_FAILURE: null,

  UPDATE_POST_SEARCH_LIST_START: null,
  UPDATE_POST_SEARCH_LIST_SUCCESS: null,
  UPDATE_POST_SEARCH_LIST_FAILURE: null,
});
