import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const isLogin = useSelector((store) => store.isLogin);
  const userData = useSelector((store) => store.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else if (userData.name !== "관리자") {
      console.log(userData);
      navigate("/");
    }
  });

  if (isLogin && userData.name === "관리자") return children;
  else return <p>관리자 인증 중입니다.</p>;
}
