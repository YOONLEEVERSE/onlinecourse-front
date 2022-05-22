import { useDispatch, useSelector } from "react-redux";
import { LOGOFF } from "../store/action";
import { login } from "../store/actionCreator";
import { useMutation, gql } from "@apollo/client";
import { useEffect } from "react";

const REISSUE = gql`
  mutation {
    reIssue {
      success
      error
      accessToken
    }
  }
`;

export default function useLogin() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const userData = useSelector((state) => state.userData);
  const [reIssue] = useMutation(REISSUE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (!data.reIssue.success) {
        console.log("실패함.");
        unauthorization();
      } else {
        console.log("성공해서 다시 authorization됨");
        localStorage.setItem("accessToken", data.reIssue.accessToken);
        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        authorization(userData);
      }
    },
  }); //로그아웃 시에도 쿠키에 refresh-token에 남아있어서 계속 재로그인되는 현상 발생.
  // refresh-token은 로그아웃시에 삭제해줘야 할 것 같습니당~!

  // useEffect(() => {

  //   //if (!isLogin) reIssue();
  // }, [isLogin]);

  function authorization(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
    dispatch(login(userData));
  }

  function unauthorization() {
    console.log("로그아웃 했습니다");
    dispatch(LOGOFF);
  }

  return { isLogin, userData, authorization, unauthorization };
}
