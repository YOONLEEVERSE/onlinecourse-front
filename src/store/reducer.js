//combineReducer - redux
/**
 * 서버가 커지면서, reducing function
 *
 */

import { UPDATEVIDEO, NEWCOURSE } from "./action";
import { cloneDeep } from "lodash";

function defaultReducer(state = { newCourse: {} }, action) {
  switch (action.type) {
    case "INCRETE":
      return { ...state, count: action.count };
    case UPDATEVIDEO:
      return { ...state, videoData: action.payload };
    case NEWCOURSE:
      const tmp = cloneDeep(state);
      tmp.newCourse = Object.assign({ ...tmp.newCourse }, action.payload);
      return tmp;
    default:
      return state;
  }
}

export default defaultReducer;
