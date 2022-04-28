import { useDispatch, useSelector } from "react-redux";
import { addNewCouseData } from "../store/actionCreator";

export function useUpdate() {
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.newCourse);
  function updateData(newValue) {
    dispatch(addNewCouseData(newValue));
  }
  return [courseData, updateData];
}
