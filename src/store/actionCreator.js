import {
  UPDATEVIDEO,
  NEWCOURSE,
  UPDATE_NEWCOURSE,
  LOGIN,
  LOGOFF,
} from "./action";
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

export const updateNewcourse = (idx, title, videoData) => {
  //data에는 idx, title ,video데이터이 있어야 함.

  return {
    type: UPDATE_NEWCOURSE,
    payload: { idx, data: { title, videos: videoData } },
  };
};

export const login = (userData = null) => {
  //data에는 idx, title ,video데이터이 있어야 함.

  return {
    type: LOGIN,
    payload: { ...userData },
  };
};
