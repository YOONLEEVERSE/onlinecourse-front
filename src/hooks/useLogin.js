import { useDispatch, useSelector } from "react-redux";
import { LOGOFF } from "../store/action";
import { login } from "../store/actionCreator";

export default function useLogin() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const userData = useSelector((state) => state.userData);
  function authorization(userData) {
    dispatch(login(userData));
  }
  function unauthorization() {
    dispatch(LOGOFF);
  }

  return { isLogin, userData, authorization, unauthorization };
}
