//combineReducer - redux
/**
 * 서버가 커지면서, reducing function
 *
 */

import { UPDATEVIDEO, NEWCOURSE, UPDATE_NEWCOURSE } from "./action";
import { cloneDeep } from "lodash";

function defaultReducer(state = { newCourse: {}, addCourseInput: [] }, action) {
  switch (action.type) {
    case "INCRETE":
      return { ...state, count: action.count };
    case UPDATEVIDEO:
      return { ...state, videoData: action.payload };
    case NEWCOURSE:
      const tmp = cloneDeep(state);
      tmp.newCourse = Object.assign({ ...tmp.newCourse }, action.payload);
      return tmp;
    case UPDATE_NEWCOURSE:
      //action.payload => {idx, data:{넣어주면 되는 데이터}}
      const { idx, data } = action.payload;
      const update = cloneDeep(state);
      update.addCourseInput[idx] = data;
      return update;

    default:
      return state;
  }
}

export default defaultReducer;
