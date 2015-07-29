import {ActionTypes} from "../constants";

export function setTitle(title, appendSitename = true) {
  return {
    type: ActionTypes.SET_TITLE,
    title,
    appendSitename,
  };
}

export function setStatus(status) {
  return {
    type: ActionTypes.SET_STATUS,
    status,
  };
}

export function toggleLoginModal(active) {
  return {
    type: ActionTypes.TOGGLE_LOGIN_MODAL,
    active,
  };
}
