//combineReducer - redux
/**
 * 서버가 커지면서, reducing function
 *
 */

import {
  UPDATEVIDEO,
  NEWCOURSE,
  UPDATE_NEWCOURSE,
  LOGIN,
  LOGOFF,
} from "./action";
import { cloneDeep } from "lodash";

function defaultReducer(
  state = {
    newCourse: {
      title: "",
      subTitle: "",
      level: "초급",
      logo: "",
      color: ["#000000", "#000000", "#000000"],
      gradientDirection: "0",
      price: 0,
    },
    addCourseInput: [],
    isLogin: false,
    userData: {},
  },
  action
) {
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

    case LOGIN:
      const userData = action.payload;
      const newData = cloneDeep(state);
      newData.isLogin = true;
      newData.userData = userData;
      return newData;

    case LOGOFF:
      return { ...state, isLogin: false, userData: {} };

    default:
      return state;
  }
}

export default defaultReducer;
