import { UPDATEVIDEO, NEWCOURSE } from "./action";
export const updateVideo = (data) => {
  return {
    type: UPDATEVIDEO,
    payload: data,
  };
};

export const addNewCouseData = (data) => {
  return {
    type: NEWCOURSE,
    payload: data,
  };
};
