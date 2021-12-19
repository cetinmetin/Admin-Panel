import { SET_ALERT, REMOVE_ALERT } from "../actions/actionTypes";

const initialState = [];

export default function (payload = initialState, action) {

  switch (action.type) {
    case SET_ALERT:
      return [...payload, action.status];
    case REMOVE_ALERT:
      return payload.filter(alert => alert.id !== action.status);
    default:
      return payload;
  }
}
