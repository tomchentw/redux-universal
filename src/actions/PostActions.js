import {ActionTypes} from "../constants";
import {fetchPostList, fetchPostListBySearchTerm, fetchPost} from "./apiUtils/PostAPIs";

export function getPostList(forumId) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_POST_LIST_START,
      forumId,
    });

    return fetchPostList(forumId)
    .then(({data}) => {
      dispatch({
        type: ActionTypes.UPDATE_POST_LIST_SUCCESS,
        forumId,
        list: data,
      });

      return data;
    });
  };
}

export function getPostListBySearchTerm(searchTerm) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_POST_SEARCH_LIST_START,
      searchTerm,
    });

    return fetchPostListBySearchTerm(searchTerm)
    .then(({data}) => {
      dispatch({
        type: ActionTypes.UPDATE_POST_SEARCH_LIST_SUCCESS,
        searchTerm,
        list: data,
      });

      return data;
    });
  };
}

export function getPost(postId) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_POST_START,
      postId,
    });

    return fetchPost(postId)
    .then(({data}) => {
      dispatch({
        type: ActionTypes.UPDATE_POST_SUCCESS,
        item: data,
      });

      return data;
    });
  };
}
