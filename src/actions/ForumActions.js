import {ActionTypes} from "../constants";
import {fetchForumList} from "./apiUtils/ForumAPIs";

export function getForumList() {
  // This is an asynchronous action and we need to dispatch again when respond
  // comes in. So we return a factory function to accept a dispatch function.
  // This is handled by redux-thunk
  return dispatch => {
    return fetchForumList()
    .then(({data}) => {
      dispatch({
        type: ActionTypes.UPDATE_FORUM_LIST_SUCCESS,
        list: data,
      });

      return data;
    });
  };
}
